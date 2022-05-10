const Products = require('../model/Products');

exports.addProducts = async (req, res) => {
    try {
        let products = new Products({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        })
        let createdProduct = await products.save();
        res.status(200).json({
            msg: "New product created",
            data: createdProduct
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }

}

exports.getAllProducts = async (req, res) => {
    try {
        let products = await Products.find();
        res.status(200).json({
            msg: "Get all products",
            data: products
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.getProductById = async (req, res) => {
    const id = req.params.id;

    try {
        let product = await Products.findById({
            _id: id
        });
        res.status(200).json({
            msg: "Get product by id",
            data: product
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = req.body;

    try {
        let productUpdate = await Products.findByIdAndUpdate( id, {
            $set: product
        });
        res.status(200).json({
            msg: "Update product",
            data: productUpdate
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.deleteProductById = async (req, res) => {
    const id = req.params.id;

    try {
        let deleteProduct = await Products.findByIdAndRemove({
            _id: id
        });
        res.status(200).json({
            msg: "Delete product",
            data: deleteProduct
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}
