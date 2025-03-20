const express = require("express")
const product_routes = require("./product_routes")
const user_routes = require("./user_routes")
const user_product_routes = require("./user_product_routes")
const wishlist_routes = require("./wishlist_route")

const router = express.Router()

router.use("/product",product_routes)
router.use("/user",user_routes)
router.use("/userProduct",user_product_routes)
router.use("/wishlist",wishlist_routes)

module.exports = router