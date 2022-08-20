const { model, Schema } = require("mongoose");

let order = {
  user: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User"
  },

  orderItems: [{
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product"
    }
  }],

  OrderStatus: {
    type: String,
  },

  ShippingDetails: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    shippingFee: { type: String, required: true }
  },

  paymentMethod: {
    type: String,
    required: true,
    default: "PayStack"
  },

  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String }
  },
  
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },

  isPaid: {
    status: { type: Boolean },
    date: { type: Date }
  },

  isDelivered: {
    status: { type: Boolean },
    date: { type: Date }
  },
};

const OrderModel = new Schema(
  {
    ...order,
  },
  { timestamps: true }
);

module.exports.order = Object.keys(order);
module.exports.Order = model("Order", OrderModel);
