const express = require('express');
const router = express.Router();
var passport = require("passport");

const PayCreditPurchase = require('../models/payCreditPurchase');

//retriving data
router.get('/payCreditPurchase',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	PayCreditPurchase.find(function(err, payCreditPurchase){
		res.json(payCreditPurchase);
	})
});

//add data

router.post('/payCreditPurchase',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	let newPayCreditPurchase = new PayCreditPurchase({
		id: req.body.id,
        accName: req.body.accName,
		shopName: req.body.shopName,
		date: req.body.date,
		payCreditPurchaseAmount: req.body.payCreditPurchaseAmount,
		
		
	});

	newPayCreditPurchase.save((err, payCreditPurchase)=>{
		if(err){
			res.json({msg: 'failed to add'});
		}
		else{
			res.json({msg: 'payCreditPurchase added succesfully'});
		}
	});

});

//delete payCreditPurchase

router.delete('/payCreditPurchase/:id',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	PayCreditPurchase.remove({_id:req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;