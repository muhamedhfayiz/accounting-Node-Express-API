const mongoose= require('mongoose');


const cashPurchaseSchema = mongoose.Schema({
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
	cashPurchaseAmount:{
		type: Number,
		required: true
	},

	narration:{
		type: String,
		required:true

	}
});

const cashPurchase = module.exports = mongoose.model('cashPurchase',cashPurchaseSchema);