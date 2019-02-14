const express = require('express');
const router = express.Router(); 
var passport = require("passport");

const CategoryMaster = require('../models/categoryMaster');

//retriving data
router.get('/categoryMaster',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	CategoryMaster.find(function(err, categoryMaster){
		res.json(categoryMaster);
	})
});

//add data

router.post('/categoryMaster', passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	let newCategoryMaster = new CategoryMaster({
		categoryName: req.body.categoryName,
		categoryImage: req.body.categoryImage
		
	});

	newCategoryMaster.save((err, categoryMaster)=>{
		if(err){
				res.json({msg: 'failed to add'});
		}
		else{
			res.json({msg: 'categoryMaster added succesfully'});
		}
	});

});


//updating data

router.put('/categoryMaster/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	
	CategoryMaster.findById({ _id: req.params.id }, function (err, result) {
			if (err) {
				res.json(err);
			}

			result.categoryName= req.body.categoryName
            result.categoryImage = req.body.categoryImage

			result.save((err, categoryMaster) => {
				if (err) {
					res.json(err + { msg: 'failed to add' });
				}
				else {
					res.json({ msg: 'categoryMaster updated succesfully' });
				}
			});
		});
	});


	
//delete categoryMaster

router.delete('/categoryMaster/:id', passport.authenticate('jwt', { session: false }), (req, res, next)=>{

	CategoryMaster.remove({_id:req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;