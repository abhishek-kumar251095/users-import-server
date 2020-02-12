'use strict';

const mongoose = require('mongoose'),
      schema = mongoose.Schema;

const userSchema = new schema({
    FirstName: {
		type: String
	},
	LastName: {
		type: String
	},
	Email: {
		type: String
	}, 
	Phone: {
		type: String
	},
	Address: {
		type: String
	},
	Gender: {
		type: String
    },
    IsEmailSent:{
        type:Boolean,
        default:false
    }
});

//Index for the schema
userSchema.index({ FirstName: 1, IsEmailSent: 1, Email: 1,  LastName: 1, Phone: 1, Address: 1, Gender: 1}); 

const User = mongoose.model("User",userSchema);

module.exports = User;




