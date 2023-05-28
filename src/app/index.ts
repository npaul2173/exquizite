import mongoose, { ConnectOptions } from "mongoose";
import express from "express";
import { foodRoute } from "../routes/product";
import { ProductModel } from "../models/products";
import dotenv from "dotenv";
import { topicRoute } from "../routes/topic";
// module.exports = mongoose;

dotenv.config();
const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`Exquizite: Server is running at PORT ${process.env.PORT}`);
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

app.get("/", (_, res) => res.send(`Welcome to Exquizite`));

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
app.use(topicRoute);
