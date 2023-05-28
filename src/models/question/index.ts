import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
  quizId: { type: Schema.Types.ObjectId, ref: "Quiz", require: true },
  question: { type: String, require: true },
  options: { type: [String], require: true },
  correctAnswer: { type: String, require: true },
});

const QuestionModel = mongoose.model("Question", schema);

export { QuestionModel };
