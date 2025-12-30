const Book = require("../models/Book");
const Sale = require("../models/Sales");

exports.pending = async (req, res) => {
    try {
        const { items } = req.body;
 const buyerId= req.user.userId

 if (!items || !items.length) {
            return res.status(400).json({ message: "No items to mark pending" });
        }

 const invalidItem = items.find(item => !item.productId);
        if (invalidItem) {
            return res.status(400).json({
                message: `productId missing for item: ${JSON.stringify(invalidItem)}`
            });
        }
 
 const sales = await Promise.all(
     items.map(async (item)=>{
                const book = await Book.findById(item.productId).select("seller");
                if (!book) {
          throw new Error(`Book not found for productId: ${item.productId}`);
        }
                return{
                buyerId,
                sellerId: book.seller,
                productId: item.productId,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                status: "pending",}
            }
            )
        )
            await Sale.insertMany(sales); 

        res.status(201).json({
            message: "sales list",
            sales
        });
    } catch (error) {
        res.status(500).json({
            message: "Could not make pending",
            details: error.message,
        });
    }
}

exports.updateSalesStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const sale = await Sale.findByIdAndUpdate(id, { status }, { new: true });
        res.json(sale);

    } catch (error) {
        res.status(500).json({
            message: "Could not update",
            details: error.message,
            
        });
    }
}

// exports.getsales = async (req, res) => {
//     try {
//         const sales = await Sale.find({ sellerId: req.user.userId }).sort({ date: -1 });;
//         res.json(sales);
//     } catch (error) {
//         res.status(500).json({ message: "Could not get sales" });
//     }
// };


exports.getsales = async (req, res) => {
  try {
    
//     const allSales = await Sale.find();

const sales = await Sale.find({ sellerId: req.user.userId })
  .populate("productId", "title price pdfUrl") 
  .populate("buyerId", "name email"); 

// console.log(req.user.userId);

    res.status(200).json({
      message: "Seller sales fetched successfully",
      sales
    });
  } catch (err) {
    res.status(500).json({
      message: "Could not fetch sales",
      details: err.message
    });
  }
};


exports.getBuyerOrders = async (req, res) => {
  try {
    const sales = await Sale.find({ buyerId: req.user.userId })
      .populate("productId", "title price pdfUrl previewUrl")
      .populate("sellerId", "name email");

    res.status(200).json({
      message: "Buyer orders fetched successfully",
      sales,
    });
  } catch (err) {
    res.status(500).json({
      message: "Could not fetch buyer orders",
      details: err.message,
    });
  }
};
