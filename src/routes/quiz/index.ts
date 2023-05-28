import express from "express";
import { createQuiz, listQuizzes } from "../../controller/quiz";

const route = express();

route.post("/quiz/create", createQuiz);
route.post("/quiz/list", listQuizzes);
export { route as quizRoute };
