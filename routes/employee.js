const express = require('express');
const router = express.Router();
var passport = require("passport");

const Employee = require('../models/employee');

//retriving data
router.get('/employee',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	Employee.find(function(err, employee){
		res.json(employee);
	})
});

//add data

router.post('/employee',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	let newEmployee = new Employee({
		id: req.body.id,
		employee_name: req.body.employee_name,
		passport_no: req.body.passport_no,
		civil_id: req.body.civil_id,
		dob: req.body.dob,
		shopName: req.body.shopName,
        mobile_number: req.body.mobile_number,
		travel_details: req.body.travel_details,
		deposit: req.body.deposit
		
	});

	newEmployee.save((err, employee)=>{
		if(err){
				res.json('failed to add');
		}
		else{
			res.json('employee added succesfully');
		}
	});

});

//delete employee

router.delete('/employee/:id',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	Employee.remove({_id:req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;