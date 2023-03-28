var express = require("express");
var router = express.Router();
const { database } = require("./db.js");

// api that handles job posting searches, renders index page with search results
router.post("/", (req, res) => {
  var searchTerm = req.body.search;
  var category = req.body.category;

  let query = "SELECT * FROM postings";
  let message = "Showing all job postings";

  if (searchTerm != "" && category != "") {
    // query = `SELECT * FROM postings WHERE areas = '` + category + `' AND ( title LIKE '%` + searchTerm + `%' OR description LIKE '%` +  searchTerm + `%')`;
    query =
      `SELECT * FROM postings WHERE areas = '` +
      category +
      `' AND concat(title, description, skills, passions, company) LIKE '%` +
      searchTerm +
      `%'`;
    message =
      "Showing search results for " +
      searchTerm +
      " job postings in area " +
      category;
  } else if (searchTerm != "" && category == "") {
    query =
      `SELECT * FROM postings WHERE concat(title, description, skills, passions, company) LIKE '%` +
      searchTerm +
      `%'`;
    message = "Showing search results for " + searchTerm;
  } else if (searchTerm == "" && category != "") {
    query = `SELECT * FROM postings WHERE areas = '` + category + `'`;
    message = "Showing search results for job postings in area " + category;
  }
  database.query(query, (err, results, fields) => {
    if (!err) {
      //render the query results to the page
      if (req.session.user) {
        user = req.session.user[0];
        console.log(user);
      } else {
        user = null;
      }
      res.render("index", { results: results, user: user, message: message });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
