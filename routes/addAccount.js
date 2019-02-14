const express = require('express');
const router = express.Router(); 
var passport = require("passport");

const AddAccount = require('../models/addAccount');

//retriving data
router.get('/addAccount',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	AddAccount.find(function(err, addAccount){
		res.json(addAccount);
	})
});

//add data

router.post('/addAccount', passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	let newAddAccount = new AddAccount({
		id: req.body.id,
		accountName: req.body.accountName,
		mainBranch: req.body.mainBranch,
		accountType: req.body.accountType,
		amount: req.body.amount,
		startAmount: req.body.startAmount
		
	});

	newAddAccount.save((err, addAccount)=>{
		if(err){
				res.json({msg: 'failed to add'});
		}
		else{
			res.json({msg: 'addAccount added succesfully'});
		}
	});

});


//updating data

router.put('/addAccount/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	
	AddAccount.findById({ _id: req.params.id }, function (err, result) {
			if (err) {
				res.json(err);
			}

			// result.accountName = req.body.accountName,
			// result.mainBranch = req.body.mainBranch,
			// result.accountType = req.body.accountType,
			result.amount = req.body.amount
			// result.startAmount = req.body.startAmount
	
			result.save((err, addAccount) => {
				if (err) {
					res.json(err + { msg: 'failed to add' });
				}
				else {
					res.json({ msg: 'addAccount updated succesfully' });
				}
			});
		});
	});


	
//delete addAccount

router.delete('/addAccount/:id', passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	AddAccount.remove({_id:req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;