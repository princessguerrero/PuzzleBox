const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

// add a new user to the database
function registerUser(req, res, next) {
  console.log("req.body", req.body);
  console.log("registerUser");
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
      res.status(200).send("registered user into database");
      // res.next()
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
      "INSERT INTO users_main_bio (username, first_name, last_name, relationship, pic, notes) VALUES (${username}, ${first_name}, ${last_name}, ${relationship}, ${pic}, ${notes})",
      {
        username: req.user.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        relationship: req.body.relationship,
        pic: req.body.pic,
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
      "INSERT INTO user_child (admin_username, first_name, last_name, date_of_birth, age, pic, school, grade, class_size, diagnosis, likes, dislikes) VALUES (${admin_username}, ${first_name}, ${last_name}, ${date_of_birth}, ${age}, ${pic}, ${school}, ${grade}, ${class_size}, ${diagnosis}, ${likes}, ${dislikes})",
      {
        admin_username: req.user.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
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
    });
}

// add a service
function addService(req, res, next) {
  db
    .none(
      "INSERT INTO services (user_child_id, organization, fullname, job_title, frequency, org_address, phone, website, service_category) VALUES (${user_child_id}, ${organization}, ${fullname}, ${job_title}, ${frequency}, ${org_address}, ${phone}, ${website}, ${service_category})",
      {
        user_child_id: req.params.user_child_id,
        organization: req.body.organization,
        fullname: req.body.fullname,
        job_title: req.body.job_title,
        frequency: req.body.frequency,
        org_address: req.body.org_address,
        phone: req.body.phone,
        website: req.body.website,
        service_category: req.body.service_category
      }
    )
    .then(() => {
      res.status(200).send("added a service into database");
    })
    .catch(err => {
      console.log(`error adding service: `, err);
    });
}

// add a next step
function addNextSteps(req, res, next) {
  db
    .none(
      "INSERT INTO next_steps (user_child_id, child_next_steps) VALUES (${user_child_id}, ${child_next_steps})",
      {
        user_child_id: req.params.user_child_id,
        child_next_steps: req.body.child_next_steps,
      }
    )
    .then(() => {
      res.status(200).send("added a next step into database");
    })
    .catch(err => {
      console.log(`error adding service: `, err);
    });
}

// add authorized user
function addAuthorizedUser(req, res, next) {
  db
    .none(
      "INSERT INTO authorized_users (auth_user_firstname, auth_user_lastname, email, relationship, admin_username, user_child_firstname, user_child_lastname ) VALUES (${auth_user_firstname}, ${auth_user_lastname}, ${email}, ${relationship}, ${admin_username}, ${user_child_firstname}, ${user_child_lastname})",
      {
        auth_user_firstname: req.body.auth_user_firstname,
        auth_user_lastname: req.body.auth_user_lastname,
        email: req.body.email,
        relationship: req.body.relationship,
        admin_username: req.body.admin_username,
        user_child_firstname: req.body.user_child_firstname,
        user_child_lastname: req.body.user_child_lastname
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

// get main user bio
function getMainUserBio(req, res, next) {
  db
    .one("SELECT first_name, last_name, relationship, pic, notes FROM users_main_bio WHERE username=${username}", {
      username: req.params.username
    })
    .then(data => {
      res.status(200).json({ user: data });
    });
}

// get all main users
function getAllMainUsers(req, res, next) {
  db
    .any("SELECT id, username, email FROM users_main")
    .then(data => {
      console.log("data:", data);
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all main users"
      });
    })
    .catch(err => {
      return next(err);
    });
}

// get all services
function getAllServices(req, res, next) {
  db
    .any("SELECT * FROM services WHERE user_child_id=${user_child_id}", {
      user_child_id: req.params.user_child_id
    })
    .then(data => {
      console.log("data:", data);
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all services"
      });
    })
    .catch(err => {
      return next(err);
    });
}

// get all next steps
function getAllNextSteps(req, res, next) {
  db
    .any("SELECT * FROM next_steps WHERE user_child_id=${user_child_id}", {
      user_child_id: req.params.user_child_id
    })
    .then(data => {
      console.log("data:", data);
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all next steps"
      });
    })
    .catch(err => {
      return next(err);
    });
}

// get all authorized users
function getAllAuthorizedUsers(req, res, next) {
  db
    .any(
      "SELECT id, auth_user_firstname, auth_user_lastname, email, relationship FROM authorized_users WHERE admin_username=${admin_username}"
    )
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

// get a users' child
// function getUserChild(req, res, next) {
//   db
//     .one(
//       "SELECT first_name, last_name FROM user_child WHERE admin_username=${admin_username}",
//       {
//         admin_username: req.user.username
//       }
//     )
//     .then(data => {
//       res.status(200).json({ user: data });
//     });
// }

function getUserChild(req, res, next) {
  db
    .one("SELECT * FROM user_child WHERE id=${id}", {
      id: req.params.id
    })
    .then(data => {
      res.status(200).json(data);
    });
}

// get all users' children
function getAllChildren(req, res, next) {
  db
    .any(
      "SELECT id, first_name, last_name, pic FROM user_child WHERE admin_username=${admin_username}",
      {
        admin_username: req.user.username
      }
    )
    .then(data => {
      console.log("data:", data);
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved all users children"
      });
    })
    .catch(err => {
      return next(err);
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
  addService,
  addNextSteps,
  addAuthorizedUser,
  getMainUser,
  getMainUserBio,
  getAllMainUsers,
  getAllServices,
  getAllNextSteps,
  getAllAuthorizedUsers,
  getUserChild,
  getAllChildren,
  logoutUser
};
