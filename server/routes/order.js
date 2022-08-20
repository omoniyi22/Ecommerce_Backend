const ProfileController = require('./../controllers/ProfileController')
const Auth = require("./../middlewares/Auth")

const UserRoutes = (router) => {
  router.route('/order/getOrder')
    .get(Auth.verifyToken, OrderController.getOrder)

  router.route('/order/makeOrder')
    .get(Auth.verifyToken, OrderController.makeOrder)

  router.route('/order/pendingOrder')
    .get(Auth.verifyToken, OrderController)
}

export default UserRoutes