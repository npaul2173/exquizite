import mongoose from "mongoose";

interface Product {
  id: number | null;
  productName: string;
  prodDescription?: string;
}

const schema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  prodDescription: {
    type: String,
  },
});

const ProductModel = mongoose.model("Product", schema);

export { ProductModel, Product };
