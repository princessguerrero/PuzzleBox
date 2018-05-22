const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/puzzlebox");

module.exports = db;