const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/puzzlebox");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

// add a new user to the database
function registerUser(req, res, next) {
  const hash = authHelpers.createHash(req.body.password);
  db
    .none(
      "INSERT INTO users_main (username, email, password_digest) VALUES (${username}, ${email}, ${password})",
      {
        username: req.body.username,
        email: req.body.email,
        password: hash
      }
    )
    .then(() => {
      return next();
    })
    .catch(err => {
      // ***** ADD if/else statements for different errors *****
      res.status(500).send("Error registering new user!");
    });
}

// add main user bio
// register a user child

// get user
function getUser(req, res, next) {
  db
    .one("SELECT username, email FROM users WHERE username=${username}", {
      username: req.user.username
    })
    .then(data => {
      res.status(200).json({ user: data });
    });
}

// get a user child

// Log out user
function logoutUser(req, res, next) {
  req.logout();
  res.status(200).json("log out success");
}

// edit functions

module.exports = {
    registerUser,
    getUser,
    logoutUser
}