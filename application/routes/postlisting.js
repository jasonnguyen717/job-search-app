var express = require("express");
var router = express.Router();
const { database } = require("./db.js");

//api that handles job postings
router.post("/", (req, res) => {
  var first = req.body.first;
  var last = req.body.last;
  var title = req.body.title;
  var description = req.body.description;
  var salary = req.body.salary;
  var location = req.body.location;
  var company = req.body.company;
  var email = req.body.email;
  var phone_number = req.body.phone_number;
  var areas = req.body.areas;
  var skills = req.body.skills;
  var passion = req.body.passion;
  var parttime = req.body.parttime;
  var fulltime = req.body.fulltime;
  var internship = req.body.internship;
  var remote = req.body.remote;
  var availability = [
    parttime ? parttime : "",
    fulltime ? fulltime : "",
    internship ? internship : "",
    remote ? remote : "",
  ].join(" ");
  console.log(
    first,
    last,
    title,
    description,
    salary,
    location,
    company,
    email,
    phone_number,
    areas,
    skills,
    availability,
    passion
  );
  let photo_path = "";
  switch (areas) {
    case "Artificial Intelligence and Machine Learning":
      photo_path = "/img/thumb-ai.svg";
      break;
    case "Robotic Process Automation (RPA)":
      photo_path = "/img/thumb-robotics.svg";
      break;
    case "Edge Computing":
      photo_path = "/img/thumb-computing.svg";
      break;
    case "Quantum Computing":
      photo_path = "/img/thumb-quantum.svg";
      break;
    case "Virtual Reality and Augmented Reality":
      photo_path = "/img/thumb-vr.svg";
      break;
    case "Blockchain":
      photo_path = "/img/thumb-blockchain.svg";
      break;
    case "Internet of Things (IoT)":
      photo_path = "/img/thumb-iot.svg";
      break;
    case "5G":
      photo_path = "/img/thumb-5g.svg";
      break;
    case "Cyber Security":
      photo_path = "/img/thumb-cybersecurity.svg";
      break;
    default:
    // code block
  }
  database.query(
    "INSERT INTO postings (title, description, salary, location, company, email, phone_number, areas, skills, passions, availability, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      description,
      salary,
      location,
      company,
      email,
      phone_number,
      areas,
      skills,
      passion,
      availability,
      photo_path,
    ],
    (err, result) => {
      console.log(err);
    }
  );
  res.redirect("/");
});

module.exports = router;