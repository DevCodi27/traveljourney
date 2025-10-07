create database authentication;
use authentication;

create table user
(
	id int auto_increment primary key,
    username varchar(50) not null unique,
    password varchar(255) not null,
    role ENUM('admin','user') default 'user',
    created_at timestamp default current_timestamp
);


create table entries
(
	id int auto_increment primary key,
    image_src varchar(255),
    image_alt  varchar(255),
    country varchar(255),
    location varchar(255),
    place varchar(255),
    date varchar(100),
    details text
);