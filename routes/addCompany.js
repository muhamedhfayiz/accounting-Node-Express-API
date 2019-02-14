const express = require('express');
const router = express.Router();
var passport = require("passport");

const AddCompany = require('../models/addCompany');

//retriving data
router.get('/addCompany',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	AddCompany.find(function(err, addCompany){
		res.json(addCompany);
	})
});

//add data

router.post('/addCompany',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	let newAddCompany = new AddCompany({
		id: req.body.id,    
		companyName: req.body.companyName,
		companyNametrue: req.body.companyNametrue
		
	});

	newAddCompany.save((err, addCompany)=>{
		if(err){
				res.json({msg: 'failed to add'});
		}
		else{
			res.json({msg: 'addCompany added succesfully'});
		}
	});

});

//delete addCompany

router.delete('/addCompany/:id',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	AddCompany.remove({_id:req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;