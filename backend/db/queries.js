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
function mainUserBio(req, res, next) {
  db
    .none(
      "INSERT INTO users_main_bio (first_name, last_name, relationship, pic, current_goals, next_steps, notes) VALUES (DEFAULT, ${first_name}, ${last_name}, ${relationship}, ${pic}, ${current_goals}, ${next_steps}, ${notes})",
      {
        first_name: req.body.username,
        last_name: req.body.last_name,
        relationship: req.body.relationship,
        pic: req.body.pic,
        current_goals: req.body.current_goals,
        next_steps: req.body.next_steps,
        notes: req.body.notes
      }
    )
    .then(() => {
      res.status(200).send("added main user bio into database");
    })
    .catch(err => {
      console.log(`error adding main user bio: `, err);
      // res.status(500).send("error adding user attributes: ", err);
    });
}

// add a user child
function addUserChild(req, res, next) {
  db
    .none(
      "INSERT INTO user_child (first_name, last_name, admin_id, date_of_birth, age, pic, school, grade, class_size, diagnosis, likes, dislikes) VALUES (DEFAULT, ${first_name}, ${last_name}, ${admin_id}, ${date_of_birth}, ${age}, ${pic}, ${school}, ${grade}, ${class_size}, ${diagnosis}, ${likes}, ${dislikes})",
      {
        first_name: req.body.username,
        last_name: req.body.last_name,
        admin_id: req.user.id,
        date_of_birth: req.body.date_of_birth,
        age: req.body.age,
        pic: req.body.pic,
        school: req.body.school,
        grade: req.body.grade,
        class_size: req.body.class_size,
        diagnosis: req.body.diagnosis,
        likes: req.body.likes,
        dislikes: req.body.dislikes
      }
    )
    .then(() => {
      res.status(200).send("added child user bio into database");
    })
    .catch(err => {
      console.log(`error adding child user bio: `, err);
      // res.status(500).send("error adding user attributes: ", err);
    });
}

// add authorized user
function addAuthorizedUser(req, res, next) {
    db
      .none(
        "INSERT INTO authorized_users (first_name, last_name, email, relationship) VALUES (DEFAULT, ${first_name}, ${last_name}, ${email}, ${relationship})",
        {
          first_name: req.body.username,
          last_name: req.body.last_name,
          email: req.body.email,
          relationship: req.body.relationship
        }
      )
      .then(() => {
        res.status(200).send("added authorized user into database");
      })
      .catch(err => {
        console.log(`error adding authorized user: `, err);
        // res.status(500).send("error adding user attributes: ", err);
      });
  }


// get main user
function getMainUser(req, res, next) {
  db
    .one("SELECT username, email FROM users_main WHERE username=${username}", {
      username: req.user.username
    })
    .then(data => {
      res.status(200).json({ user: data });
    });
}

// get all authorized users
function getAuthorizedUsers(req, res, next) {
    db.any("SELECT id, auth_user_firstname, auth_user_lastname, email, relationship FROM authorized_users WHERE admin_id=${admin_id}")
    .then(data => {
      console.log("data:", data);
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all authorized users"
      });
    })
    .catch(err => {
      return next(err);
    });
}

// get a user's child
function getUserChild(req, res, next) {
    db.one("SELECT first_name, last_name FROM user_child WHERE admin_id=${admin_id}", {
        admin_id: req.user.admin_id
    })
    .then(data => {
        res.status(200).json({ user: data });
    });
}


// Log out user
function logoutUser(req, res, next) {
  req.logout();
  res.status(200).json("log out success");
}

// edit functions

module.exports = {
  registerUser,
  mainUserBio,
  addUserChild,
  addAuthorizedUser,
  getMainUser,
  getAuthorizedUsers,
  getUserChild,
  logoutUser
};
