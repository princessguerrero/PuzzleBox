const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const init = require("./passport");
const authHelpers = require("./helpers");
const db = require("../db/index");
const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    console.log("Trying to authenticate...");

    db
      .any("SELECT * FROM users_main WHERE username=$1", [username])
      .then(rows => {
        const user = rows[0];
        if (!user) {
          return done(null, false);
        }
        if (!authHelpers.comparePassword(password, user.password_digest)) {
          return done(null, false);
        } else {
          return done(null, { id: user.id, username: user.username });
        }
      })
      .catch(err => {
        console.log("error: " + err);
        return done(err);
      });
  })
);

module.exports = passport;
