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

module.exports = { connect };


//mongodb://127.0.0.1:27017/${databaseName}

//mongodb+srv://princo:prince123@cluster0.i0nhr.mongodb.net/store?retryWrites=true&w=majority