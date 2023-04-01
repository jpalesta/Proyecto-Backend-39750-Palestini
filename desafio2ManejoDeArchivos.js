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
        await this.read()
        console.log(this.products)
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
            throw 'Ya existe un producto con ese código'
        }

        if (this.products.length === 0) {
            this.products.push({ id: 1, ...newProduct })
        } else {
            this.products.push({
                id: this.products[this.products.length - 1].id + 1, ...newProduct
            })
        }
        this.write()
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


//Al correr el código se instancia la clase y se corre el método getProducts que, al estar el archivo vacío, devuelve un array vacío
const product = new ProductManager();

// product.getProducts()

//A continuación comentar la línea 103 y descomentar las lineas 107 a 114

// product.addProducts({
//     title: "Primer Producto",
//     description: 'Descripción Primer Producto',
//     price: 5000,
//     thumbnail: 'Link Primer Producto',
//     code: 'A01',
//     stock: 1000
// })

//A continuación comentar las lineas 107 a 114 y descomentar la 118

// product.getProducts()

//A continuación comentar la linea 118 y descomentar las lineas 122 a 127. Con esto se busca comprobar que no permita la carga del "Primer Producto" por estar repetido

// product.addProducts({
//     title: "Primer Producto",
//     description: 'Descripción Primer Producto',
//     price: 5000,
//     thumbnail: 'Link Primer Producto',
//     code: 'A01',
//     stock: 1000
// })

//A continuación comentar la linea 120 a 126 y descomentar la linea 131 a 146. Con esto se busca comprobar que no permita la carga del "Primer Producto" por estar repetido

product.addProducts({
    title: 'Segundo Producto',
    description: 'Descripción Segundo Producto',
    price: 10000,
    thumbnail: 'Link Segundo Producto',
    code: 'A02',
    stock: 2000
})
product.addProducts({
    title: 'Tercer Producto',
    description: 'Descripción Tercer Producto',
    price: 10000,
    thumbnail: 'Link Tercer Producto',
    code: 'A03',
    stock: 2000
});

//A continuación comentar  la linea 131 a 146 y descomentar la linea 150

// product.getProductsById(2)

//A continuación comentar la linea 150 y descomentar la linea 154. Debería mostrar un mensaje de error por no encontrar el producto.

// product.getProductsById(8)

//A continuación comentar la linea 154 y descomentar la linea 158 a 160. 

// product.updateProduct(1, {
//     title: "Producto modificado",
// })

//A continuación comentar la linea 158 a 160 y descomentar la linea 164 a 166. Se busca que muestre un mensaje de error porque no existe el producto a actualizar.

// product.updateProduct(8, {
//     title: "Producto modificado",
// })

//A continuación comentar la linea 164 a 166 y descomentar la linea 170. 

// product.deleteProduct(1)

//A continuación comentar la linea 170 y descomentar la linea 174. Se busca que muestre un mensaje de error porque no existe el producto a eliminar.

// product.deleteProduct(7)

//FIN