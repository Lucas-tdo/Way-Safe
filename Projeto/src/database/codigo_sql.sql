create database waysafe;
use waysafe;

create table usuario(
id int primary key auto_increment,
nome varchar(45),
email varchar(255),
senha varchar(50)
);

INSERT INTO usuario (nome,email,senha) VALUES ('${nome}','${email}','${senha}');



select * from usuario;



drop table usuario;

SELECT * FROM usuario WHERE email='${email}';