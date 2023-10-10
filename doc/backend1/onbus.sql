create database onbus_data;

use onbus_data;


create table usuario(
id_usuario  INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome        VARCHAR(100),
saldo       DECIMAL(2),
cpf         VARCHAR(14),
tipo        VARCHAR(20)     NOT NULL DEFAULT 'comum',
observacoes VARCHAR(535)
);

create table cliente(
id_cliente              INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome                    VARCHAR(100),
token                   VARCHAR(45),
email                   VARCHAR(200),
senha                   VARCHAR(45),
usuario_cadastrado_id   INT,

CONSTRAINT FK_USUARIO_CADASTRADO FOREIGN KEY (usuario_cadastrado_id) REFERENCES usuario(id_usuario)
);

create table cartao(
id_cartao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
saldo DECIMAL(2),
tipo VARCHAR(20)
);

create table usuario(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
telefone VARCHAR(14),
email VARCHAR(200),
cpf VARCHAR(14),
observacoes VARCHAR(535),
cartao_id INT NOT NULL,

CONSTRAINT FK_CARTAO FOREIGN KEY (cartão_id) REFERENCES cartao(id_cartao)
);

create table linha(
id_linha INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(200),
inicio DATETIME,
termino DATETIME,
rota VARCHAR(535)
);

create table motorista(
id_motorista INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome         VARCHAR(200),
cpf          VARCHAR(14),
telefone     VARCHAR(14),
email        VARCHAR(200),
foto         VARCHAR (200),
observacoes  VARCHAR(535)
);

create table onibus(
id_onibus INT           NOT NULL AUTO_INCREMENT PRIMARY KEY,
placa     VARCHAR (7)
);

create table viagem(
id_viagem       INT     NOT NULL AUTO_INCREMENT PRIMARY KEY,
inicio          DATETIME,
duracao         DATETIME,
linha_id        INT     NOT NULL,
motorista_id    INT     NOT NULL,
onibus_id       INT     NOT NULL,


CONSTRAINT FK_LINHA FOREIGN KEY (linha_id) REFERENCES linha(id_linha),
CONSTRAINT FK_MOTORISTA FOREIGN KEY (motorista_id) REFERENCES motorista(id_motorista),
CONSTRAINT FK_ONIBUS FOREIGN KEY (onibus_id) REFERENCES onibus(id_onibus)

);

create table viagem_has_usuario (
tarifa      DECIMAL(10,2),
data        DATE            NOT NULL,
viagem_id   INT             NOT NULL,
usuario_id  INT             NOT NULL,
CONSTRAINT FK_VIAGEM FOREIGN KEY (viagem_id) REFERENCES viagem(id_viagem),
CONSTRAINT FK_USUARIO FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario)
);
