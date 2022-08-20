const UserRoutes = require('./user')
const ProductRoutes = require('./product')

const Routes = async router => {
  await UserRoutes(router)
  await ProductRoutes(router)
}

module.exports = Routes