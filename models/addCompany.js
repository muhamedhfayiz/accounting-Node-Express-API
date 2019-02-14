const mongoose= require('mongoose');


const addcompanySchema = mongoose.Schema({
	id:{
		type: String,
		required: true
	},
	companyName:{
		type: String,
		required: true
	},
	companyNametrue:{
		type: Boolean,
		required: true
	}
});

const addcompany = module.exports = mongoose.model('addcompany',addcompanySchema);