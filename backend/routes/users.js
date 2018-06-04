var db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");

/* GET routes. */
router.get("/", db.getAllMainUsers);
router.get("/getMainUser/", loginRequired, db.getMainUser);
router.get("/getMainUserBio/:username", loginRequired, db.getMainUserBio);
router.get("/getUserChild/:id", loginRequired, db.getUserChild);
router.get("/getAllAuthorizedUsers", loginRequired, db.getAllAuthorizedUsers);
router.get("/getAllChildren", loginRequired, db.getAllChildren);
router.get("/getAllServices/:user_child_id", loginRequired, db.getAllServices);
router.get("/getAllNextSteps/:user_child_id", loginRequired, db.getAllNextSteps);
router.get("/getAllResources/:user_child_id", loginRequired, db.getAllResources);
// POST routes
router.post("/mainUserBio", db.mainUserBio);
router.post("/addChildInfo", loginRequired, db.addUserChild);
router.post("/addAuthUser", loginRequired, db.addAuthorizedUser);
router.post("/addService/:user_child_id", loginRequired, db.addService);
router.post("/addNextSteps/:user_child_id", loginRequired, db.addNextSteps);
router.post("/addResource/:user_child_id", loginRequired, db.addResource);
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
