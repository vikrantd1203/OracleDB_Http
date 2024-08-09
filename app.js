const oracleConnection = require("./database");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// Endpoint to run queries from request body
app.post("/query", async (req, res) => {
  const query = req.body.query;
  try {
    const connect = await oracleConnection();
    try {
      const result = await connect.execute(query);
      console.log(result.rows);
      res.send(JSON.stringify(result.rows));
    } catch (err) {
      console.error('Query execution error:', err);
      res.status(500).send("Error executing query");
    } finally {
      await connect.close(); // Ensure the connection is closed
    }
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send("Database connection error");
  }
});

app.get("/students", async (req, res) => {
  const query = "YOUR QUERY";
  try {
    const connect = await oracleConnection();
    try {
      const result = await connect.execute(query);
      console.log("Query Result:", result.rows); // Log the result for debugging
      res.json(result.rows); // Send JSON response
    } catch (err) {
      console.error('Query execution error:', err);
      res.status(500).send("Error executing query");
    } finally {
      await connect.close(); // Ensure the connection is closed
    }
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send("Database connection error");
  }
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
