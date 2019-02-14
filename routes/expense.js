const express = require('express');
const router = express.Router();
var passport = require("passport");

const Expense = require('../models/expense');

//retriving data
router.get('/expense',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	Expense.find(function(err, expense){
		res.json(expense);
	})
});

//add data

router.post('/expense',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	let newExpense = new Expense({
		id: req.body.id,
		shopName: req.body.shopName,
		date: req.body.date,
		expenseType: req.body.expenseType,
		expenseAmount: req.body.expenseAmount,
		expenseNarration: req.body.expenseNarration
	});

	newExpense.save((err, expense)=>{
		if(err){
				res.json('failed to add');
		}
		else{
			res.json('expense added succesfully');
		}
	});

});

//update 

router.put('/expense/:id',passport.authenticate('jwt', { session: false }), (req, res, next) => {
	
		Expense.findById({ _id: req.params.id }, function (err, result) {
			if (err) {
				res.json(err);
			}
			
			result.shopName = req.body.shopName,
			result.date = req.body.date,
			result.expenseType = req.body.expenseType,
			result.expenseAmount = req.body.expenseAmount,
			result.expenseNarration = req.body.expenseNarration
	
	
			result.save((err, expense) => {
				if (err) {
					res.json(err + { msg: 'failed to add' });
				}
				else {
					res.json({ msg: 'expense updated succesfully' });
				}
			});
		});
	});


//delete expense

router.delete('/expense/:id',passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	Expense.remove({_id:req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;