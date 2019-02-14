const mongoose= require('mongoose');


const payCreditPurchaseSchema = mongoose.Schema({
	id:{
		type: String,
		required: true
	},
    accName: {
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
	payCreditPurchaseAmount:{
		type: Number,
		required: true
	}
});

const payCreditPurchase = module.exports = mongoose.model('payCreditPurchase',payCreditPurchaseSchema);