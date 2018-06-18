const pgp = require("pg-promise")({});
// const db = pgp("postgres://localhost/puzzlebox");
const db = pgp(process.env.DATABASE_URL);
module.exports = db;