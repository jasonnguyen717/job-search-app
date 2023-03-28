var express = require('express');
var router = express.Router();
const { database } = require('./db.js')

/* GET profile page. */
router.get(['/:userid'], function(req, res) {
    var user_id = req.params.userid;
    database.query(
        "SELECT users.*, user_configs.*\n" +
        "FROM users\n" +
        "INNER JOIN user_configs ON users.email=user_configs.config_id\n" +
        "WHERE users.uid = ?;",
        [user_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result) {
                    // console.log("/:userid user", result[0]);
                    res.render("profilepage", {user: result[0]});
                } else {
                    res.render("profilepage");
                }
            }
        });
});

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

// api handles update name
router.post('/:uid/update-name', function(req, res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var user_id = req.params.uid;
    // res.send(`profile page post request received: ${fname} ${lname} ${user_id}`);
    database.query(
        "UPDATE users\n" +
        "SET firstname = ?, lastname = ?\n" +
        "WHERE uid = ?;",
        [fname, lname, user_id],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('back');
            }
        }
    );
});

// api handles update bio
router.post('/:uid/update-bio', function(req, res){
    var user_id = req.params.uid;
    var bio = req.body.bio;
    // res.send(`profile page post request received: ${bio}`);
    database.query(
        "UPDATE users\n" +
        "SET description = ?" +
        "WHERE uid = ?;",
        [bio, user_id],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('back');
            }
        }
    );
});

// api handles update skills
router.post('/:uid/update-skills', function(req, res){
    var user_id = req.params.uid;
    var skills = req.body.skills;
    // res.send(`profile page post request received: ${skills}`);
    database.query(
        "UPDATE users, user_configs \n" +
        "SET user_configs.skills = ?\n" +
        "WHERE users.email = user_configs.config_id AND users.uid = ?;",
        [skills, user_id],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('back');
            }
        }
    );

});

// api handles update passions
router.post('/:uid/update-passions', function(req, res){
    var user_id = req.params.uid;
    var passions = req.body.passions;
    // res.send(`profile page post request received: ${passions}`);
    database.query(
        "UPDATE users, user_configs \n" +
        "SET user_configs.passions = ?\n" +
        "WHERE users.email = user_configs.config_id AND users.uid = ?;",
        [passions, user_id],
        (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('back');
            }
        }
    );

});


module.exports = router;