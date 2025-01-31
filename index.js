import express from "express";
import bodyParser from "body-parser";
import { Pool } from "pg";

const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// GET route for root '/' URL
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// Have app start listening on specified port
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
