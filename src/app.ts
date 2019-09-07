import express from "express";
import expressGraphql from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
import schema from "./schemas";

const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost:27017/library", {
  useNewUrlParser: true
});

mongoose.connection.once("open", () => {
  console.log("connected to DB");
});

app.use(
  "/graphql",
  expressGraphql({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Listening for request on port 4000");
});
