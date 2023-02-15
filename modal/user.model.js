const mongoose = require("mongoose");


const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "is required"],
    },

    email: {
      type: String,
      required: [true, "is required"],
    },

    password: {
      type: String,
      required: [true, "is required"],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    cart: {
      type: Object,
      default: {
        total: 0,
        count: 0,
      },
    },

    notifications: {
      type: Array,
      default: [],
    },

    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { minimize: false }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
