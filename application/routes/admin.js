var express = require("express");
var router = express.Router();
const { database } = require("./db.js");

router.get("/", (req, res) => {
  query = `SELECT * FROM postings`;
  database.query(query, (err, results, fields) => {
    if (!err) {
      //render the query results to the page
      if (req.session.user && req.session.user[0].user_type == "admin") {
        user = req.session.user[0];
        res.render("admin", { results: results, user: user });
      } else {
        res.send('You must be logged in as admin to access this page.');
      }
    } else {
      console.log(err);
    }
  });
});

module.exports = router;