const mongoose = require('mongoose');


const categoryMasterSchema = mongoose.Schema({

    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
        required: true
    }

});

const categoryMaster = module.exports = mongoose.model('categoryMaster', categoryMasterSchema);