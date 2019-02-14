const express = require('express');
const router = express.Router();
var passport = require("passport");

const CashPurchase = require('../models/cashPurchase');

//retriving data
router.get('/cashPurchase',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	CashPurchase.find(function(err, cashPurchase){
		res.json(cashPurchase);
	})
});

//add data

router.post('/cashPurchase',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	let newCashPurchase = new CashPurchase({
		id: req.body.id,
		shopName: req.body.shopName,
		date: req.body.date,
		cashPurchaseAmount: req.body.cashPurchaseAmount,
		narration: req.body.narration
		
	});

	newCashPurchase.save((err, cashPurchase)=>{
		if(err){
				res.json({msg: 'failed to add'});
		}
		else{
			res.json({msg: 'cashPurchase added succesfully'});
		}
	});

});


//update data
router.put('/cashPurchase/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {
	
	CashPurchase.findById({ _id: req.params.id }, function (err, result) {
			if (err) {
				res.json(err);
			}

			result.shopName = req.body.shopName,
			result.date = req.body.date,
			result.cashPurchaseAmount = req.body.cashPurchaseAmount,
			result.narration = req.body.narration
	
			result.save((err, cashPurchase) => {
				if (err) {
					res.json(err + { msg: 'failed to add' });
				}
				else {
					res.json({ msg: 'cashPurchase updated succesfully' });
				}
			});
		});
	});

//delete cashPurchase

router.delete('/cashPurchase/:id',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	CashPurchase.remove({_id:req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;