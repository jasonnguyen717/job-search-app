//connect to production database
const mysql = require("mysql2");
const database = mysql.createConnection({
  host: "localhost",
  user: "team",
  password: "jellybeans",
  database: "648db",
});

database.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
  database.query("USE Example");
});

module.exports = { database };
