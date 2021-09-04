CREATE DATABASE manager;
USE manager;


CREATE TABLE User(
id int auto_increment not null primary key,
email varchar(50) not null,
password char(60) not null,
created_at timestamp not null default current_timestamp,
updated_at timestamp not null default current_timestamp on update current_timestamp
) ENGINE=InnoDB CHARACTER SET=utf8;


CREATE TABLE Operation(
id int auto_increment not null primary key,
user_id int not null,
`type` boolean not null,
amount int not null,
concept varchar(250) not null,
category varchar(20) not null,
`date` date not null,
created_at timestamp not null default current_timestamp,
updated_at timestamp not null default current_timestamp on update current_timestamp,
INDEX(user_id),
FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB CHARACTER SET=utf8;
