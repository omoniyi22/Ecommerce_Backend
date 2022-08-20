const { Product } = require('./../models/product')
module.exports = {
  async indexProducts(req, res) {
    try {
      let allProduct = await Product.find().populate("spec").populate("key_feature")
      res.status(200).json({
        msg: "All products fetched",
        allProduct
      })
    } catch (error) {
      res.status(400).json({
        msg: "There was an error",
        error: error
      })
    }
  },

  async singleProduct(req, res) {
    try {
      let oneProduct = await Product.findById(req.params.id)
      let { category } = oneProduct
      let similarProduct = await Product.find({ category }).limit(4).sort({ _id: -1 })
      res.status(200).json({
        msg: "Product fetched",
        data: {
          oneProduct,
          similarProduct
        }
      })
    } catch (error) {
      res.status(400).json({
        msg: "There was an error",
        error
      })
    }
  },

  async productCategory(req, res) {
    try {
      let category = await req.params.id
      category = await Product.find({ category }).populate("spec").populate("key_feature").sort({ _id: -1 })
      res.status(200).json({
        msg: "Product fecthed",
        category
      })
    } catch (error) {
      res.status(400).json({
        msg: "There was an error",
        error
      })
    }
  },

  async search(req, res) {
    try {
      let { id } = await req.params
      let result_1 = await Product.find({ category: new RegExp(`${id}`, 'i') }).populate("spec").populate("key_feature").sort({ _id: -1 })
      let result_2 = await Product.find({ title: new RegExp(`${id}`, 'i') }).populate("spec").populate("key_feature").sort({ _id: -1 })
      let result_3 = await Product.find({ description: new RegExp(`${id}`, 'i') }).populate("spec").populate("key_feature").sort({ _id: -1 })
      let result = [...result_1, ...result_2, ...result_3]
      res.status(200).json({
        msg: "Product fecthed",
        result,
        point: {
          prev: "",
          next: "",
          page: ""
        }
      })
    } catch (error) {
      res.status(400).json({
        msg: "There was an error",
        error
      })
    }
  }
}