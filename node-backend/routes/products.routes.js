const express = require('express');
const productsRouter = express.Router();

const productsController = require("../controller/productsController");

productsRouter.post('/add-products', productsController.addProducts);
productsRouter.get('/read-products', productsController.getAllProducts);
productsRouter.get('/read-products/:id', productsController.getProductById);
productsRouter.put('/update-products/:id', productsController.updateProduct);
productsRouter.delete('/delete-products/:id', productsController.deleteProductById);
 
module.exports = productsRouter;