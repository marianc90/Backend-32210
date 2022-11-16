class ProductManager{
    constructor(){
        this.products=new Array();

    }
    getNextId(){
        let size = this.products.length
        return size > 0 ? this.products[size-1].id + 1 : 1 
    }   
    addProduct(title,description,price,thumnail,code,stock){
        const newProduct={
            id: this.getNextId(),
            title,
            description,
            price,
            thumnail,
            code,
            stock
        }
        this.#errorCheck(newProduct).length == 0 ? this.products.push(newProduct) : this.#errorCheck(newProduct).forEach(error=> console.error(error))
    }
    #errorCheck(newProduct){
        const errors=new Array();
        this.products.forEach(element => {if (element.code == newProduct.code) errors.push(`Code "${newProduct.code}" already exists`)})
        if (Object.values(newProduct).includes(undefined)) errors.push('There are empty fields.')
        return errors
    }
    getProducts = () => this.products;
    getProductById = (id) => this.products.find(product => product.id == id) || "Not found";

}

const productosControlador = new ProductManager()
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

console.table(productosControlador.getProductById(3)); 
console.table(productosControlador.getProductById(4)); 
