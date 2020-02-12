const mongoose = require('mongoose'),
      connectionUri = process.env.DBCONNECT; //Connection URI defined in .env file


// Connects to DB using Mongoose API
module.exports = async function(){

    mongoose.connect(connectionUri)
        .then(() => {
            console.log("Connected to database successfully.")
        })
        .catch((err) => {
            console.log(err);
        })
}