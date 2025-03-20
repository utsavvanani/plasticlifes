const { UserProduct } = require("../model");


const addToCart = async (req, res) => {
  try {
    const productid = req.params.productId;
    const existProduct = await UserProduct.findOne({
      productId: productid,
    }).findOne({
      userId: req.userId,
    });
    if (existProduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exist",
      });
    }
    const payload = {
      productId: productid,
      quantity: 1,
      userId: req.userId,
    };
    const newProduct = await UserProduct.create(payload);
    res.status(200).json({
      success: true,
      data: newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const getUserProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const userProduct = await UserProduct.find({ userId })
      .populate("productId")
      .populate("userId");

    if (!userProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: userProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const AddQuantity = async (req, res) => {
  try {
    const productid = req.params.productId;
    const product = await UserProduct.findOne({ productId: productid });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const newQuantity = product.quantity + 1;
    const updatedProduct = await UserProduct.findByIdAndUpdate(
      product._id,
      { $set: { quantity: newQuantity } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Quantity added successfully",
      data: updatedProduct,
    });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const DecQuantity = async (req, res) => {
  try {
    const productid = req.params.productId;
    const product = await UserProduct.findOne({ productId: productid });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const newQuantity = product.quantity - 1;
    if (product.quantity === 1) {
      const deletedProduct = await UserProduct.findByIdAndDelete(product._id);
      return res.status(200).json({
        success: true,
        message: "Quantity deleted successfully",
        data: deletedProduct,
        // productQuantity:product.quantity
      });
    }
    const updatedProduct = await UserProduct.findByIdAndUpdate(
      product._id,
      { $set: { quantity: newQuantity } },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Quantity decremented successfully",
      data: updatedProduct,
    });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productid = req.params.productId;
    const product = await UserProduct.findOne({ productId: productid });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const deletedProduct = await UserProduct.findByIdAndDelete(product._id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const countProduct = async (req, res) => {
  try {
    const count = await UserProduct.countDocuments({ userId: req.userId });
    res.status(200).json({
      success: true,
      data: count,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const userOderProductEmpty = async(req,res) => {
  try {
    const userid = req.userId
    const deletedProduct = await UserProduct.deleteMany({userId:userid});
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}



module.exports = {
  addToCart,
  getUserProduct,
  AddQuantity,
  DecQuantity,
  deleteProduct,
  countProduct,
  userOderProductEmpty
};
