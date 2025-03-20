const { User } = require("../model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer = require('nodemailer');




const SignupUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }
    const { password } = req.body;
    const bcryptPassword = await bcrypt.hash(password, 12);
    req.body.password = bcryptPassword;
    req.body.role = "user";
    const newUser = await User.create(req.body);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      throw new Error("User not found");
    }

    const encryptPassword = await bcrypt.compare(password, loginUser.password);
    if (!encryptPassword) {
      throw new Error("Invalid credentials");
    }

    const tokenData = { _id: loginUser._id, email: loginUser.email, role: loginUser.role };
    const token = jwt.sign(tokenData, "siddh123", { expiresIn: "5h" });
    console.log(token);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: token
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }

};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 12);

    // Save hashed token in database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send Reset Email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "utsavvanani12345@gmail.com",
        pass: "axmd wvud qejf xovx"
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`; // Frontend URL
    const mailOptions = {
      from: "utsavvanani12345@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Reset token sent to email",
      resetToken
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const {  newPassword } = req.body;
    
    const user = await User.findOne({ resetPasswordExpire: { $gt: Date.now() } });
    if (!user) throw new Error("Invalid or expired token");

    const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isTokenValid) throw new Error("Invalid token");

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "utsavvanani12345@gmail.com",
        pass: "axmd wvud qejf xovx"
      },
    });

    const mailOptions = {
      from: "utsavvanani12345@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      text: `Password reset successfully`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User not found");
    }
    // console.log(user);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const userLogout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout Successfully",
      data: []
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const allUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const changeUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body
    const updateRole = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { role: role } },
      { new: true }
    );
    if (!updateRole) {
      throw new Error("not updated")
    }
    res.status(200).json({
      success: true,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body
    const response = await User.findByIdAndDelete({ _id: userId })
    res.status(200).json({
      data: response,
      success: true
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


module.exports = { SignupUser, LoginUser, currentUser, userLogout, forgotPassword, resetPassword, allUser, changeUserRole, deleteUser };