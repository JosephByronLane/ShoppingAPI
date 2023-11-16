-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: api_equipo2
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `id` int NOT NULL,
  `descripcion` text,
  `nombre_del_cliente` varchar(255) DEFAULT NULL,
  `precio_total` decimal(10,2) DEFAULT NULL,
  `total_de_productos` int DEFAULT NULL,
  `fecha_de_creacion` datetime DEFAULT NULL,
  `usuario_de_creacion` varchar(255) DEFAULT NULL,
  `fecha_de_actualizacion` datetime DEFAULT NULL,
  `usuario_de_actualizacion` varchar(255) DEFAULT NULL,
  `usiario_id` int DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usiario_id` (`usiario_id`),
  CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`usiario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalladocompras`
--

DROP TABLE IF EXISTS `detalladocompras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalladocompras` (
  `id` int NOT NULL,
  `producto` int DEFAULT NULL,
  `orden` int DEFAULT NULL,
  `usuario_de_creacion` varchar(255) DEFAULT NULL,
  `fecha_de_creacion` datetime DEFAULT NULL,
  `fecha_de_actualizacion` datetime DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  `compra_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  KEY `compra_id` (`compra_id`),
  CONSTRAINT `detalladocompras_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  CONSTRAINT `detalladocompras_ibfk_2` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalladocompras`
--

LOCK TABLES `detalladocompras` WRITE;
/*!40000 ALTER TABLE `detalladocompras` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalladocompras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `precio` decimal(10,2) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `fabricante` varchar(255) DEFAULT NULL,
  `cantidad_en_existencia` int DEFAULT NULL,
  `unidad_de_medida` varchar(50) DEFAULT NULL,
  `fecha_de_creacion` datetime DEFAULT NULL,
  `usuario_de_creacion` varchar(255) DEFAULT NULL,
  `fecha_de_actualizacion` datetime DEFAULT NULL,
  `usuario_de_actualizacion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `extra1` varchar(255) DEFAULT NULL,
  `extra2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productosenpromocion`
--

DROP TABLE IF EXISTS `productosenpromocion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productosenpromocion` (
  `id` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `precio_en_promocion` decimal(10,2) DEFAULT NULL,
  `fecha_de_inicio` datetime DEFAULT NULL,
  `fecha_de_finalizacion` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  `promocion_id` int DEFAULT NULL,
  `extra1` varchar(255) DEFAULT NULL,
  `extra2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  KEY `promocion_id` (`promocion_id`),
  CONSTRAINT `productosenpromocion_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  CONSTRAINT `productosenpromocion_ibfk_2` FOREIGN KEY (`promocion_id`) REFERENCES `tipopromocion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productosenpromocion`
--

LOCK TABLES `productosenpromocion` WRITE;
/*!40000 ALTER TABLE `productosenpromocion` DISABLE KEYS */;
/*!40000 ALTER TABLE `productosenpromocion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipopromocion`
--

DROP TABLE IF EXISTS `tipopromocion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipopromocion` (
  `Promocion` varchar(255) DEFAULT NULL,
  `id` int NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipopromocion`
--

LOCK TABLES `tipopromocion` WRITE;
/*!40000 ALTER TABLE `tipopromocion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipopromocion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `correo_electronico` varchar(255) DEFAULT NULL,
  `contrasenha` varchar(255) DEFAULT NULL,
  `fecha_de_creacion` datetime DEFAULT NULL,
  `usuario_de_creacion` varchar(255) DEFAULT NULL,
  `fecha_de_actualizacion` datetime DEFAULT NULL,
  `usuario_de_actualizacion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `extra1` varchar(255) DEFAULT NULL,
  `extra2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-31 19:29:52
