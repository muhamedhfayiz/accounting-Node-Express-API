const mongoose= require('mongoose');


const creditPurchaseSchema = mongoose.Schema({

	id:{
		type: String,
		required: true
	},
	AccName: {
		type:String,
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
	creditPurchaseAmount:{
		type: Number,
		required: true
	},

	narration:{
		type: String,
		required:true

	}
});

const creditPurchase = module.exports = mongoose.model('creditPurchase',creditPurchaseSchema);