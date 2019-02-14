const express = require('express');
const router = express.Router();
var passport = require("passport");

const Journal = require('../models/journal');

//retriving data
router.get('/journal', (req, res, next)=>{
	Journal.find(function(err, journal){
		res.json(journal);
	})
});

//add data

router.post('/journal',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	let newJournal = new Journal({
		id: req.body.id,
		journalFrom: req.body.journalFrom,
		fromTransaction: req.body.fromTransaction,
		journalTo: req.body.journalTo,
		toTransaction: req.body.toTransaction,
		amount: req.body.amount,
		journalNarration: req.body.journalNarration,
		date: req.body.date
	});

	newJournal.save((err, journal)=>{
		if(err){
				res.json(err+'failed to add');
		}
		else{
			res.json('journal added succesfully');
		}
	});

});

//update 

router.put('/journal/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {
	
		Journal.findById({ _id: req.params.id }, function (err, result) {
			if (err) {
				res.json(err);
			}
			
		result.journalFrom = req.body.journalFrom,
		result.fromTransaction = req.body.fromTransaction,
		result.journalTo = req.body.journalTo,
		result.toTransaction = req.body.toTransaction,
		result.amount = req.body.amount,
		result.journalNarration = req.body.journalNarration,
		result.date = req.body.date
	
	
			result.save((err, journal) => {
				if (err) {
					res.json(err + { msg: 'failed to add' });
				}
				else {
					res.json({ msg: 'journal updated succesfully' });
				}
			});
		});
	});



//delete journal

router.delete('/journal/:id',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	Journal.remove({_id:req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;