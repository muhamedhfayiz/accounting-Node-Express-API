const mongoose = require('mongoose');


const expenseSchema = mongoose.Schema({
	id:{
		type: String,
		required: true
	},
	shopName: {
		type: String,
		required: true
	},

	date: {
		type: String,
		required: true
	},

	expenseType: {
		type: String,
		required: true
	},

	expenseAmount: {
		type: Number,
		required: true
	},

	expenseNarration: {
		type: String,
		required: true
	}

});

const expense = module.exports = mongoose.model('expense', expenseSchema);