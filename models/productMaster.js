const mongoose = require('mongoose');


const productMasterSchema = mongoose.Schema({
	
	productName: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	quantity: {
		type: String,
		required: true
	},

	productImage: {
		type: String,
		required: false
	}

});

const productMaster = module.exports = mongoose.model('productMaster', productMasterSchema);