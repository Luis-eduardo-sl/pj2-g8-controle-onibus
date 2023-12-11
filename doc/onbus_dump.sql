-- MariaDB dump 10.19  Distrib 10.4.22-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: onbus_data
-- ------------------------------------------------------
-- Server version	10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `onbus_data`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `onbus_data` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `onbus_data`;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `senha` varchar(535) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (2,'Gabriel',NULL,'a@gmail.com','$2a$10$cJWZneAtEVnCXSJeQNhkFeqBmaxp7xWKR0eTT3Usl6oY2h../AhUS'),(3,'Gabriel Teixeira',NULL,'gabrielteixeira@gmail.com','$2a$10$Q6uMTHCc5EEAaHBt8yZEb.r4GG.T95//jfvK9bYM78CkFcTWUHpvO'),(4,'gabriel',NULL,'gabrielcorrea@gmail.com','$2a$10$RR.ySmK10vy4yQVgEdzNN.f/KxXw5ZYl7ZQIbZDCHM/LGuPkS4aYW');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comentario` (
  `id_comentario` int(11) NOT NULL AUTO_INCREMENT,
  `texto` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_comentario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
INSERT INTO `comentario` VALUES (8,'45werqrewwreq','a@gmail.com','aaaaaaa'),(9,'Ônibus muito sujo','luis@gmail.com','Luis Eduardo'),(10,'Me senti desrespeitado pelo motorista pois não tinha o valor da passagem','','');
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linha`
--

