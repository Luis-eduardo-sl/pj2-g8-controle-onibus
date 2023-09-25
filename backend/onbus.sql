CREATE DATABASE onbus;
USE onbus;

CREATE TABLE usuarios (
id          INT AUTO_INCREMENT  PRIMARY KEY,
nome        VARCHAR(255)        NOT NULL,
telefone    VARCHAR (14),
nascimento  DATE,
cpf         VARCHAR(14)         NOT NULL UNIQUE,
email       VARCHAR(255)        UNIQUE,
senha       VARCHAR(255),
tipo        VARCHAR(20)         NOT NULL,
observaçoes VARCHAR (535)
);

CREATE TABLE motoristas (
id          INT AUTO_INCREMENT  PRIMARY KEY,
nome        VARCHAR(255)        NOT NULL,
cpf         VARCHAR(14)         NOT NULL UNIQUE,
telefone    VARCHAR(14)         NOT NULL,
email       VARCHAR (255)       NOT NULL UNIQUE,
foto        VARCHAR(250)        NOT NULL,
observaçoes VARCHAR (535)
);

CREATE TABLE linhas(
nome        VARCHAR(255)    NOT NULL,
inicio      TIME            NOT NULL,
intervalo   TIME            NOT NULL,
termino     TIME            NOT NULL,
rota        TEXT (1500)
);

create table usuarioscartao(
cpf 	    VARCHAR(14),
tipo  	    VARCHAR(20)    NOT NULL,
saldo 	    BIGINT,
constraint  fk_usuarios    foreign key(cpf)  references usuarios(cpf),
constraint  fk_usuarios    foreign key(tipo) references usuarios(tipo)
);