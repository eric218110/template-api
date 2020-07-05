import express from "express";
import { UserModel } from "@models/User";

const app = express();

app.get("/", (request, response) => {
  new UserModel();
  return response.json({ message: "Hello World" });
});

app.listen(1995);
