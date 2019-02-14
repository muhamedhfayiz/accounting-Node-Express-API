const mongoose = require('mongoose');


const addaccountSchema = mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	accountName: {
		type: String,
		required: true
	},
	mainBranch: {
		type: String,
		required: false
	},
	accountType: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},

	startAmount: {
		type: Number,
		required: false
	}

});

const addaccount = module.exports = mongoose.model('addaccount', addaccountSchema);