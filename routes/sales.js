const express = require('express');
const router = express.Router();

const Sales = require('../models/sales');

//retriving data
router.get('/sales', (req, res, next)=>{
	Sales.find(function(err, sales){
		res.json(sales);
	})
});

//add data

router.post('/sales', (req, res, next)=>{

	let newSales = new Sales({
		id: req.body.id,
		shopName: req.body.shopName,
		date: req.body.date,
		salesAmount: req.body.salesAmount,
		narration: req.body.narration
		
	});

	newSales.save((err, sales)=>{
		if(err){
			res.json({msg: 'failed to add'});
		}
		else{
			res.json({msg: 'sales added succesfully'});
		}
	});

});

//update 

router.put('/sales/:id', (req, res, next) => {
	
		Sales.findById({ _id: req.params.id }, function (err, result) {
			if (err) {
				res.json(err);
			}
			
			result.accName = req.body.accName,
			result.shopName = req.body.shopName,
			result.date = req.body.date,
			result.salesAmount = req.body.salesAmount,
			result.narration = req.body.narration
	
	
			result.save((err, sales) => {
				if (err) {
					res.json(err + { msg: 'failed to add' });
				}
				else {
					res.json({ msg: 'sales updated succesfully' });
				}
			});
		});
	});

//delete sales

router.delete('/sales/:id', (req, res, next)=>{

	Sales.remove({_id:req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;