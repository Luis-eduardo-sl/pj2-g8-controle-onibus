-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema onbus_data
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema onbus_data
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `onbus_data` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `onbus_data` ;

-- -----------------------------------------------------
-- Table `onbus_data`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onbus_data`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `telefone` VARCHAR(14) NULL DEFAULT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `cpf` VARCHAR(14) NULL DEFAULT NULL,
  `senha` VARCHAR(100) NULL DEFAULT NULL,
  `observacoes` VARCHAR(535) NULL DEFAULT NULL,
  `saldo` DECIMAL(2,0) NULL DEFAULT NULL,
  `tipo` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `onbus_data`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onbus_data`.`cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `token` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `senha` VARCHAR(45) NULL DEFAULT NULL,
  `usuario_cadastrado_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  INDEX `FK_USUARIO_CADASTRADO` (`usuario_cadastrado_id` ASC) VISIBLE,
  CONSTRAINT `FK_USUARIO_CADASTRADO`
    FOREIGN KEY (`usuario_cadastrado_id`)
    REFERENCES `onbus_data`.`usuario` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `onbus_data`.`linha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onbus_data`.`linha` (
  `id_linha` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NULL DEFAULT NULL,
  `inicio` DATETIME NULL DEFAULT NULL,
  `termino` DATETIME NULL DEFAULT NULL,
  `rota` VARCHAR(535) NULL DEFAULT NULL,
  PRIMARY KEY (`id_linha`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `onbus_data`.`motorista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onbus_data`.`motorista` (
  `id_motorista` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NULL DEFAULT NULL,
  `cpf` VARCHAR(14) NULL DEFAULT NULL,
  `telefone` VARCHAR(14) NULL DEFAULT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `foto` VARCHAR(200) NULL DEFAULT NULL,
  `observacoes` VARCHAR(535) NULL DEFAULT NULL,
  PRIMARY KEY (`id_motorista`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `onbus_data`.`onibus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onbus_data`.`onibus` (
  `id_onibus` INT NOT NULL AUTO_INCREMENT,
  `placa` VARCHAR(7) NULL DEFAULT NULL,
  PRIMARY KEY (`id_onibus`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `onbus_data`.`viagem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onbus_data`.`viagem` (
  `id_viagem` INT NOT NULL AUTO_INCREMENT,
  `inicio` DATETIME NULL DEFAULT NULL,
  `duracao` DATETIME NULL DEFAULT NULL,
  `linha_id` INT NOT NULL,
  `motorista_id` INT NOT NULL,
  `onibus_id` INT NOT NULL,
  PRIMARY KEY (`id_viagem`),
  INDEX `FK_LINHA` (`linha_id` ASC) VISIBLE,
  INDEX `FK_MOTORISTA` (`motorista_id` ASC) VISIBLE,
  INDEX `FK_ONIBUS` (`onibus_id` ASC) VISIBLE,
  CONSTRAINT `FK_LINHA`
    FOREIGN KEY (`linha_id`)
    REFERENCES `onbus_data`.`linha` (`id_linha`),
  CONSTRAINT `FK_MOTORISTA`
    FOREIGN KEY (`motorista_id`)
    REFERENCES `onbus_data`.`motorista` (`id_motorista`),
  CONSTRAINT `FK_ONIBUS`
    FOREIGN KEY (`onibus_id`)
    REFERENCES `onbus_data`.`onibus` (`id_onibus`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `onbus_data`.`viagem_has_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onbus_data`.`viagem_has_usuario` (
  `tarifa` DECIMAL(10,2) NULL DEFAULT NULL,
  `data` DATE NOT NULL,
  `viagem_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `id_viagem_has_usuario` INT NOT NULL,
  INDEX `FK_VIAGEM` (`viagem_id` ASC) VISIBLE,
  INDEX `FK_USUARIO` (`usuario_id` ASC) VISIBLE,
  PRIMARY KEY (`id_viagem_has_usuario`),
  CONSTRAINT `FK_USUARIO`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `onbus_data`.`usuario` (`id_usuario`),
  CONSTRAINT `FK_VIAGEM`
    FOREIGN KEY (`viagem_id`)
    REFERENCES `onbus_data`.`viagem` (`id_viagem`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
