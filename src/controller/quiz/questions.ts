import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QuestionModel } from "../../models/question";
import { QuizModel } from "../../models/quiz";

export const addQuestions = async (request: Request, response: Response) => {
  const questions = request.body.questions;

  try {
    // Checking if any Quiz even exist of this ID, else will throw a error
    const isQuizExisting = await QuizModel.findOne({
      _id: request.body.quizId,
    });
    if (isQuizExisting) {
      const questionsData = request.body.questions.map((item: any) => ({
        ...item,
        quizId: request.body.quizId,
      }));
      const responseData = await QuestionModel.insertMany(questionsData);
      response.send({
        response: responseData,
        message: `${questions.length} questions were added`,
        status: false,
      });
    } else {
      response.status(StatusCodes.CONFLICT).send({
        message: "No Quiz exist of that ID",
        status: false,
      });
    }
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error,
      message: "Error while creating message",
      status: false,
    });
  }
};
