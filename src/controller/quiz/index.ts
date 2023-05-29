import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QuizModel } from "../../models/quiz";
import { QuestionModel } from "../../models/question";
import { listSearchParams } from "../../common/types";

export const createQuiz = async (request: Request, response: Response) => {
  const quizInputData = request.body.quiz;
  const questionsInputData = request.body.questions;

  try {
    const existingQuiz = await QuizModel.findOne({
      title: quizInputData.title,
    });
    if (existingQuiz) {
      response.status(StatusCodes.CONFLICT).send({
        message: "Quiz already exists with the same name",
        status: false,
        response: existingQuiz,
      });
    } else {
      const quiz = new QuizModel({ ...quizInputData });
      const quizData = await quiz.save();
      let savedQuestions = undefined;
      if (questionsInputData) {
        const questionsData = request.body.questions.map((item: any) => ({
          ...item,
          quizId: quizData._id,
        }));
        savedQuestions = await QuestionModel.insertMany(questionsData);
      }
      response.status(StatusCodes.CREATED).send({
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

//  List down quizzes
export const listQuizzes = async (request: Request, response: Response) => {
  const { searchText } = { ...request.body } as listSearchParams;

  const listData = await QuizModel.find();

  response.status(StatusCodes.OK).send({ response: listData });
};
