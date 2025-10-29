const productModel = require("../models/product");

const getProducts = async (req, res) => {
	try {
		const product = await productModel
			.find({})
			.then(console.log("Products fetched successfully"));
		res.status(200).json({
			success: true,
			msg: "Products fetched successfully",
			products: product,
		});
	} catch (error) {
		console.log("Error occured in fetching products from database", error);
	}
};
const createProducts = async (req, res) => {
	try {
		const createProduct = await productModel
			.create(req.body)
			.then(console.log("Product created successfully"));
		res.status(201).json({
			success: true,
			msg: "Product created successfully",
			product: createProduct,
		});
	} catch (error) {
		console.log("Error occured in creating product", error);
	}
};

const getProductById = async (req, res) => {
	try {
		const product = await productModel.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ success: false, msg: "Product not found" });
		}

		console.log("Product fetched successfully by ID");
		res.status(200).json({ success: true, product });
	} catch (error) {
		console.log("Error occurred in fetching product by ID:", error.message);
		res.status(500).json({ success: false, msg: "Failed to fetch product" });
	}
};

const updateProduct = async (req, res) => {
	try {
		const updated = await productModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		if (!updated) {
			return res.status(404).json({ success: false, msg: "Product not found" });
		}

		console.log("Product updated successfully");
		res.status(200).json({ success: true, msg: "Product updated", product: updated });
	} catch (error) {
		console.log("Error occurred in updating product:", error.message);
		res.status(500).json({ success: false, msg: "Failed to update product" });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const deleted = await productModel.findByIdAndDelete(req.params.id);
		if (!deleted) {
			return res.status(404).json({ success: false, msg: "Product not found" });
		}

		console.log("Product deleted successfully");
		res.status(200).json({ success: true, msg: "Product deleted successfully" });
	} catch (error) {
		console.log("Error occurred in deleting product:", error.message);
		res.status(500).json({ success: false, msg: "Failed to delete product" });
	}
};

module.exports = {
	createProducts,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
};