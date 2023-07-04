mysql 초기 세팅
create database about_error;

create table members (
	idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    signup_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);