const mongoose = require("mongoose")

const salesItems = new mongoose.Schema({
    buyerId: {type: mongoose.Schema.Types.ObjectId, ref:"User", },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
    title: String,
    price: Number,
    quantity: Number,
    status: {type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    date: { type: Date, default: Date.now },
},{ timestamps: true }
)

module.exports = mongoose.model("Sales", salesItems);