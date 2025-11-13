const express = require("express");
const router = express.Router();
const {
	createProducts,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
} = require("../controller/product");
router.post("/create-products", createProducts);
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
