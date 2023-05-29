import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  topics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
});

const QuizModel = mongoose.model("Quiz", schema);

export { QuizModel };
