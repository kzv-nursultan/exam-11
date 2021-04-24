const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Category'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    price: {
        type: Number,
        min: 0
    }
})

const Good = mongoose.model('Good', GoodSchema);
module.exports = Good;