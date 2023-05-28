import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QuizModel } from "../../models/quiz";
import { QuestionModel } from "../../models/question";
import { listSearchParams } from "../../common/types";

export const createQuiz = async (request: Request, response: Response) => {
  const inputData = { ...request.body };
  console.log("inputData", inputData);

  try {
    const existingQuiz = await QuizModel.findOne({ title: request.body.title });
    if (existingQuiz) {
      response.status(StatusCodes.CONFLICT).send({
        message: "Quiz already exists with the same name",
        status: false,
        response: existingQuiz,
      });
    } else {
      const quiz = new QuizModel({ ...inputData });
      const quizData = await quiz.save();

      const questionsData = request.body.questions.map((item: any) => ({
        ...item,
        quizId: quizData._id,
      }));

      const savedQuestions = await QuestionModel.insertMany(questionsData);

      response.status(StatusCodes.ACCEPTED).send({
        response: {
          quiz: quizData,
          questions: savedQuestions,
        },
        status: true,
      });
    }
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

export const listQuizzes = async (request: Request, response: Response) => {
  const { searchText } = { ...request.body } as listSearchParams;

  const listData = await QuizModel.find();

  response.status(StatusCodes.OK).send({ response: listData });
};
