mysql 초기 세팅
create database about_error;

create table members (
	idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    authority VARCHAR(20) NOT NULL,
    signup_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table refreshes (
	refresh VARCHAR(200) NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    FOREIGN KEY (email) REFERENCES members(email)
);

create table quiz_list (
	idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    title_img VARCHAR(200),
    content VARCHAR(50) NOT NULL
);

create table quiz (
	idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    quiz_title VARCHAR(50) NOT NULL,
    question VARCHAR(200) NOT NULL,
    option1 VARCHAR(200) NOT NULL,
    option2 VARCHAR(200) NOT NULL,
    option3 VARCHAR(200) NOT NULL,
    option4 VARCHAR(200) NOT NULL,
    answer INT NOT NULL
);

create table error_post (
	idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    writer VARCHAR(50) NOT NULL,
    post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (writer) REFERENCES members(email)
);