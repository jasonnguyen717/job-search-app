const express = require("express");
const path = require("path");
const app = express({ strict: true });
const session = require("express-session");
//session middleware
app.use(
  session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

//Static files

app.use("/css", express.static(__dirname + "/public/css"));
app.use("/img", express.static(__dirname + "/public/img"));

app.set("view engine", "ejs");

app.get(["/", "/index"], (req, res) => {
  results = {};
  if (req.session.isLoggedIn) {
    console.log("User is logged in");
    user = req.session.user[0];
  } else {
    user = null;
    console.log("User is not logged in");
  }
  res.render("index", { results: results, user: user, message: "" });
});

app.get("/test", (req, res) => {
  res.render("maptest");
});

app.get("/test/map", (req, res) => {
  let locations = [
    ["San Francisco, CA, USA", 37.7749295, -122.4194155],
    ["San Jose, CA, USA", 37.3382082, -121.8863286],
    ["Fremont, CA, USA", 37.5485396, -121.988583],
    ["Fresno, CA, USA", 36.7377981, -119.7871247],
    ["Los Angeles, CA, USA", 34.0522342, -118.2436849],
    ["Bakersfield, CA, USA", 35.3732921, -119.0187125],
  ];
  res.render("mapindex", { locations: locations });
});

app.get("/:pagename", (req, res) => {
  let pagename = req.params.pagename;
  if (pagename == "logout") {
    req.session.destroy(() => {
      console.log("User logged out");
    });
    res.redirect("/index");
  } else {
    results = {};
    res.render(req.params.pagename, {
      results: results,
      message: "",
      user: {},
    });
  }
});

app.listen(5000, () => {
  console.log("App listening on port 5000!");
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

var registerRouter = require("./routes/register");
app.use("/register", registerRouter);

var signinRouter = require("./routes/signin");
app.use("/signin", signinRouter);

var post_Router = require("./routes/posts");
app.use("/posts", post_Router);

var profilepage_Router = require("./routes/profilepage");
app.use("/profilepage", profilepage_Router);

var search_Router = require("./routes/search");
app.use("/search", search_Router);

var postlisting_Router = require("./routes/postlisting");
app.use("/post", postlisting_Router);

var admin_Router = require("./routes/admin");
app.use("/user/admin", admin_Router);

// module.exports = app;

//check if user is logged in reutrns true or false
//TODO: fix this
const isLoggedIn = (req, res) => {
  if (req.session.isLoggedIn) {
    console.log("User is logged in");
    return true;
  } else {
    console.log("User is not logged in");
    return false;
  }
};

//logout route
//TODO: fix this
const logOut = (req, res) => {
  req.session.destroy(() => {
    console.log("User logged out");
  });
  res.redirect("/index");
};
