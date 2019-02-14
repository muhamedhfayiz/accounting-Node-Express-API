const express = require('express');
const router = express.Router(); 
var passport = require("passport");

const ProductMaster = require('../models/productMaster');

//retriving data
router.get('/productMaster',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	ProductMaster.find(function(err, productMaster){
		res.json(productMaster);
	})
});

//add data

router.post('/productMaster', passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	let newProductMaster = new ProductMaster({
		productName: req.body.productName,
		category: req.body.category,
		price: req.body.price,
		quantity: '1',
		productImage: req.body.productImage
		
	});

	newProductMaster.save((err, productMaster)=>{
		if(err){
				res.json({msg: 'failed to add'});
		}
		else{
			res.json({msg: 'productMaster added succesfully'});
		}
	});

});


//updating data

router.put('/productMaster/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	
	ProductMaster.findById({ _id: req.params.id }, function (err, result) {
			if (err) {
				res.json(err);
			}

			result.productName= req.body.productName
            result.category = req.body.category
            result.price = req.body.price
            result.productImage =  req.body.productImage
		
			result.save((err, productMaster) => {
				if (err) {
					res.json(err + { msg: 'failed to add' });
				}
				else {
					res.json({ msg: 'productMaster updated succesfully' });
				}
			});
		});
	});


	
//delete productMaster

router.delete('/productMaster/:id', passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	ProductMaster.remove({_id:req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;