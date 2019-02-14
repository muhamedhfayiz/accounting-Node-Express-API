const express = require('express');
const router = express.Router();
var passport = require("passport");

const Paid = require('../models/paid');

//retriving data
router.get('/paid',passport.authenticate('jwt', { session: false }), (req, res, next) => {
	Paid.find(function (err, paid) {
		res.json(paid);
	})
});

//add data

router.post('/paid',passport.authenticate('jwt', { session: false }), (req, res, next) => {

	let newPaid = new Paid({
		AccName: req.body.AccName,
		shopName: req.body.shopName,
		date: req.body.date,
		paidAmount: req.body.paidAmount,
		type: req.body.type,
		balance: req.body.balance

	});

	newPaid.save((err, paid) => {
		if (err) {
			res.json('failed to add');
		}
		else {
			res.json('paid added succesfully');
		}
	});

});

//update 

router.put('/paid/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {

	Paid.findById({ _id: req.params.id }, function (err, result) {
		if (err) {
			res.json(err);
		}
		result.AccName = req.body.AccName,
		result.shopName = req.body.shopName,
		result.date = req.body.date,
		result.paidAmount = req.body.paidAmount,
		result.type = req.body.type

		result.save((err, paid) => {
			if (err) {
				res.json(err + { msg: 'failed to add' });
			}
			else {
				res.json({ msg: 'paid updated succesfully' });
			}
		});
	});
});


//delete paid

router.delete('/paid/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {

	Paid.remove({ _id: req.params.id }, function (err, result) {
		if (err) {
			res.json(err);
		}
		else {
			res.json(result);
		}
	});
});

module.exports = router;