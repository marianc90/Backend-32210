class ProductManager{
    constructor(path){
        this.products=new Array();
        this.path=path;
    }

    getNextId(){
        let size = this.products.length
        return size > 0 ? this.products[size-1].id + 1 : 1 
    }   

    #newProduct(id,title,description,price,thumbnail,code,stock){
        const newProduct={
            id: id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        return newProduct;
    }

    #errorCheck(newProduct, operation){
        const errors=new Array();
        if (operation == "add") {
            this.products.forEach(element => {if (element.code == newProduct.code) errors.push(`Code "${newProduct.code}" already exists`)})
        }
        if (Object.values(newProduct).includes(undefined)) errors.push('There are empty fields.')
        return errors
    }

    #getIndex(id){
        let index;
        let product = this.getProductById(id)

        if (product != "Product Id not found") index=this.products.indexOf(product) 
        else return console.log(product); 

        return index
    }

    addProduct(title,description,price,thumbnail,code,stock){
        const newProduct= this.#newProduct(this.getNextId(),title,description,price,thumbnail,code,stock)
        const errors = this.#errorCheck(newProduct,"add")
        errors.length == 0 ? this.products.push(newProduct) : errors.forEach(error=> console.error(error))
    }

    getProducts = () => this.products;

    getProductById = (id) => this.products.find(product => product.id == id) || "Product Id not found";
    
    updateProductById = (id,title,description,price,thumbnail,code,stock) => {

        const index = this.#getIndex(id)
        const updatedProduct= this.#newProduct(id,title,description,price,thumbnail,code,stock)
        const errors = this.#errorCheck(updatedProduct, "update")
        errors.length == 0 ? this.products[index]=updatedProduct : errors.forEach(error=> console.error(error))

    }
    deleteProductById = (id) => {
        const index = this.#getIndex(id)
        this.products.splice(index, 1)
    }
}

const productosControlador = new ProductManager("explorer.js")
console.table(productosControlador.getProducts())

productosControlador.addProduct("Aspiradora","Aspira todo tu piso",100,"http://url.com",12521,30)
productosControlador.addProduct("Oso de peluche","Color blanco",20,"http://url.com",33244,43)
productosControlador.addProduct("Lapicera Negra","Para escribir lo que quieras",2,"http://url.com",24432,100)

console.table(productosControlador.getProducts())

//"Intentando ingresar sin el campo stock
productosControlador.addProduct("Lapicera Negra","Para escribir lo que quieras",2,"http://url.com",24433)

//Intentando ingrsar el mismo producto con el 'code' repetido
productosControlador.addProduct("Lapicera Negra","Para escribir lo que quieras",2,"http://url.com",24432,100)

console.table(productosControlador.getProducts())

productosControlador.updateProductById(3,"Lapicera Azul","Para escribir lo que quieras",2,"http://url.com",24432,100); 
console.table(productosControlador.getProductById(3)); 

//Not found
console.table(productosControlador.getProductById(4)); 

productosControlador.deleteProductById(2)

console.table(productosControlador.getProducts())

console.table(productosControlador.getProductById(2)); 