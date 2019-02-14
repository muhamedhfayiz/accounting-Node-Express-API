const mongoose = require('mongoose');


const registerSchema = mongoose.Schema({
	
	companyName: {
		type: String,
		required: true
	},
	admin: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}, 
	password: {
		type: String,
		required: true
	}

});

const register = module.exports = mongoose.model('register', registerSchema);