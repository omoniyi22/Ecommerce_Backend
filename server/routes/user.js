const UserController = require('./../controllers/UserController')
const { Auth } = require("./../middlewares/Auth")

const UserRoutes = async (router) => {
  await router.route('/profiles')
    .get(Auth.verifyToken, UserController.retrieveAllUsers)

  await router.route('/profile/signUp')
    .post(UserController.signUp)

  router.route('/profile/login')
    .post(UserController.login)

  router.route('/profile/googleLogin')
    .post(UserController.GoogleSignin);

  // router.route('/profile/updateProfile')
  //   .put(Auth.verifyToken, UserController.updateProfile);

  // router.route('/profile/forgotPassword')
  //   .post(UserController.forgotPassword);

  // router.route('/profile/resetPassword')
  //   .post(UserController.resetPassword);
}

module.exports = UserRoutes