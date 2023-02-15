const express = require("express");
const ProductData = require("../modal/product.model");
const User = require("../modal/user.model");
const ProductRouter = express.Router();

ProductRouter.post("/create", async (req, res) => {
  try {
    const { name, description, price, category, images: pictures } = req.body;
    const product = await ProductData.create({
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await ProductData.find();
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

ProductRouter.get("/getdata", async (req, res) => {
  try {
    const products = await ProductData.find({});
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

ProductRouter.get("/getadata/:id", async (req, res) => {
  try {
    const product = await ProductData.findById(req.params.id);
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

ProductRouter.post("/add-to-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (user.cart[productId]) {
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(price);
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

ProductRouter.post('/increase-cart', async(req, res)=> {
  const {userId, productId, price} = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

ProductRouter.post('/decrease-cart', async(req, res)=> {
  const {userId, productId, price} = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
})


ProductRouter.post('/remove-from-cart', async(req, res)=> {
  const {userId, productId, price} = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
module.exports = ProductRouter;
