const mongoose= require('mongoose');


const closeSchema = mongoose.Schema({

	closeShop:{
		type: String,
		required: true
	},
	closeAmount:{
		type: Number,
		required: true
	},
	date:{
		type: String,
		required: true
	}
});

const close = module.exports = mongoose.model('close',closeSchema);