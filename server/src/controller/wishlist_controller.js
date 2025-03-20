const {Wishlist} = require("../model")

const addToWishlist = async(req,res) => {
    try {
        const productid = req.params.productId;
        const existProduct = await Wishlist.findOne({
            productId: productid, userId : req.userId})
            if(existProduct){
                return res.status(400).json({
                    success:false,
                    message:"Product already exist in wishlist"
                })
            }
            const payload = {
                productId: productid,
                userId: req.userId
            }
            const newProduct = await Wishlist.create(payload)
            res.status(200).json({
                success:true,
                data:newProduct,
                message:"Product added to wishlist"
            })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const getWishlist = async(req,res) => {
    try {
        const wishlist = await Wishlist.find({userId: req.userId}).populate("productId")
        res.status(200).json({
            success:true,
            data:wishlist
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })   
    }
}

const deleteWishlist = async(req,res) => {
    try {
        const productid = req.params.productId
        const wishlist = await Wishlist.findOneAndDelete({productId: productid, userId: req.userId})
        res.status(200).json({
            success:true,
            data:wishlist
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {addToWishlist,getWishlist,deleteWishlist}