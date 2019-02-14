const express = require('express');
const router = express.Router();
var passport = require("passport");

const Close = require('../models/close');


//retriving data
router.get('/close',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	Close.find(function(err, close){
		var data = res.json(close);
	})
});


//add data

router.post('/close',passport.authenticate('jwt', { session: false }), (req, res, next) => {

	let newClose = new Close({

		closeShop: req.body.closeShop,		
		closeAmount: req.body.closeAmount,
		date: req.body.date
		
	});

	newClose.save((err, close) => {
		if (err) {
			res.json({ msg: 'failed to add' });
		}
		else {
			res.json({ msg: 'close added succesfully' });
		}
	});

});

//update 

router.put('/close/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {

	Close.findById({ _id: req.params.id }, function (err, result) {
		if (err) {
			res.json(err);
		}

		result.closeAmount = req.body.closeAmount,
			result.date = req.body.date


		result.save((err, close) => {
			if (err) {
				res.json(err + { msg: 'failed to add' });
			}
			else {
				res.json({ msg: 'close updated succesfully' });
			}
		});
	});
});

//delete close

router.delete('/close/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {

	Close.remove({ _id: req.params.id }, function (err, result) {
		if (err) {
			res.json(err);
		}
		else {
			res.json(result);
		}
	});
});

module.exports = router;