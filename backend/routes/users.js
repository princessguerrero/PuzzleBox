var db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");

/* GET routes. */
router.get("/", db.getMainUser);
router.get("/getUserChild", db.getUserChild);
router.get("/getAuthorizedUsers", db.getAuthorizedUsers);

// POST routes
router.post("/addChildInfo", db.addUserChild);
router.post("/addAuthUser", db.addAuthorizedUser);

// User authentication routes
router.post(
  "/register",
  db.registerUser,
  passport.authenticate("local"),
  (req, res) => {
    delete req.user.password_digest;
    res.json({
      id: req.user.id,
      username: req.user.username
    });
  }
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  delete req.user.password_digest;
  res.json({
    id: req.user.id,
    username: req.user.username
  });
});
router.get("/logout", loginRequired, db.logoutUser);
module.exports = router;
