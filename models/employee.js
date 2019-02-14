const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
  id:{
		type: String,
		required: true
	},

  employee_name: {
    type: String,
    required: true
  },

  passport_no: {
    type: String,
    required: true
  },

  civil_id: {
    type: String,
    required: true
  },

  dob: {
    type: String,

  },
  shopName: {
    type: String,
    required: true
  },



  mobile_number: {
    type: String
  },


  travel_details: {
    type: String
  },

  deposit: {
    type: String
  }




});

const employee = module.exports = mongoose.model('employee', employeeSchema);