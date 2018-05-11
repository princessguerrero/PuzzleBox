DROP DATABASE IF EXISTS puzzlebox;
CREATE DATABASE puzzlebox;

\c puzzlebox;

DROP TABLE IF EXISTS users_main, groups, user_child, contacts, contacts_notes, services, services_notes;

CREATE TABLE users_main (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  user_group_id INTEGER REFERENCES groups(id),
  password_digest VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE
  relationship VARCHAR NOT NULL
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  groupname VARCHAR UNIQUE,
)

CREATE TABLE user_child (
  id SERIAL PRIMARY KEY,
  users_main_id INTEGER REFERENCES users_main(id)
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  date_of_birth VARCHAR NOT NULL,
  age INTEGER,
  diagnosis VARCHAR NOT NULL,
  pic VARCHAR
)

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  user_child_id INTEGER REFERENCES user_child(id),
  office VARCHAR,
  fullname VARCHAR,
  office_address VARCHAR,
  phone INTEGER,
  website VARCHAR
)

CREATE TABLE contacts_notes (
  id SERIAL PRIMARY KEY,
  contact_id INTEGER REFERENCES contacts(id)
  note_date VARCHAR,
  notes V
)

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  user_child_id INTEGER REFERENCES user_child(id),
  provider_id INTEGER REFERENCES contacts(id),
  provider_fullname VARCHAR,
  frequency VARCHAR
)

CREATE TABLE services_notes (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES services(id),
  note_date VARCHAR,
  notes VARCHAR
)