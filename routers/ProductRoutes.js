const express = require("express");
const productController = require("./../controllers/productController");
const productRouter = express.Router();
//routes
productRouter
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.addProduct);

productRouter
.route("/:id")
.get(productController.getProductById)
.put(productController.UpdateProductById)
.delete(productController.DelProduct);

module.exports = productRouter;