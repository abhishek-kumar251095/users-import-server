const mongoose = require('mongoose'),
      reqModel = require("../../DB/Models/user");  
      userModel = mongoose.model("User"),
      csvToJson = require('csvtojson'),
      services = require('../Services/user');
      

/*Gets the data from the User collection.
* Server-side pagination applied to divide the
* data into pages.
*/
exports.getUsers = async function(req, res){

    let userCount = await services.getCount();

    userModel.find({})
        .sort({'FirstName':1})
        .limit(30)
        .skip((req.query.page-1) * 30)
        .exec()
        .then(response => {
            let apiResponse = {
                totalCount: userCount,
                values:response
            }
            res.json(apiResponse);
        })
        .catch(err => {
            console.log(err);
        });
}

/*Converts the.csv file in the mentioned path
* to a JSON frormat using csvtojson package and
* inserts the resulting data into the User collection.
*/
exports.uploadUserData = function(filename){
    
    const csvFilePath = process.env.FILE_PATH
                                + '/' + filename;

        csvToJson()
        .fromFile(csvFilePath)
        .then(users => {
            userModel.insertMany(users)
        })
        .then(() => {
            console.log("User data inserted!");
        })
        .catch(error => {
            console.log(error);
        });
    
}

//Deletes all the data from the User collection
exports.removeData = function(req, res){
    return userModel.deleteMany({})
            .exec()
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                console.log(err);
            });
}





