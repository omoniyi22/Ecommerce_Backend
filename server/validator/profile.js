const joi = require("@hapi/joi")
module.exports.registerValidator = joi.object().keys({
  first_name: joi.string().min(1).required(),
  last_name: joi.string().min(1).required(),
  email: joi.string().required().email(),
  password: joi.string().min(6).required(),
  phone: joi.number().min(11).required(),
})


module.exports.loginValidator = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().min(6).required()
})

module.exports.profileValidator = joi.object().keys({
  first_name: joi.string().min(1),
  last_name: joi.string().min(1),
  email: joi.string().email(),
  password: joi.string().min(6),
  phone: joi.number().min(11),
  address: joi.string().min(8),
  add_info: joi.string(),
  region: joi.string(),
  city: joi.string(),
})