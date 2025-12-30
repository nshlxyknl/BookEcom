const   mongoose = require("mongoose");


const reviewschema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String,  },
    comments: { type: String, required: true },
    star: { type: Number, required: true, min: 1, max: 5 },
    created: { type: Date, default: Date.now }
  }
)

module.exports= mongoose.model("Review",reviewschema)