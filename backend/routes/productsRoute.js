const express = require('express')
const {
    getProducts,
    getProductByID,
    createProduct,
    deleteProductByID,
    updateProductByID,
} = require("../controllers/productsController.js")


// initialize routes
const router = express.Router();

// get all products
router.get('/', getProducts)
// get single product. /api/products/12341234
router.get('/:id', getProductByID)

// create a new product
router.post('/', createProduct)

// delete a product
router.delete('/:id', deleteProductByID) 

// update a product
router.put('/:id', updateProductByID)

// export
module.exports = router