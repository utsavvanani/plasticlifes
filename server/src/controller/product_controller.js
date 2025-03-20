const {Product} = require("../model");

const create_product = async(req,res) => {
    try {
        console.log("dd",req.body)
        const newProduct = await Product.create(req.body.data)
        console.log("xx",newProduct)
        res.status(200).json({
            success:true,
            data:newProduct,
            message:"New product added"
        })
        
      
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const get_product = async(req,res) => {
    try {
        const getProduct = await Product.find()
        res.status(200).json({
            success:true,
            data:getProduct
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message

        })
    }
}

const findProductById = async(req,res) =>{
    try {
        const product = await Product.findById(req.params.productId)
        res.status(200).json({
            success:true,
            data:product
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const productDelete = async(req,res) => {
    try {
        const {productId} = req.body
        const response = await Product.findByIdAndDelete({_id:productId})
        res.status(200).json({
            success:true,
            data:response
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const update_product = async (req, res) => {
    try {
        const  id  = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(id, {$set:req.body.data} );
        res.status(200).json({
            success: true,
            data: updatedProduct,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    create_product,
    get_product,
    findProductById,
    productDelete,
    update_product
}