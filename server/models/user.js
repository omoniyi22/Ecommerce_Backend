const { model, Schema } = require("mongoose");
let profile = {
  full_name: String,
  email: String,
  password: String,
  phone: Number,
  gender: String,
  birthday: String,
  address: String,
  add_info: String,
  region: String,
  city: String,
  isAdmin: {
    type: Boolean,
    require: true,
    default: false
  },
  sales: {
    ref: "sales",
    type: Schema.Types.ObjectId,
  },
  orders: {
    ref: "order",
    type: Schema.Types.ObjectId,
  },
  carts: {},
};

const ProfileModel = new Schema(
  {
    ...profile,
  },
  { timestamps: true }
);
module.exports.profile = Object.keys(profile);
module.exports.Profile = model("Profile", ProfileModel);
