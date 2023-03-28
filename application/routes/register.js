var express = require("express");
var router = express.Router();
const { database } = require("./db.js");
const bcrypt = require("bcrypt");

/* GET register page. */
router.get("/", (req, res) => {
  let user = null;
  if (req.session.user[0].length > 0) {
    user = req.session.user[0];
  }
  res.render("register", { user: user, results: {}, message: "" });
});

/* POST register page. */
//api to handle registration
router.post("/", async (req, res) => {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var phone_number = req.body.phone_number;
  var email = req.body.email;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;
  var terms = req.body.terms;
  var alerts = req.body.alerts;
  var usertype = req.body.usertype;

  console.log(
    fname,
    lname,
    phone_number,
    email,
    password,
    confirm_password,
    terms,
    alerts,
    usertype
  );
  if (password != confirm_password) {
    res.json("Passwords don't match");
    return;
  }
  //password hashing algorithm
  let hashedPassword = await hashPassword(password);
  console.log(hashedPassword);
  // password = encoder(password);
  if (alerts == undefined) {
    alerts = 0;
  } else {
    alerts = 1;
  }

  //code to query mysql backend and insert user data
  database.query(
    "INSERT INTO users (firstname, lastname, email, password, user_type) VALUES (?, ?, ?, ?, ?)",
    [fname, lname, email, hashedPassword, usertype],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        database.query(
          "INSERT INTO user_configs (config_id, alerts, phone_number) VALUES (?, ?, ?)",
          [email, alerts, phone_number],
          (err, result) => {
            if (err) console.log(err);
          }
        );
      }
    }
  );

  res.redirect("/index");
});

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(password, salt);
  console.log(hashPassword);
  return hashPassword;
};

module.exports = router;
