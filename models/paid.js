const mongoose= require('mongoose');


const paidSchema = mongoose.Schema({

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
	paidAmount:{
		type: Number,
		required: true
    },
    type:{
        type: String,
		required: true
	},
	balance:{
		type: Number,
		required: true
	}

});

const paid = module.exports = mongoose.model('paid',paidSchema);