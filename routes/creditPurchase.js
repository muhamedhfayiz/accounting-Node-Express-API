const express = require('express');
const router = express.Router();
var passport = require("passport");

const CreditPurchase = require('../models/creditPurchase');

//retriving data
router.get('/creditPurchase',passport.authenticate('jwt', { session: false }), (req, res, next) => {
	CreditPurchase.find(function (err, creditPurchase) {
		res.json(creditPurchase);
	})
});

//add data

router.post('/creditPurchase',passport.authenticate('jwt', { session: false }), (req, res, next) => {

	let newCreditPurchase = new CreditPurchase({
		id: req.body.id,
		AccName: req.body.AccName,
		shopName: req.body.shopName,
		date: req.body.date,
		creditPurchaseAmount: req.body.creditPurchaseAmount,
		narration: req.body.narration

	});

	newCreditPurchase.save((err, creditPurchase) => {
		if (err) {
			res.json('failed to add');
		}
		else {
			res.json('creditPurchase added succesfully');
		}
	});

});

//update 

router.put('/creditPurchase/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {

	CreditPurchase.findById({ _id: req.params.id }, function (err, result) {
		if (err) {
			res.json(err);
		}
		result.AccName = req.body.AccName,
		result.shopName = req.body.shopName,
		result.date = req.body.date,
		result.creditPurchaseAmount = req.body.creditPurchaseAmount,
		result.narration = req.body.narration

		result.save((err, creditPurchase) => {
			if (err) {
				res.json(err + { msg: 'failed to add' });
			}
			else {
				res.json({ msg: 'creditPurchase updated succesfully' });
			}
		});
	});
});


//delete creditPurchase

router.delete('/creditPurchase/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {

	CreditPurchase.remove({ _id: req.params.id }, function (err, result) {
		if (err) {
			res.json(err);
		}
		else {
			res.json(result);
		}
	});
});

module.exports = router;