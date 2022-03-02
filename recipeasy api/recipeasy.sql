
/* recipeasy.sql
A basic SQL script to create all correct databases and tables corresponding to the 
SENG401 W2022 term project for Recipeasy

Created February 25, 2022 by Jett Penner

Current Version: 1.1
Version Date: February 28, 2022
Version Author: Jett Penner

*/

-- Create the person database -- 
CREATE DATABASE IF NOT EXISTS RECIPEASY_PERSON;
USE RECIPEASY_PERSON;

CREATE TABLE IF NOT EXISTS Person (
	p_id int NOT NULL AUTO_INCREMENT,
    isVisible bool NOT NULL DEFAULT 1,
	email varchar(255) UNIQUE NOT NULL,
	password varchar(255) UNIQUE NOT NULL,
    fname varchar(255),
    lname varchar(255),
    isAdmin bool NOT NULL DEFAULT 0,
    PRIMARY KEY(p_id)
);

-- Create the database that connects the two --
CREATE DATABASE IF NOT EXISTS RECIPEASY_MID;
USE RECIPEASY_MID;

CREATE TABLE IF NOT EXISTS Posts (
	p_id int NOT NULL,
    r_id int NOT NULL,
    PRIMARY KEY (p_id, r_id)
);

CREATE TABLE IF NOT EXISTS Saves (
	p_id int NOT NULL,
    r_id int NOT NULL UNIQUE,
    PRIMARY KEY (p_id, r_id)
);

-- Create the recipe read database --
CREATE DATABASE IF NOT EXISTS RECIPEASY_RECIPE_READ;
USE RECIPEASY_RECIPE_READ;

CREATE TABLE IF NOT EXISTS Recipe (
	r_id int NOT NULL AUTO_INCREMENT,
    description varchar(1000),
    name varchar(255),
    likes int NOT NULL DEFAULT 0,
    isVisible bool NOT NULL DEFAULT 1,
    date_posted char(10),
    PRIMARY KEY (r_id)
 );
 
 CREATE TABLE IF NOT EXISTS Recipe_Categories (
	r_id int NOT NULL,
	category varchar(255),
    FOREIGN KEY (r_id) REFERENCES Recipe(r_id)
 );
 
 CREATE TABLE IF NOT EXISTS Recipe_Ingredients (
	r_id int NOT NULL,
	ingredient varchar(255),
    FOREIGN KEY (r_id) REFERENCES Recipe(r_id)
 );
 
 -- Create the recipe write database --
CREATE DATABASE IF NOT EXISTS RECIPEASY_RECIPE_WRITE;
USE RECIPEASY_RECIPE_WRITE;

CREATE TABLE IF NOT EXISTS Recipe (
	local_id int NOT NULL AUTO_INCREMENT,
	r_id int NOT NULL,
    description varchar(1000),
    name varchar(255),
    likes int NOT NULL DEFAULT 0,
    isVisible bool NOT NULL DEFAULT 1,
    date_posted char(10),
    PRIMARY KEY (local_id)
 );
 
 CREATE TABLE IF NOT EXISTS Recipe_Categories (
	r_id int NOT NULL,
	category varchar(255)
 );
 
 CREATE TABLE IF NOT EXISTS Recipe_Ingredients (
	r_id int NOT NULL,
	ingredient varchar(255)
 );
 
 CREATE TABLE IF NOT EXISTS Max_R_Id (
	max_r_id int NOT NULL DEFAULT 0
 );
 
-- If this is your first time running the script, run the following as well:
INSERT INTO Max_R_Id VALUES (1);
SET SQL_SAFE_UPDATES = 0;
