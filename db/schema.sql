-- Write your Schema Here -- 
DROP DATABASE IF EXISTS Company_db;
CREATE DATABASE Company_db;

USE Company_db;

-- -------------------------------Department--------------------------------------
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
    );

    -- --------------------------------Role------------------------------------------


Create TABLE Role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary  DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL
);

-- ----------------------------------employee-------------------------------------------

    
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);


