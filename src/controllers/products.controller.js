const Product = require('../models/product');

 /********************/  
 /** CREATE-PRODUCT **/  
 /********************/ 
const createProduct = async(req, res) => {
    try {
        const newProduct = new Product(req.body);
        const propductCreated = await newProduct.save()
        res.status(201).json(propductCreated)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'Something was wrong'
        })
    }
}

 /********************/  
 /*** GET-PRODUCTS ***/  
 /********************/ 
const getProducts = async(req, res) => {
    try {
        const allPRoducts = await Product.find()
        res.status(200).json(allPRoducts)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'Something was wrong'
        })
    }
}

 /*********************/  
 /* GET-PRODUCT-BY-ID */  
 /*********************/ 
const getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
        if(!product){
            res.status(404).json({
                message : "Product not found"
            })
        }
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'Something was wrong'
        })
    }
}

 /************************/  
 /* UPDATE-PRODUCT-BY-ID */  
 /************************/ 
const updateProductById = async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new : true});
    
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'Something was wrong'
        })
    }
}

 /************************/  
 /* DELETE-PRODUCT-BY-ID */  
 /************************/
const deleteProductById = async(req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
        if(!deletedProduct){
            return res.status(404).json('Product not found')
        }
        res.status(200).json('Deleted product');
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'Something was wrong'
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById      
}