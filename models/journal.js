const mongoose = require('mongoose');


const journalSchema = mongoose.Schema({
	id: {
		type: String,
		required: true
	},

	journalFrom: {
		type: String,
		required: true
	},

	fromTransaction: {
		type: String,
		required: true
	},

	journalTo: {
		type: String,
		required: true
	},

	toTransaction: {
		type: String,
		required: true
	},

	amount: {
		type: Number,
		required: true
	},

	journalNarration: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	}

});

const journal = module.exports = mongoose.model('journal', journalSchema);