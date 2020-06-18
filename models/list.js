//Schema definition for lists
const mongoose = require('mongoose');
const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date
    },
    category: {
        type: String,
        required: true
    },
    tasks: [
        
            {
                content: {
                    type: String,
                    required: true
                },
                completed: {
                    type: Boolean,
                    default: false
                },
                createdAt: {
                    type: Date,
                    default: Date.now()
                } 
            }
        
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const List = mongoose.model('List',listSchema);
module.exports = List;