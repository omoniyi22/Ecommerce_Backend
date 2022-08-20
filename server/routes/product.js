const ProductController = require('../controllers/ProductController')
const { Auth } = require("../middlewares/Auth")

const ProductRoutes = async (router) => {
  router.route('/products/index_products')
    .get(ProductController.indexProducts)

  router.route('/products/type/:id')
    .get(ProductController.productCategory)

  router.route('/products/:id')
    .get(ProductController.singleProduct)

  router.route('/products/search/:id')
    .get(ProductController.search)
}

module.exports = ProductRoutes