var express = require("express");
var router = express.Router();
const { database } = require("./db.js");
const bcrypt = require("bcrypt");

/* GET login page. */
router.get("/", (req, res) => {
  let user = [];
  if (req.session.user[0].length > 0) {
    user = req.session.user[0];
  }
  res.render("signin", { user: user, results: {}, message: "" });
});

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

/* POST login page. */
//api to handle log ins
router.post("/", async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  // password = encoder(password);
  //search the database for the user with these parameters
  //if found, send the user to the home page
  //if not found, send the user to the login page
  database.query(
    "SELECT * FROM users WHERE email = ? ",
    [email],
    async (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (user[0]) {
          let validPassword = await checkPassword(password, user[0].password);
          if (validPassword) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            if (user[0].admin == 1) {
              res.redirect("/user/admin");
            } else {
              res.redirect("index");
            }
          }
          //get the admin data here and send it to the home page
        } else {
          res.render("signin", {
            message: "No user found with those credentials",
          });
        }
      }
    }
  );
});

const checkPassword = async (givenPassword, userPassword) => {
  let validPassword = await bcrypt.compare(givenPassword, userPassword);
  return validPassword;
};

module.exports = router;
