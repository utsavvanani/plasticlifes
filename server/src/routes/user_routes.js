const express = require("express")
const passport = require('passport');
const { user_Controller } = require("../controller")
const authToken = require("../middleware/authToken")


const router = express.Router()
router.post("/SignupUser",
    user_Controller.SignupUser
)

router.post("/LoginUser",
    user_Controller.LoginUser
)

router.post("/currentUser",
    authToken,
    user_Controller.currentUser
)

router.post("/userLogout",
    authToken,
    user_Controller.userLogout
)

router.post("/allUser",
    authToken,
    user_Controller.allUser
)

router.post("/changeUserRole",
    user_Controller.changeUserRole
)
router.post("/deleteUser",
    user_Controller.deleteUser
)

router.post("/forgotpass", user_Controller.forgotPassword);
router.post("/resetpass/:token", user_Controller.resetPassword);




module.exports = router