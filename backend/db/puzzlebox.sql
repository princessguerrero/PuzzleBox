DROP DATABASE IF EXISTS puzzlebox;
CREATE DATABASE puzzlebox;

\c puzzlebox;

DROP TABLE IF EXISTS users_main, users_main_bio, authorized_users, user_child, services, services_notes;

CREATE TABLE users_main (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);

CREATE TABLE users_main_bio (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL REFERENCES users_main(username),
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  relationship VARCHAR NOT NULL,
  pic VARCHAR,
  notes VARCHAR
);

CREATE TABLE user_child (
  id SERIAL PRIMARY KEY,
  admin_username VARCHAR NOT NULL REFERENCES users_main(username),
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
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
  admin_username VARCHAR NOT NULL REFERENCES users_main(username),
  user_child_firstname VARCHAR NOT NULL,
  user_child_lastname VARCHAR NOT NULL
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  user_child_id INTEGER REFERENCES user_child(id),
  organization VARCHAR,
  fullname VARCHAR,
  job_title VARCHAR,
  frequency VARCHAR,
  org_address VARCHAR,
  phone VARCHAR,
  website VARCHAR,
  service_category VARCHAR
);

CREATE TABLE services_notes (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES services(id),
  notes VARCHAR,
  timestamp VARCHAR NOT NULL
);

INSERT INTO users_main (username, email, password_digest)
  VALUES ('prinsesa', 'princess@princess.com', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O');

INSERT INTO users_main_bio (username, first_name, last_name, relationship, pic, notes)
  VALUES ('prinsesa', 'Princess', 'Guerrero', 'mother', 'https://i.imgur.com/RzNb5m6b.jpg', 'check-out his profile');

INSERT INTO user_child (admin_username, first_name, last_name, date_of_birth, age, pic, school, grade, class_size, diagnosis, likes, dislikes)
  VALUES ('prinsesa', 'Philippe', 'Guerrero', 'July 21, 2010', '12', 'https://i.imgur.com/ntJaAMgb.jpg', 'P4Q@Skillman', '7th', '6-1-1', 'Autism', 'iPad, running', 'loud noises, fireworks');

INSERT INTO authorized_users (auth_user_firstname, auth_user_lastname, email, relationship, admin_username, user_child_firstname, user_child_lastname)
  VALUES ('Joselito', 'Guerrero', 'jose@jose.com', 'father', 'prinsesa', 'Philippe', 'Guerrero');

INSERT INTO services (user_child_id, organization, fullname, job_title, frequency, org_address, phone, website, service_category)
  VALUES (1, 'The Thrive Network', 'Chad Alexander', 'Medicaid Service Coordinator', 'by appointment', '241 37th St., Suite 604 Brooklyn, NY 11232', '(718) 965-1998', 'www.thethrivenetwork.org', 'medicaid/insurance'),
         (1, 'Marie Pense Center', 'Mildred Amarteifio', 'SETSS provider', '10 hours per week', '37 West 20th St., Suite 909, New York, NY 10011', '(212) 362-7013', 'mpcny.org', 'in-home');
