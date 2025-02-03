import express from "express";
import bodyParser from "body-parser";
import * as db from "./queries.js";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware that parses incoming JSON data
app.use(bodyParser.json());

// Middleware that enables CORS, allowing requests from different domains.
app.use(cors());

// Middleware that parses URL-encoded data, such as handling POST requests from HTML forms.
// eg. name=John&email=john@example.com it becomes
// {
//  "name":"John"
//  "email":"john@example.com"
// }
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Middleware stack that will pass errors to error-handling middleware
app.use((req, res, next) => {
  const error = new Error("Something went wrong");
  next(error);
});

// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).send("Internal Server Error");
});

// GET route for root '/' URL
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// GET route for '/users' path to retrieve all users from db
app.get("/users", db.getUsers);

// GET route for '/users/:id' path to retrieve single user based on id
app.get("/users/:id", db.getUserById);

// POST route for '/users' path to create a new user in the database
app.post("/users", db.createUser);

// PUT/UPDATE route for '/users/:id' path to update a user based on id
app.put("/users/:id", db.updateUser);

// DELETE route for '/users/:id' path to delete a user based on id
app.delete("/users/:id", db.deleteUser);

// Have app start listening on specified port
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
