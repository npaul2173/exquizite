import { Request, Response } from "express";
import { TopicModel } from "../../models/topic";
import { StatusCodes } from "http-status-codes";

export const create = async (request: Request, response: Response) => {
  console.log(request.body.name);
  const topic = new TopicModel({ topicName: request.body.name });

  try {
    const responseData = await topic.save();
    response.status(StatusCodes.CREATED).send({ response: responseData });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error });
  }
};

export const list = async (request: Request, response: Response) => {
  console.log(request.body.search);
  const search = request.body.search;
  try {
    const responseData = await TopicModel.find({
      topicName: { $regex: search, $options: "i" },
    });

    response.status(StatusCodes.OK).send({ response: responseData });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

export const getInstance = async (request: Request, response: Response) => {
  const queryId = request.query.id;

  try {
    const responseData = await TopicModel.findOne({ _id: queryId });
    response.status(StatusCodes.OK).send({ response: responseData });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};
