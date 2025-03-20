const { default: mongoose } = require("mongoose");

const databaseConnetion = () => {
  mongoose
    .connect(
      // "mongodb+srv://utsavvanani030705:utsavvanani030705@cluster0.idexm.mongodb.net/platic"
      "mongodb+srv://tushar:tushar123@cluster0.0b2bc.mongodb.net/platic"
    )
    .then(() => {
      console.log("connect database");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = databaseConnetion;
