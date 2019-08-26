import express from "express";
import expressGraphql from "express-graphql";
import mongoose from "mongoose";
import schema from "./schemas";

const app = express();

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

app.listen(3000, () => {
  console.log("Listening for request on port 3000");
});
