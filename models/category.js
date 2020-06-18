//schema definition for categories

const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }    
});

const Category = mongoose.model('Category',categorySchema);
module.exports = Category;