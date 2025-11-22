require('dotenv').config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const ProductRoutes = require('./routes/productsRoute.js')

// initialize the express app
const app = express()

// middlewares & routes
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send("Hello From Sellify Backend")
})

// ....
app.use('/api/products', ProductRoutes)
// mongoDB atlas connection...
const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 4000
mongoose.connect(MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`CONNECTED & RUNNING ON PORT: http://localhost:${PORT}`))
    })
    .catch((error) => {
        console.log(error);
    })