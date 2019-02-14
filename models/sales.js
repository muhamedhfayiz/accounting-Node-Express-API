const mongoose= require('mongoose');


const salesSchema = mongoose.Schema({
	id:{
		type: String,
		required: true
	},
	shopName:{
		type: String,
		required: true
	},
	date:{
		type: String,
		required: true
	},
	salesAmount:{
		type: Number,
		required: true
	},

	narration:{
		type: String,
		required:true

	}
});

const sales = module.exports = mongoose.model('sales',salesSchema);