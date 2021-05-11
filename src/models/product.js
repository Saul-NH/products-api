const { Schema, model} = require('mongoose');

const productSchema = new Schema({
    name : String,
    category : String,
    price : Number,
    imgUrl: String
}, {
    timestamps: true,
    versionKey : false
});

module.exports = model('Product', productSchema)