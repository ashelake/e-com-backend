const Order = require("../modal/order.model");
const User = require("../modal/user.model");

const OrderRouter = require("express").Router();

//creating an order

OrderRouter.post("/", async (req, res) => {
  
  const { userId, cart, country, address } = req.body;
  try {
    const user = await User.findById(userId);
    const order = await Order.create({
      owner: user._id,
      products: cart,
      country,
      address,
    });
    order.count = cart.count;
    order.total = cart.total;
    await order.save();
    user.cart = { total: 0, count: 0 };
    user.orders.push(order);
    
    
    user.markModified("orders");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// getting all orders;
OrderRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("owner", ["email", "name"]);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
module.exports = OrderRouter;
