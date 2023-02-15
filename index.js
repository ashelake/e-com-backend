const express = require("express");
const connection = require("./config/db");
const OrderRouter = require("./routes/order.route");
const ProductRouter = require("./routes/product.route");
const UserRouter = require("./routes/user.router");
require("dotenv").config();
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", ProductRouter);
app.use("/order", OrderRouter);
app.use("/users", UserRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
