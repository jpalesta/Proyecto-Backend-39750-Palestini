const express = require('express')
const ProductManager = require('../../Proyecto Backend 39750 Palestini/desafio2ManejoDeArchivos')

const app = express()
const port = 8000
const product = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {

    try {
        const products = await product.getProducts()
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`escuchando el puerto ${port}`)
})