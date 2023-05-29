import express from "express";
import { addQuestions, createQuiz, listQuizzes } from "../../controller/quiz";

const route = express();

route.post("/quiz/create", createQuiz);
route.post("/quiz/list", listQuizzes);
route.post("/quiz/addQuestions", addQuestions);
export { route as quizRoute };
