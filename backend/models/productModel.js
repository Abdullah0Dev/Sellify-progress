const mongoose = require('mongoose')

const ItemPriceSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        enum: ["S", "M", "L"],
        required: true,
    },
})
// types of product...
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    prices: {
        type: [ItemPriceSchema],
        required: true,
    },
    average_rating: {
        type: Number,
        default: 4.5,
    },
    images: {
        type: [String], // ["https://image1.png", "https://image1.png"]
        required: true,
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
        enum: [
            "T-Shirts",
            "Shirts",
            "Hoodies",
            "Sweatshirt",
            "Jackets",
            "Pants",
            "Jeans",
            "Shorts",
            "Suits",
            "Traditional Wear",
            "Shoes",
            "Accessories",
        ],
        default: 'T-Shirts'
    },
    quantity: {
        type: Number,
        default: 1
    }

}, { timestamps: true })


// export the schema
module.exports = mongoose.model('Products', ProductSchema)