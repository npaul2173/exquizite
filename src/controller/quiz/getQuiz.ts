import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { listSearchParams } from "../../common/types";
import { QuizModel } from "../../models/quiz";

//  List down quizzes
const listQuizzes = async (request: Request, response: Response) => {
  const { searchText, filters } = { ...request.body } as any;
  let query = {};
  if (searchText) query = { title: { $regex: searchText, $options: "i" } };
  if (filters) {
    query = {
      ...query,
      duration: filters.duration,
      topics: { $in: filters.topics },
    };
  }

  // ListData
  const listData = await QuizModel.find(query);
  response.status(StatusCodes.OK).send({ response: listData });
};

export { listQuizzes };
