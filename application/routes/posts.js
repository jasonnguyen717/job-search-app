var express = require("express");
var router = express.Router();
const { database } = require("./db.js");

// api handles job posting filter by tech area, renders results to index page
router.get("/area/:area", (req, res) => {
  var area = req.params.area;
  // console.log('AREA', area);
  let query = `SELECT * FROM postings WHERE areas = '` + area + `'`;
  // let query = `-- SELECT * FROM postings WHERE areas LIKE '%` + "Artificial" + `%'`;
  // console.log(query);
  database.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("", {
        results: results,
        message: `Showing search results for ${area}`,
      });
    }
  });
});

// api handles job posting filter by job position or title, renders results to index page
router.get("/position/:position", (req, res) => {
  var position = req.params.position;
  let query = `SELECT * FROM postings WHERE title LIKE '%` + position + `%'`;
  // let query = `-- SELECT * FROM postings WHERE areas LIKE '%` + "Artificial" + `%'`;
  database.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("", {
        results: results,
        message: `Showing search results for ${position}`,
      });
    }
  });
});

// api handles job posting filter by skills, renders results to index page
router.get("/skills/:skills", (req, res) => {
  var skills = req.params.skills;
  let query = `SELECT * FROM postings WHERE skills LIKE '%` + skills + `%'`;
  database.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("", {
        results: results,
        message: `Showing search results for ${skills}`,
      });
    }
  });
});

// api handles job posting filter by passions, renders results to index page
router.get("/passions/:passions", (req, res) => {
  var passions = req.params.passions;
  let query = `SELECT * FROM postings WHERE passions LIKE '%` + passions + `%'`;
  database.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.render("", {
        results: results,
        message: `Showing search results for ${passions}`,
      });
    }
  });
});

//admin page api to delete a job posting
router.post("/del_post", (req, res) => {
  var pid = req.body.pid;
  console.log(pid);
  let query = `DELETE FROM postings WHERE pid = '` + pid + `'`;
  database.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/user/admin");
    }
  });
});

// api that handles viewing post page by post id
router.post(["/*/postpage", "/postpage"], (req, res) => {
  var pid = req.body.pid;
  let query = `SELECT * FROM postings WHERE pid = '` + pid + `'`;
  // let query = "SELECT * FROM postings WHERE pid = 2;";
  database.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("query", results);
      res.render("postpage", { post: results[0] });
      // res.json(results);
    }
  });
});

module.exports = router;
