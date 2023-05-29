import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QuestionModel } from "../../models/question";

export const addQuestions = async (request: Request, response: Response) => {
  const questions = request.body.questions;

  try {
    if (questions) {
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
    }
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error,
      message: "Error while creating message",
      status: false,
    });
  }
};
