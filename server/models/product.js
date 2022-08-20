const { model, Schema } = require("mongoose");


const reviewSchema = Schema({
	name: {
		type: String,
		require: true
	},
	rating: {
		type: String,
		require: true
	},
	comment: {
		type: String,
		require: true
	},

	user: {
		type: Schema.Types.ObjectId,
		require: true,
		ref: "User"
	}
})

let product = {
	name: {
		type: String,
		require: true,
	},
	image1: {
		type: String,
		require: true
	},
	image2: {
		type: String,
		require: true
	},
	image3: {
		type: String,
		require: true
	},
	rating: {
		type: Number,
		require: true,
		default: 0
	},

	price: {
		type: Number,
		require: true,
		default: 0
	},

	cost: {
		type: Number,
		require: true,
		default: 0
	},

	supplier: {
		type: Schema.Types.ObjectId,
		require: true,
		ref: "Supplier"
	},

	offsetPrice: {
		type: Number,
		require: true,
		default: 0
	},

	numReviews: {
		type: Number,
		require: true,
		default: 0
	},
	countInStock: {
		type: Number,
		require: true,
		default: 0
	},
	reviews: [reviewSchema],

};

const ProductModel = new Schema(
	{
		...product,
	},
	{ timestamps: true }
);
module.exports.product = Object.keys(product);
module.exports.Product = model("Product", ProductModel);
