const express = require("express")
const { user_product_Controller } = require("../controller")
const authToken = require("../middleware/authToken")


const router = express.Router()

router.post("/addToCart/:productId",
    authToken,
    user_product_Controller.addToCart
)

router.post("/getUserProduct",
    authToken,
    user_product_Controller.getUserProduct
)
router.post("/AddQuantity/:productId",
    authToken,
    user_product_Controller.AddQuantity
)

router.post("/DecQuantity/:productId",
    authToken,
    user_product_Controller.DecQuantity
)

router.post(
    "/deleteProduct/:productId",
    authToken,
    user_product_Controller.deleteProduct
)

router.post(
   "/countProduct",
   authToken,
   user_product_Controller.countProduct
)

router.post(
    "/userOderProductEmpty",
    authToken,
    user_product_Controller.userOderProductEmpty
)


module.exports = router