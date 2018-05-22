const passport = require("passport");
const db = require("../db/index");

module.exports = () => {
  passport.serializeUser((user, done) => {
      console.log("serializing user", user)
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    db
      .one("SELECT id, username FROM users_main WHERE username=$1", [username])
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err, null);
      });
  });
};
