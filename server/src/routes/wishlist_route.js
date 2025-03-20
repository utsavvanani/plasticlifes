    const express = require("express");
    const authToken = require("../middleware/authToken");
    const { wishlist_controller } = require("../controller");
    const router = express.Router();

    router.post(
        "/addToWish/:productId",
        authToken,
        wishlist_controller.addToWishlist
    )

    router.get(
        "/getWishlist",
        authToken,
        wishlist_controller.getWishlist
    )

    router.post(
        "/deleteWishlist/:productId",
        authToken,
        wishlist_controller.deleteWishlist
    )

    module.exports = router