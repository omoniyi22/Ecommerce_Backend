const Order = require('../models/order')
module.export = {
  async GetAllFromOrderSchema(req, res) {
    try {
      let allproduct = Order.find()
      res.status(200).json({
        msg: "",
        data: allproduct
      })
    } catch (error) {
      await res.status(401).json({
        msg: "Failed"
      })
    }
  },

  async AddToCart(req, res) {
    try {
      let product = { product: req.body.id, profile: req.user._id, status: "cart" }
      let newProduct = new Order(product)
      let saveProduct = await newProduct.save()
      await res.status(200).json({
        msg: "Product add to Cart",
        data: saveProduct
      })
    } catch (error) {
      await res.status(401).json({
        msg: "Product not added"
      })
    }
  },

  async deleteFromCart(req, res) {
    try {
    } catch (error) {
    }
  },

  async makeOrder(req, res) {
    try {
      let { ...data } = await req.body
    } catch (error) {

    }
  },

  async deleteOrder(req, res) {
    try {

    } catch (error) {

    }
  }
}