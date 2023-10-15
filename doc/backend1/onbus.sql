SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Criação do esquema
CREATE SCHEMA IF NOT EXISTS `onbus_data` DEFAULT CHARACTER SET utf8mb4;

USE `onbus_data`;

-- Criação da tabela 'usuario'
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `telefone` VARCHAR(14) NULL DEFAULT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `cpf` VARCHAR(14) NULL DEFAULT NULL,
  `senha` VARCHAR(100) NULL DEFAULT NULL,
  `observacoes` VARCHAR(535) NULL DEFAULT NULL,
  `saldo` DECIMAL(10,2) NULL DEFAULT NULL,
  `tipo` VARCHAR(20) NOT NULL DEFAULT 'comum',
  PRIMARY KEY (`id_usuario`)
) ENGINE = InnoDB;

-- Criação da tabela 'cliente'
CREATE TABLE IF NOT EXISTS `cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `token` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `senha` VARCHAR(45) NULL DEFAULT NULL,
  `usuario_cadastrado_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  INDEX `FK_USUARIO_CADASTRADO` (`usuario_cadastrado_id` ASC),
  CONSTRAINT `FK_USUARIO_CADASTRADO`
    FOREIGN KEY (`usuario_cadastrado_id`)
    REFERENCES `usuario` (`id_usuario`)
) ENGINE = InnoDB;

-- Criação da tabela 'linha'
CREATE TABLE IF NOT EXISTS `linha` (
  `id_linha` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NULL DEFAULT NULL,
  `inicio` DATETIME NULL DEFAULT NULL,
  `termino` DATETIME NULL DEFAULT NULL,
  `rota` VARCHAR(535) NULL DEFAULT NULL,
  PRIMARY KEY (`id_linha`)
) ENGINE = InnoDB;

-- Criação da tabela 'motorista'
CREATE TABLE IF NOT EXISTS `motorista` (
  `id_motorista` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NULL DEFAULT NULL,
  `cpf` VARCHAR(14) NULL DEFAULT NULL,
  `telefone` VARCHAR(14) NULL DEFAULT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `foto` VARCHAR(200) NULL DEFAULT NULL,
  `observacoes` VARCHAR(535) NULL DEFAULT NULL,
  PRIMARY KEY (`id_motorista`)
) ENGINE = InnoDB;

-- Criação da tabela 'onibus'
CREATE TABLE IF NOT EXISTS `onibus` (
  `id_onibus` INT NOT NULL AUTO_INCREMENT,
  `placa` VARCHAR(7) NULL DEFAULT NULL,
  PRIMARY KEY (`id_onibus`)
) ENGINE = InnoDB;

-- Criação da tabela 'viagem'
CREATE TABLE IF NOT EXISTS `viagem` (
  `id_viagem` INT NOT NULL AUTO_INCREMENT,
  `inicio` DATETIME NULL DEFAULT NULL,
  `duracao` DATETIME NULL DEFAULT NULL,
  `linha_id` INT NOT NULL,
  `motorista_id` INT NOT NULL,
  `onibus_id` INT NOT NULL,
  PRIMARY KEY (`id_viagem`),
  INDEX `FK_LINHA` (`linha_id` ASC),
  INDEX `FK_MOTORISTA` (`motorista_id` ASC),
  INDEX `FK_ONIBUS` (`onibus_id` ASC),
  CONSTRAINT `FK_LINHA`
    FOREIGN KEY (`linha_id`)
    REFERENCES `linha` (`id_linha`),
  CONSTRAINT `FK_MOTORISTA`
    FOREIGN KEY (`motorista_id`)
    REFERENCES `motorista` (`id_motorista`),
  CONSTRAINT `FK_ONIBUS`
    FOREIGN KEY (`onibus_id`)
    REFERENCES `onibus` (`id_onibus`)
) ENGINE = InnoDB;

-- Criação da tabela 'viagem_has_usuario'
CREATE TABLE IF NOT EXISTS `viagem_has_usuario` (
  `tarifa` DECIMAL(10,2) NULL DEFAULT NULL,
  `data` DATE NOT NULL,
  `viagem_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `id_viagem_has_usuario` INT NOT NULL,
  INDEX `FK_VIAGEM` (`viagem_id` ASC),
  INDEX `FK_USUARIO` (`usuario_id` ASC),
  PRIMARY KEY (`id_viagem_has_usuario`),
  CONSTRAINT `FK_USUARIO`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `FK_VIAGEM`
    FOREIGN KEY (`viagem_id`)
    REFERENCES `viagem` (`id_viagem`)
) ENGINE = InnoDB;

-- Restauração das configurações originais
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