DROP TABLE IF EXISTS `linha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linha` (
  `id_linha` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inicio` datetime DEFAULT NULL,
  `termino` datetime DEFAULT NULL,
  `rota` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freq_semanal` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_linha`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linha`
--

LOCK TABLES `linha` WRITE;
/*!40000 ALTER TABLE `linha` DISABLE KEYS */;
INSERT INTO `linha` VALUES (1,'110-CENTRO DIRETO-TRAVESSÃO','1900-01-01 14:00:00','1900-01-01 16:00:00','rota passando pelo bairro travessão e barranco alto e indo direto até o centro, contém 40 paradas\n                                            ','Segunda a Sexta'),(2,'110-CENTRO DIRETO-TRAVESSÃO','1900-01-01 21:00:00','1900-01-01 22:00:00','rota passando pelo bairro travessão e barranco alto e indo direto até o centro, contém 40 paradas\n                                            ','Fim de semana'),(3,'110-CENTRO DIRETO-TRAVESSÃO','1900-01-01 06:00:00','1900-01-01 07:00:00','rota passando pelo bairro travessão e barranco alto e indo direto até o centro, contém 40 paradas	\n                                            ','Segunda a Sexta'),(4,'110-CENTRO DIRETO-TRAVESSÃO','1900-01-01 04:00:00','1900-01-01 05:00:00','rota passando pelo bairro travessão e barranco alto e indo direto até o centro, contém 40 paradas	                              ','Segunda a Sexta'),(5,'110-CENTRO DIRETO-TRAVESSÃO	','1900-01-01 17:00:00','1900-01-01 18:00:00','\n                                            rota passando pelo bairro travessão e barranco alto e indo direto até o centro, contém 40 paradas	','Fim de semana');
/*!40000 ALTER TABLE `linha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motorista`
--

DROP TABLE IF EXISTS `motorista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motorista` (
  `id_motorista` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cpf` varchar(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacoes` varchar(535) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_motorista`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motorista`
--

LOCK TABLES `motorista` WRITE;
/*!40000 ALTER TABLE `motorista` DISABLE KEYS */;
INSERT INTO `motorista` VALUES (1,'Márcio Silva','13452789','12993658204','marciosilva@hotmail.com','uploads\\1701713291535-marcio.jpg','10 anos de experiência'),(2,'Lana Rafaela da Silva','13450283','12992738402','rafa.lana@hotmail.com','uploads\\1702325699139-lana.avif','Novata, 2 anos de experiência com ônibus escolares'),(3,'Martina Fonseca da Cruz','27392789','12993728463','martina102@outlook.com','uploads\\1702325884023-martina.avif',''),(4,'Rodrigo Mendes Fortunato','29350283','12992648392','rodrigofortunato10@gmail.com','uploads\\1702326069572-rodrigo.avif','8 anos de experiência '),(5,'Ricardo Melo da Silva','13789789','1299382710','ricardo789@hotmail.com',NULL,'experiência média com ônibus turísticos, 5 anos');
/*!40000 ALTER TABLE `motorista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `onibus`
--

DROP TABLE IF EXISTS `onibus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `onibus` (
  `id_onibus` int(11) NOT NULL AUTO_INCREMENT,
  `placa` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modelo` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacidade` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacoes` varchar(535) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_onibus`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `onibus`
--

LOCK TABLES `onibus` WRITE;
/*!40000 ALTER TABLE `onibus` DISABLE KEYS */;
INSERT INTO `onibus` VALUES (1,'AO29I4H','Mercedes-Benz O-500U 1826 (256cv)','90','Ônibus novo'),(2,'AO267H','Mercedes-Benz O-500U 1826 (256cv)	','90','Ônibus novo	'),(3,'AO29I4P','Mercedes-Benz O-500U 1826 (256cv)	','90',''),(4,'AO29I4H','Mercedes-Benz O-500U 1826 (256cv)	','90','Ônibus novo	'),(5,'AO29IPL','Mercedes-Benz O-500U 1826 (256cv)	','90','Ônibus novo	');
/*!40000 ALTER TABLE `onibus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cpf` varchar(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `senha` varchar(535) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacoes` varchar(535) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saldo` decimal(10,2) DEFAULT NULL,
  `tipo` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'comum',
  `cliente_id` int(11) DEFAULT NULL,
  `cartao_id` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `cartao_id` (`cartao_id`),
  KEY `FK_CLIENTE` (`cliente_id`),
  CONSTRAINT `FK_CLIENTE` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Ciclano Oliveira Lima','12987654322','ciclano.oliveira.lima@email.com','23466789011',NULL,'',15.75,'Idoso',4,'2345678901','2023-11-09 20:49:31'),(2,'Beltrano Pereira Costa','12987654323','beltrano.pereira.costa@email.com','78347890122',NULL,'',30.20,'Deficiente',4,'3456789012','2023-09-09 20:49:31'),(3,'Diana Santos Oliveira','12987654324','diana.santos.oliveira@email.com','42345201233',NULL,'',10.00,'Estudante',4,'4567890123','2023-09-09 20:49:31'),(4,'Eduardo Lima Costa','12987654325','eduardo.lima.costa@email.com','56782342344',NULL,'',35.75,'Comum',4,'5678901234','2023-07-09 20:49:31'),(5,'Gabriela Souza Santos','12987654326','gabriela.souza.santos@email.com','6785432455',NULL,'',25.00,'Idoso',4,'6789012345','2023-07-09 20:49:31'),(6,'Henrique Costa Oliveira','12987654327','henrique.costa.oliveira@email.com','78954324566',NULL,'',18.60,'Deficiente',4,'7890123456','2023-09-09 20:49:31'),(7,'Isabela Santos Lima','12987654328','isabela.santos.lima@email.com','90123735488',NULL,'',22.30,'Comum',4,'8901234567','2023-08-09 20:49:31'),(8,'João Pereira Silva','12987654329','joao.pereira.silva@email.com','01254627899',NULL,'',30.50,'Idoso',4,'984323210','2023-08-09 20:49:31'),(9,'Laura Oliveira Souza','12987654330','laura.oliveira.souza@email.com','11534244556',NULL,'',15.75,'Deficiente',4,'876642109','2023-08-09 20:49:31'),(10,'Marcelo Lima Costa','12987654331','marcelo.lima.costa@email.com','54325455667',NULL,'',28.20,'Estudante',4,'762341098','2023-09-09 20:49:31'),(17,'Natalia Costa Oliveira','12987654332','natalia.costa.oliveira@email.com','33543266778',NULL,'',19.00,'Comum',4,'643240987','2023-11-09 20:49:31'),(18,'Oscar Silva Santos','12987654333','oscar.silva.santos@email.com','44543277889',NULL,'',33.25,'Idoso',4,'5434244876','2023-12-09 20:49:31'),(19,'Patricia Oliveira Lima','12987654334','patricia.oliveira.lima@email.com','556542348990',NULL,'',25.75,'Deficiente',4,'432324765','2023-11-09 20:49:31'),(20,'Quiteria Pereira Souza','12987654335','quiteria.pereira.souza@email.com','42353299001',NULL,'',17.80,'Estudante',4,'3243287654','2023-11-09 20:49:31'),(21,'Rafael Santos Costa','12987654336','rafael.santos.costa@email.com','77843200112',NULL,'',29.90,'Comum',4,'2109324543','2023-09-09 20:49:31'),(22,'Simone Oliveira Lima','12987654337','simone.oliveira.lima@email.com','8896541123',NULL,'',14.50,'Idoso',4,'154345432','2023-08-09 20:49:31'),(23,'Thiago Costa Oliveira','12987654338','thiago.costa.oliveira@email.com','93641112234',NULL,'',22.50,'Deficiente',4,'0931234321','2023-07-09 20:49:31'),(24,'Ursula Silva Santos','12987654339','ursula.silva.santos@email.com','11154235395',NULL,'',18.25,'Estudante',4,'9832543210','2023-12-09 20:49:31'),(25,'Vinicius Lima Costa','12987654340','vinicius.lima.costa@email.com','22347532456',NULL,'',35.75,'Comum',4,'8765465409','2023-10-09 20:49:31'),(26,'Ximena Oliveira Lima','12987654341','ximena.oliveira.lima@email.com','33543555567',NULL,'',28.00,'Idoso',4,'765442398','2023-09-09 20:49:31'),(27,'Yago Pereira Silva','12987654342','yago.pereira.silva@email.com','44455734678',NULL,'',16.50,'Deficiente',4,'6543250987','2023-12-09 20:49:31'),(28,'Zara Santos Oliveira','12987654343','zara.santos.oliveira@email.com','55426677789',NULL,'',29.80,'Estudante',4,'5436545876','2023-08-09 20:49:31'),(29,'Walter Lima Costa','12987654344','walter.lima.costa@email.com','66674328890',NULL,'',21.00,'Comum',4,'4326854765','2023-12-09 20:49:31'),(30,'Vivian Costa Oliveira','12987654345','vivian.costa.oliveira@email.com','77745699901',NULL,'',14.75,'Idoso',4,'3210543654','2023-10-09 20:49:31'),(31,'Ubirajara Pereira Souza','12987654346','ubirajara.pereira.souza@email.com','88745900112',NULL,'',32.20,'Deficiente',4,'2154366543','2023-11-09 20:49:31'),(32,'Tatiane Santos Costa','12987654347','tatiane.santos.costa@email.com','47540112234',NULL,'',27.40,'Estudante',4,'1057325432','2023-10-09 20:49:31'),(33,'Sabrina Lima Costa','12987654348','sabrina.lima.costa@email.com','10114323145',NULL,'',18.75,'Comum',4,'556433210','2023-09-09 20:49:31'),(34,'Renato Oliveira Lima','12987654349','renato.oliveira.lima@email.com','12876290156',NULL,'',25.30,'Idoso',4,'8754353109','2023-07-09 20:49:31'),(35,'Quiteria Pereira Souza','12987654350','quiteria.pereira.souza@email.com','13141515432',NULL,'',32.90,'Deficiente',4,'7653421098','2023-07-09 20:49:31'),(36,'Paulo Santos Costa','12987654351','paulo.santos.costa@email.com','14151654678',NULL,'',14.20,'Estudante',4,'6543210987','2023-09-09 20:49:31'),(37,'Natasha Oliveira Lima','12987654352','natasha.oliveira.lima@email.com','15123783489',NULL,'',27.60,'Comum',4,'5432109876','2023-12-09 20:49:31'),(38,'Mauricio Pereira Souza','12987654353','mauricio.pereira.souza@email.com','1233519290',NULL,'',22.50,'Idoso',4,'4321098765','2023-11-09 20:49:31'),(39,'Larissa Lima Costa','12987654354','larissa.lima.costa@email.com','17137580201',NULL,'',31.80,'Deficiente',4,'3210987654','2023-10-09 20:49:31'),(40,'Kauan Oliveira Lima','12987654355','kauan.oliveira.lima@email.com','18192020212',NULL,'',19.75,'Estudante',4,'2109876543','2023-12-09 20:49:31'),(41,'Juliana Santos Costa','12987654356','juliana.santos.costa@email.com','19202122223',NULL,'',26.00,'Comum',4,'1098765432','2023-08-09 20:49:31'),(42,'Igor Silva Souza','12987654357','igor.silva.souza@email.com','20212223234',NULL,'',15.90,'Idoso',4,'0987654321','2023-12-09 20:49:31'),(43,'Paulo Silva','12997356237','paulo@gmail.com','234667890232',NULL,'',NULL,'Comum',4,'1237627482','2023-12-11 22:50:57'),(44,'Paulo Santos Costa','12987654351','paulo.santos.costa@email.com','14151654273',NULL,'',NULL,'Comum',4,'728349102','2023-12-11 22:55:57');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viagem`
--

DROP TABLE IF EXISTS `viagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `viagem` (
  `id_viagem` int(11) NOT NULL AUTO_INCREMENT,
  `inicio` datetime DEFAULT NULL,
  `duracao` datetime DEFAULT NULL,
  `linha_id` int(11) NOT NULL,
  `motorista_id` int(11) NOT NULL,
  `onibus_id` int(11) NOT NULL,
  PRIMARY KEY (`id_viagem`),
  KEY `FK_LINHA` (`linha_id`),
  KEY `FK_MOTORISTA` (`motorista_id`),
  KEY `FK_ONIBUS` (`onibus_id`),
  CONSTRAINT `FK_LINHA` FOREIGN KEY (`linha_id`) REFERENCES `linha` (`id_linha`),
  CONSTRAINT `FK_MOTORISTA` FOREIGN KEY (`motorista_id`) REFERENCES `motorista` (`id_motorista`),
  CONSTRAINT `FK_ONIBUS` FOREIGN KEY (`onibus_id`) REFERENCES `onibus` (`id_onibus`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viagem`
--

LOCK TABLES `viagem` WRITE;
/*!40000 ALTER TABLE `viagem` DISABLE KEYS */;
INSERT INTO `viagem` VALUES (1,'2023-12-11 00:00:00','2023-12-11 00:30:00',1,1,1),(2,'2023-12-11 00:30:00','2023-12-11 01:00:00',1,1,1),(3,'2023-12-11 01:00:00','2023-12-11 01:30:00',1,1,1),(4,'2023-12-11 01:30:00','2023-12-11 02:00:00',1,1,1),(5,'2023-12-11 02:00:00','2023-12-11 02:30:00',1,1,1),(6,'2023-12-11 02:30:00','2023-12-11 03:00:00',1,1,1),(7,'2023-12-11 03:00:00','2023-12-11 03:30:00',1,1,1),(8,'2023-12-11 03:30:00','2023-12-11 04:00:00',1,1,1),(9,'2023-12-11 04:00:00','2023-12-11 04:30:00',1,1,1),(10,'2023-12-11 04:30:00','2023-12-11 05:00:00',1,1,1),(11,'2023-12-11 05:00:00','2023-12-11 05:30:00',1,1,1),(12,'2023-12-11 05:30:00','2023-12-11 06:00:00',1,1,1),(13,'2023-12-11 06:00:00','2023-12-11 06:30:00',1,1,1),(14,'2023-12-11 06:30:00','2023-12-11 07:00:00',1,1,1),(15,'2023-12-11 07:00:00','2023-12-11 07:30:00',1,1,1),(16,'2023-12-11 07:30:00','2023-12-11 08:00:00',1,1,1),(17,'2023-12-11 08:00:00','2023-12-11 08:30:00',1,1,1),(18,'2023-12-11 08:30:00','2023-12-11 09:00:00',1,1,1),(19,'2023-12-11 09:00:00','2023-12-11 09:30:00',1,1,1),(20,'2023-12-11 09:30:00','2023-12-11 10:00:00',1,1,1),(21,'2023-12-11 10:00:00','2023-12-11 10:30:00',1,1,1),(22,'2023-12-11 10:30:00','2023-12-11 11:00:00',1,1,1),(23,'2023-12-11 11:00:00','2023-12-11 11:30:00',1,1,1),(24,'2023-12-11 11:30:00','2023-12-11 12:00:00',1,1,1);
/*!40000 ALTER TABLE `viagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viagem_has_usuario`
--

DROP TABLE IF EXISTS `viagem_has_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `viagem_has_usuario` (
  `tarifa` decimal(10,2) DEFAULT NULL,
  `data` date NOT NULL,
  `viagem_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `id_viagem_has_usuario` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_viagem_has_usuario`),
  KEY `FK_USUARIO` (`usuario_id`),
  KEY `FK_VIAGEM` (`viagem_id`),
  CONSTRAINT `FK_USUARIO` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `FK_VIAGEM` FOREIGN KEY (`viagem_id`) REFERENCES `viagem` (`id_viagem`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viagem_has_usuario`
--

LOCK TABLES `viagem_has_usuario` WRITE;
/*!40000 ALTER TABLE `viagem_has_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `viagem_has_usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-11 17:31:58
