DROP DATABASE IF EXISTS puzzlebox;
CREATE DATABASE puzzlebox;

\c puzzlebox;

DROP TABLE IF EXISTS users_main, authorized_users, user_child, contacts, contacts_notes, services, services_notes;

CREATE TABLE users_main (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  relationship VARCHAR NOT NULL,
  username VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);

CREATE TABLE user_child (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  admin_id INTEGER REFERENCES users_main(id),
  date_of_birth VARCHAR NOT NULL,
  age INTEGER,
  pic VARCHAR,
  school VARCHAR NOT NULL,
  grade VARCHAR,
  class_size VARCHAR,
  diagnosis VARCHAR,
  likes VARCHAR,
  dislikes VARCHAR
);

CREATE TABLE authorized_users (
  id SERIAL PRIMARY KEY,
  auth_user_firstname VARCHAR NOT NULL,
  auth_user_lastname VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  relationship VARCHAR NOT NULL,
  admin_id INTEGER REFERENCES users_main(id),
  admin_username VARCHAR NOT NULL REFERENCES users_main(username),
  user_child_id INTEGER REFERENCES user_child(id),
  user_child_firstname VARCHAR NOT NULL,
  user_child_lastname VARCHAR NOT NULL
);
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  user_child_id INTEGER REFERENCES user_child(id),
  office VARCHAR,
  fullname VARCHAR,
  office_address VARCHAR,
  phone INTEGER,
  website VARCHAR
);

CREATE TABLE contacts_notes (
  id SERIAL PRIMARY KEY,
  contact_id INTEGER REFERENCES contacts(id),
  notes VARCHAR,
  timestamp VARCHAR NOT NULL 
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  user_child_id INTEGER REFERENCES user_child(id),
  provider_id INTEGER REFERENCES contacts(id),
  provider_fullname VARCHAR,
  frequency VARCHAR
);

CREATE TABLE services_notes (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES services(id),
  notes VARCHAR,
  timestamp VARCHAR NOT NULL
);

INSERT INTO users_main (first_name, last_name, relationship, username, email, password_digest)
  VALUES ('Princess', 'Guerrero', 'mother', 'prinsesa', 'princess@princess.com', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O');

INSERT INTO user_child (first_name, last_name, admin_id, date_of_birth, age, pic, school, grade, class_size, diagnosis, likes, dislikes)
  VALUES ('Philippe', 'Guerrero', 1, 'July 21, 2010', '12', 'photo', 'P4Q@Skillman', '7th', '6-1-1', 'Autism', 'iPad, running', 'loud noises, fireworks');

INSERT INTO authorized_users (auth_user_firstname, auth_user_lastname, email, relationship, admin_id, admin_username, user_child_id , user_child_firstname, user_child_lastname)
  VALUES ('Joselito', 'Guerrero', 'jose@jose.com', 'father', 1, 'prinsesa', 1, 'Philippe', 'Guerrero');