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
    description VARCHAR(200) NOT NULL,
    answer_ko VARCHAR(50) NOT NULL,
    answer_en VARCHAR(50) NOT NULL,
    answer_abbr VARCHAR(50)
);