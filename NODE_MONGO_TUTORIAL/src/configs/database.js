const mongoose = require("mongoose");
const dotenv= require('dotenv')
dotenv.config()

const connect = (databaseName) => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>console.log("database connected"));
};

const close = () => {
  return mongoose.connection.close();
};
module.exports = { connect, close };


//mongodb://127.0.0.1:27017/${databaseName}