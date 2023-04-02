const { promises } = require('fs')
const fs = promises
class ProductManager {

    constructor() {
        this.products = []
        this.path = './products.txt'
    }

    read = async () => {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    write = async () => {
        const products = JSON.stringify(this.products);
        await fs.writeFile(this.path, products);
    }

    getProducts = async () => {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.products = JSON.parse(data);
            console.log(this.products)
        } catch (error) {
            this.products = [];
        }
    }

    addProducts = async (newProduct) => {

        await this.read()
        if (!newProduct.title ||
            !newProduct.description ||
            !newProduct.price ||
            !newProduct.thumbnail ||
            !newProduct.code ||
            !newProduct.stock) {
            throw 'todos los campos son necesarios'
        }

        let product = this.products.find(prod => prod.code === newProduct.code)

        if (product) {
            throw 'This product already exist'
        }

        if (this.products.length === 0) {
            this.products.push({ id: 1, ...newProduct })
        } else {
            this.products.push({
                id: this.products[this.products.length - 1].id + 1, ...newProduct
            })
        }
        await this.write()
    }

    getProductsById = async (id) => {

        await this.read()

        let product = this.products.find(prod => prod.id === id)
        if (!product) {
            throw 'Product not found'
        } else {
            console.log(product)
        }
    }

    updateProduct = async (id, update) => {

        await this.read()

        const productIndex = this.products.findIndex((product) => product.id === id)
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...update }
            this.write()
        } else {
            throw 'Product to update not found'
        }
    }

    deleteProduct = async (id) => {

        await this.read()

        const productIndex = this.products.findIndex((product) => product.id === id)
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1)
            this.write()
        } else {
            throw 'Product to delete not found'
        }
    }
}

//TEST 

//Al correr el código se instancia la clase y se corre el método getProducts que, al estar el archivo vacío, devuelve un array vacío

const product = new ProductManager();

// product.getProducts()

//A continuación comentar la línea 103 y descomentar las lineas 107 a 114. Correr archivo

// product.addProducts({
//     title: "Décimo Producto",
//     description: 'Descripción Décimo Producto',
//     price: 1900,
//     thumbnail: 'Link Décimo Producto',
//     code: 'A10',
//     stock: 100
// })

//A continuación comentar las lineas 107 a 114 y descomentar la 118. Correr archivo

// product.getProducts()

//A continuación comentar la linea 118 y descomentar las lineas 122 a 127. Con esto se busca comprobar que no permita la carga del "Primer Producto" por estar repetido y envíe mensaje de error por consola. Correr archivo

// product.addProducts({
//     title: "Primer Producto",
//     description: 'Descripción Primer Producto',
//     price: 5000,
//     thumbnail: 'Link Primer Producto',
//     code: 'A01',
//     stock: 1000
// })

//A continuación comentar la linea 122 a 129 y descomentar la linea 133 a 140. Correr archivo

// product.addProducts({
//     title: 'Segundo Producto',
//     description: 'Descripción Segundo Producto',
//     price: 10000,
//     thumbnail: 'Link Segundo Producto',
//     code: 'A04',
//     stock: 2000
// })

//A continuación comentar la linea 133 a 140 y descomentar la linea 144 a 151 para añadir un producto más. Correr archivo

// product.addProducts({
//     title: 'Tercer Producto',
//     description: 'Descripción Tercer Producto',
//     price: 10000,
//     thumbnail: 'Link Tercer Producto',
//     code: 'A05',
//     stock: 2000
// });

//A continuación comentar  la linea 144 a 151 y descomentar la linea 155

// product.getProductsById(2)

//A continuación comentar la linea 155 y descomentar la linea 159. Debería mostrar un mensaje de error por no encontrar el producto.

// product.getProductsById(8)

//A continuación comentar la linea 159 y descomentar la linea 163 a 165. 

// product.updateProduct(1, {
//     title: "Producto modificado",
// })

//A continuación comentar la linea 163 a 165 y descomentar la linea 169 a 171. Se busca que muestre un mensaje de error porque no existe el producto a actualizar.

// product.updateProduct(8, {
//     title: "Producto modificado",
// })

//A continuación comentar la linea 169 a 171 y descomentar la linea 175. 

// product.deleteProduct(1)

//A continuación comentar la linea 175 y descomentar la linea 179. Se busca que muestre un mensaje de error porque no existe el producto a eliminar.

// product.deleteProduct(7)

//FIN

module.exports = ProductManager;