const express = require("express");
const session = require("express-session");
const passport = require("passport");
const databaseConnection = require("./DBconnection/db");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: true,  // Adjust according to your needs
  credentials: true
}));

// Connect to the database
databaseConnection();

// Session middleware
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());  

// Routes
app.use("/v1", router);




// Handle 404 - route not found
app.use((req, res, next) => {
  res.status(404).send("Route not defined");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(5500, () => {
  console.log("Server is running on port 5500");
});
