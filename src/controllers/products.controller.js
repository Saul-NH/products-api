const Product = require('../models/product');

 /********************/  
 /** CREATE-PRODUCT **/  
 /********************/ 
const createProduct = async(req, res) => {
    const newProduct = new Product(req.body);
    const propductCreated = await newProduct.save()
    res.status(201).json(propductCreated)
}

 /********************/  
 /*** GET-PRODUCTS ***/  
 /********************/ 
const getProducts = async(req, res) => {
    const allPRoducts = await Product.find()
    res.json(allPRoducts)
}

 /*********************/  
 /* GET-PRODUCT-BY-ID */  
 /*********************/ 
const getProductById = async(req, res) => {
    const product = await Product.findById(req.params.productId)
    if(!product){
        res.json({
            message : "No se encontro el producto"
        })
    }
    res.json(product);
}

 /************************/  
 /* UPDATE-PRODUCT-BY-ID */  
 /************************/ 
const upddateProductById = async(req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new : true});

        res.status(200).json(updatedProduct);

}

 /************************/  
 /* DELETE-PRODUCT-BY-ID */  
 /************************/
const deleteProductById = async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
    if(!deletedProduct){
        return res.status(404).json('No se encontro el producto')
    }
    res.json('Producto eliminado');
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    upddateProductById,
    deleteProductById      
}