import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

// GET endpoint function to get all the users from database
export const getUsers = (request, response, next) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      next(error);
    }
    response.status(200).json(results.rows);
  });
};

// GET endpoint function to get a single user by user ID
export const getUserById = (request, response, next) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      next(error);
    }
    response.status(200).json(results.rows);
  });
};

// POST endpoint function to update table with a get user
export const createUser = (request, response, next) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, results) => {
      if (error) {
        next(error);
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

// POST endpoint function to update data for an existing user
export const updateUser = (request, response, next) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        next(error);
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// DELETE endpoint function to delete a specific user from the database
export const deleteUser = (request, response, next) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      next(error);
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};
