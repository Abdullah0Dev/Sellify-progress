const mongoose = require("mongoose")
const Products = require("../models/productModel.js")

const getProducts = async (req, res) => {
    try {
        const products = await Products.find().sort({ createdAt: -1 })
        // logic here...
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}
const getProductByID = async (req, res) => {
    try {
        const { id } = req.params
        // check for id validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Not a valid ID" })
        }
        const product = await Products.findById(id)
        // check if not found
        if (!product) {
            return res.status(404).json({ error: "No such product" })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}
const createProduct = async (req, res) => {
    const {
        name,
        description,
        images,
        prices,
        brand,
        average_rating,
        category,
        quantity,
    } = req.body
    try {
        // check if required fields is here
        if (!name || !description || !images || !prices || !brand) {
            return res.status(400).json({ error: "Missing Required Fields" })
        }
        // create product with these data..
        const product = await Products.create({
            name,
            description,
            images,
            prices,
            brand,
            average_rating,
            category,
            quantity,
        })
        res.status(200).json(product) // product created successfully
    } catch (error) {
        console.error("couldn't create the product", error);

        res.status(500).json(error)
    }
}
const deleteProductByID = async (req, res) => {
    try {
        const { id } = req.params
        // check for id validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Not a valid ID" })
        }
        const product = await Products.findByIdAndDelete(id)
        // check if not found
        if (!product) {
            return res.status(404).json({ error: "No such product" })
        }
        res.status(200).json({ msg: `Product Deleted Successfully: ${id}`, product })
    } catch (error) {
        res.status(500).json(error)
    }
}
const updateProductByID = async (req, res) => {
    try {
        const { id } = req.params
        // check for id validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Not a valid ID" })
        }
        const product = await Products.findByIdAndUpdate(id, { ...req.body }, { new: true })
        console.log("id: ", id, product, { ...req.body });

        // check if not found
        if (!product) {
            return res.status(404).json({ error: "No such product" })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getProducts,
    getProductByID,
    createProduct,
    deleteProductByID,
    updateProductByID,
};