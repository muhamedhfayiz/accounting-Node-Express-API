const express = require('express');
const router = express.Router();
var passport = require("passport");

const creditSales = require('../models/creditSales');

//retriving data
router.get('/creditsales',passport.authenticate('jwt', { session: false }), (req, res, next) => {
	creditSales.find(function (err, creditsales) {
		res.json(creditsales);
	})
});

//add data

router.post('/creditsales',passport.authenticate('jwt', { session: false }), (req, res, next) => {

	let newcreditSales = new creditSales({
		id: req.body.id,
		accName: req.body.accName,
		shopName: req.body.shopName,
		date: req.body.date,
		creditsalesAmount: req.body.creditsalesAmount,
		narration: req.body.narration

	});

	newcreditSales.save((err, creditsales) => {
		if (err) {
			res.json(err + { msg: 'failed to add' });
		}
		else {
			res.json({ msg: 'creditsales added succesfully' });
		}
	});

});

//update 


router.put('/creditsales/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {
	
	creditSales.findById({ _id: req.params.id }, function (err, result) {
			if (err) {
				res.json(err);
			}
			result.accName = req.body.accName,
			result.shopName = req.body.shopName,
			result.date = req.body.date,
			result.creditsalesAmount = req.body.creditsalesAmount,
			result.narration = req.body.narration
	
			result.save((err, creditPurchase) => {
				if (err) {
					res.json(err + { msg: 'failed to add' });
				}
				else {
					res.json({ msg: 'creditsales updated succesfully' });
				}
			});
		});
	});
	


	//delete creditsales

	router.delete('/creditsales/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {

		creditSales.remove({ _id: req.params.id }, function (err, result) {
			if (err) {
				res.json(err);
			}
			else {
				res.json(result);
			}
		});
	});

	module.exports = router;