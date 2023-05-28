import express from "express";
import { create, getInstance, list } from "../../controller/topic";
const route = express();

route.post("/topic/create", create);
route.post("/topic/list", list);
route.get("/topic", getInstance);

export { route as topicRoute };
