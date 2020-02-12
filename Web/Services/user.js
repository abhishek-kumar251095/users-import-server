const mongoose = require('mongoose'),
      reqModel = require("../../DB/Models/user");  
      userModel = mongoose.model("User");
      
/*Gets users to whom the email has not been sent yet.
* The limit is currently set to 10. 
*/
exports.getUsersByMailStatus = function(req, res){
    return userModel.find({IsEmailSent:false})
            .limit(10)
            .exec()
}

//Updates the status as to whether the Email is sent or not.
exports.updateMailStatus = function(EmailAddress){
    
    return userModel.findOneAndUpdate({Email:EmailAddress}, { $set: { IsEmailSent: true }}, {upsert:false})
            .exec()
}

exports.getCount = function(req,res){
    
    return userModel.countDocuments({})
            .exec()
}