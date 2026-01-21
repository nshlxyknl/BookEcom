const Cart = require("../models/Cart")
const Book = require("../models/Book")
//add button >buyerid >productid >db store >
require("dotenv").config();


exports.addcart = async (req, res) => {
    try {

        const userId = req.user.userId;
        const { productId, price, title, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "ProductId is required" });
        }

        const product = await Book.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId.toString());

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, title, price, quantity });
        }

        await cart.save();
        res.json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Could not add to cart",
            details: error.message,
        })
    }
}

exports.deletecart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.userId });
        const { productId } = req.params;

        if (!cart)
            return res.status(404).json({ message: "Cart not found" });

        // console.log("Deleting product:", productId);
        // console.log("Before:", cart.items.map(i => i.productId.toString()));
        //     cart.items = cart.items.filter(
        //   (item) => item.productId.toString() !== productId
        // );
        // console.log("After:", cart.items.map(i => i.productId.toString()));

        const existingItem = cart.items.find(item =>item.productId._id.toString() === productId.toString());

        if (existingItem) {
            existingItem.quantity -= 1;
        } else {
            cart.items=cart.items.filter(
                (item) => item.productId._id?.toString() !== productId.toString()
            );
        }

        await cart.save();
        return res.json(cart.items);

    } catch (error) {
        res.status(500).json({
            message: "Could not add to cart",
            details: error.message,
        })
    }
}

exports.getcart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId }).populate("items.productId", "title price")
        // .populate("items.productId")

        res.json(cart ? cart.items.filter(items => items.productId != null) : []);
    } catch (error) {
        res.status(500).json({
            message: "Could not get any",
            details: error.message,
        })
    }
}


exports.clearcart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = [];
        await cart.save();

        res.json({ message: "Cart cleared successfully", cart });

    } catch (error) {
        res.status(500).json({
            message: "Could not clear",
            details: error.message,
        })
    }
}

const stripe = require("stripe")(process.env.SECRET_KEY)
exports.payc = async (req, res) => {
    try {
        const {items, buyerId} = req.body;
        // console.log("heyyyyy",items)


        if (!items || !items.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            //      metadata: {
            //             productId: item.productId,

            // }
            })),
            success_url: `${CLIENT_URL}/dashboard/payment?=success`,
            cancel_url: `${CLIENT_URL}/dashboard/payment?=failed`,
            metadata: {
                buyerId,
                items: JSON.stringify(items),
            },
        });
        res.json({ url: session.url });

    } catch (error) {
        res.status(500).json({
            message: "Could not pay",
            details: error.message,
        })
    }
}

exports.plus = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.userId;
        let cart = await Cart.findOne({ userId });
        const existingItem = cart.items.find(item => item.productId?.toString() === productId.toString());

        if (existingItem) {
            existingItem.quantity += 1;
        }
        await cart.save();
        res.json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Could not clear",
            details: error.message,
        })
    }
}



exports.clean = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;
        const cart = await Cart.findOne({ userId });

        cart.items = cart.items.find(item => item.productId.toString() !== productId.toString());;
        await cart.save();

        res.json({ message: "Cart item cleared", cart });


    } catch (error) {
        console.log(error)

    }
}

