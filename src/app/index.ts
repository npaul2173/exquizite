import mongoose, { ConnectOptions } from "mongoose";
import express from "express";
import { foodRoute } from "../routes/product";
import { ProductModel } from "../models/products";
import dotenv from "dotenv";
// module.exports = mongoose;

dotenv.config();
const app = express();

app.listen(4000, () => {
  console.log("Exquizite: Server is running...");
});

mongoose
  .connect("mongodb://localhost:27017/database-social-media", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB ✅");
  })
  .catch((error) => {
    console.log("⚔️ Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) =>
  res.send(`Welcome to exquizite ${process.env.SECRET}`)
);

console.log(process.env.SECRET);

app.post("/product/create", async (_, response) => {
  const food = new ProductModel({
    productName: "Scissors",
    prodDescription: "Best scissors ever!",
  });

  try {
    await food.save();
    response.send({ food });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.use(foodRoute);
