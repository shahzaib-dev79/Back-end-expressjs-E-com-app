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
