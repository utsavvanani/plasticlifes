const { default: mongoose } = require("mongoose");

const userProductSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user" // Reference to User model
    },
    quantity: {
      type: Number,
      default: 1 // Default quantity if not provided
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "product" // Reference to Product model
    }
  },
  {
    timestamps: true,
  }
);

const userProduct = mongoose.model("userproduct", userProductSchema);

module.exports = userProduct;
