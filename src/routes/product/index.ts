import express from "express";

const route = express();

route.get("/foods", (req, res) => {
  res.send({ foods: [{ id: 2, name: "Biryani" }] });
});

export { route as foodRoute };
