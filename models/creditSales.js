const mongoose= require('mongoose');


const creditsalesSchema = mongoose.Schema({
	id:{
		type: String,
		required: true
	},
	accName: {
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
	creditsalesAmount:{
		type: Number,
		required: true
	},

	narration:{
		type: String,
		required:true

	}
});

const creditsales = module.exports = mongoose.model('creditsales',creditsalesSchema);