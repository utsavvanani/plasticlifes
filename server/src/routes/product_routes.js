const express = require('express')
const { product_Controller } = require('../controller')

const router = express.Router()

router.post(
    "/create_product",
    product_Controller.create_product
)

router.get(
    "/get_product",
    product_Controller.get_product
)

router.post(
    "/findProductById/:productId",
    product_Controller.findProductById
)

router.post(
    "/productDelete",
    product_Controller.productDelete
)

router.post(
    "/update_product/:id",
    product_Controller.update_product
)

module.exports = router