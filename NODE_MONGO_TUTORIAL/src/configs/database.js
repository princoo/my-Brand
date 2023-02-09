const mongoose = require("mongoose");

const connect = (databaseName) => {
  return mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>console.log("database connected"));
};

const close = () => {
  return mongoose.connection.close();
};
module.exports = { connect, close };
