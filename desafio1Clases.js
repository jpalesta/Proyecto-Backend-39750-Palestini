let productos = []

class ProductManager {
    constructor() {
        this.products = productos
    }

    getProducts = () => {
        return this.products
    }

    addProducts = (newProduct) => {
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
    }

    getProductsById(id) {
        let product = this.products.find(prod => prod.id === id)
        if (!product) return 'Product not found'
        return product
    }
}

const product = new ProductManager();

product.addProducts({
    title: "Primer Producto",
    description: 'Descripción Primer Producto',
    price: 5000,
    thumbnail: 'Link Primer Producto',
    code: 'A01',
    stock: 1000
})
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

console.log(product.getProducts());

console.log(product.getProductsById(2));
