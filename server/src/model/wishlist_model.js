const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    productId:{
        type: mongoose.Types.ObjectId,
        ref: "product"
    }
},{
    timestamps: true
})

const wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlist