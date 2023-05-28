import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
});

const QuizModel = mongoose.model("Quiz", schema);

export { QuizModel };
