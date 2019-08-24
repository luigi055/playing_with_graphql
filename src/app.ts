import express from "express";
import expressGraphql from "express-graphql";
import schema from "./schemas";

const app = express();

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
