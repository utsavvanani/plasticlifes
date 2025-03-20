const mongoose = require("mongoose")
const product_schema = new mongoose.Schema({
    productTitle:{
        type:String
    },
    productImage:{
        type:String
    },
    productPrice:{
        type:Number
    },
    productDesc:{
        type:String
    },
    productFakePrice:{
        type:Number
    },
    productCategory:{
        type:String
    }
},{
    timestmps:true
})

const product = mongoose.model("product",product_schema)

module.exports = product