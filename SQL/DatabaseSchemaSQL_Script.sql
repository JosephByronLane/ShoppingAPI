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
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text,
  `nombre_del_cliente` varchar(255) DEFAULT NULL,
  `precio_total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_de_productos` int NOT NULL DEFAULT '0',
  `fecha_de_creacion` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `usuario_de_creacion` varchar(255) DEFAULT NULL,
  `fecha_de_actualizacion` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `usuario_de_actualizacion` varchar(255) DEFAULT NULL,
  `activo` tinyint DEFAULT '1',
  `status` varchar(255) NOT NULL DEFAULT 'Activo',
  `usuarioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_fb09b81b8bc5a9c6cec96375ef0` (`usuarioId`),
  CONSTRAINT `FK_fb09b81b8bc5a9c6cec96375ef0` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,'Compra del usuario Diego Martínez','Diego Martínez',2849.98,2,'2023-12-07 00:38:19.673650','Samantha Ruiz','2023-12-07 00:38:28.000000',NULL,0,'Finalizado',4),(2,'Compra del usuario Carlos Hernandez','Carlos Hernandez',3499.99,1,'2023-12-07 00:39:21.591978','Carlos Hernandez','2023-12-07 00:39:27.000000',NULL,0,'Cancelado',6),(3,'Compra del usuario Carlos Hernandez','Carlos Hernandez',709.97,3,'2023-12-07 00:39:44.026685','Carlos Hernandez','2023-12-07 00:39:53.000000',NULL,0,'Finalizado',6),(4,'Compra del usuario Samantha Ruiz','Samantha Ruiz',3999.98,2,'2023-12-07 00:40:18.066419','Samantha Ruiz','2023-12-07 00:40:25.000000',NULL,0,'Finalizado',2),(5,'Compra del usuario Samantha Ruiz','Samantha Ruiz',5799.97,3,'2023-12-07 00:41:12.830262','Samantha Ruiz','2023-12-07 00:41:20.000000',NULL,0,'Finalizado',2),(6,'Compra del usuario Samantha Ruiz','Samantha Ruiz',17799.93,7,'2023-12-07 00:43:11.443879','Samantha Ruiz','2023-12-07 00:43:22.000000',NULL,0,'Finalizado',2),(7,'Compra del usuario Diego Martínez','Diego Martínez',3549.97,3,'2023-12-07 00:44:14.102118','Diego Martínez','2023-12-07 00:44:21.000000',NULL,0,'Finalizado',4),(8,'Compra del usuario Carlos Hernandez','Carlos Hernandez',999.98,2,'2023-12-07 00:45:27.286763','Carlos Hernandez','2023-12-07 00:45:50.000000',NULL,0,'Cancelado',6),(9,'Compra del usuario Carlos Hernandez','Carlos Hernandez',1099.97,3,'2023-12-07 00:46:22.341804','Carlos Hernandez','2023-12-07 00:46:36.000000',NULL,0,'Finalizado',6),(10,'Compra del usuario Carlos Hernandez','Carlos Hernandez',299.97,3,'2023-12-07 00:47:18.142409','Carlos Hernandez','2023-12-07 00:47:35.000000',NULL,0,'Finalizado',6),(11,'Compra del usuario Carlos Hernandez','Carlos Hernandez',2999.98,2,'2023-12-07 00:48:16.838588','Carlos Hernandez','2023-12-07 00:48:36.000000',NULL,0,'Finalizado',6),(12,'Compra del usuario María Fernández','María Fernández',3999.98,2,'2023-12-07 00:49:05.681998','María Fernández','2023-12-07 00:49:12.000000',NULL,0,'Finalizado',5),(13,'Compra del usuario María Fernández','María Fernández',2499.99,1,'2023-12-07 00:49:26.846264','María Fernández','2023-12-07 00:49:29.000000',NULL,0,'Finalizado',5),(14,'Compra del usuario María Fernández','María Fernández',2999.98,2,'2023-12-07 00:49:50.997995','María Fernández','2023-12-07 00:50:04.000000',NULL,1,'Activo',5),(15,'Compra del usuario Lucia Gonzalez','Lucia Gonzalez',1019.97,3,'2023-12-07 00:50:31.561265','Lucia Gonzalez','2023-12-07 00:51:09.000000',NULL,1,'Activo',3),(16,'Compra del usuario Samantha Ruiz','Samantha Ruiz',259.99,1,'2023-12-07 00:51:25.737729','Samantha Ruiz','2023-12-07 00:51:27.000000',NULL,0,'Finalizado',2),(17,'Compra del usuario Diego Martínez','Diego Martínez',199.99,1,'2023-12-07 00:51:54.268870','Diego Martínez','2023-12-07 00:52:04.000000',NULL,0,'Cancelado',4),(18,'Compra del usuario Diego Martínez','Diego Martínez',299.99,1,'2023-12-07 00:52:10.618929','Diego Martínez','2023-12-07 00:52:16.000000',NULL,0,'Finalizado',4),(19,'Compra del usuario Diego Martínez','Diego Martínez',2999.99,1,'2023-12-07 00:53:15.759987','Diego Martínez','2023-12-07 00:53:18.000000',NULL,0,'Finalizado',4),(20,'Compra del usuario Carlos Hernandez','Carlos Hernandez',4799.98,2,'2023-12-07 00:53:42.165498','Carlos Hernandez','2023-12-07 00:54:02.000000',NULL,1,'Activo',6),(21,'Compra del usuario Diego Martínez','Diego Martínez',15999.93,7,'2023-12-07 00:54:23.515089','Diego Martínez','2023-12-07 00:55:04.000000',NULL,0,'Cancelado',4),(22,'Compra del usuario Adalberto te amo mucho mucho','Adalberto te amo mucho mucho',199.99,1,'2023-12-07 00:57:45.694147','Adalberto te amo mucho mucho','2023-12-07 00:57:49.000000',NULL,0,'Finalizado',8),(23,'Compra del usuario Ethan Walker','Ethan Walker',199.99,1,'2023-12-07 01:17:01.947732','Ethan Walker','2023-12-07 01:17:01.000000',NULL,1,'Activo',22),(24,'Compra del usuario Isabel Méndez','Isabel Méndez',4479.97,3,'2023-12-07 01:17:25.632750','Isabel Méndez','2023-12-07 01:17:31.000000',NULL,0,'Finalizado',43),(25,'Compra del usuario Miguel Ángel Sánchez','Miguel Ángel Sánchez',4099.97,3,'2023-12-07 01:17:53.967843','Miguel Ángel Sánchez','2023-12-07 01:18:11.000000',NULL,0,'Finalizado',38),(26,'Compra del usuario Isabella Wilson','Isabella Wilson',499.99,1,'2023-12-07 01:18:44.778995','Isabella Wilson','2023-12-07 01:18:49.000000',NULL,0,'Finalizado',30),(27,'Compra del usuario Marco Vazquez','Marco Vazquez',699.97,3,'2023-12-07 01:19:09.214778','Marco Vazquez','2023-12-07 01:19:30.000000',NULL,0,'Finalizado',42),(28,'Compra del usuario Mia Thomas','Mia Thomas',2999.98,2,'2023-12-07 01:19:57.713691','Mia Thomas','2023-12-07 01:19:59.000000',NULL,0,'Finalizado',28),(29,'Compra del usuario Noah Davis','Noah Davis',24219.84,16,'2023-12-07 01:20:29.000700','Noah Davis','2023-12-07 01:21:14.000000',NULL,1,'Activo',12),(30,'Compra del usuario Evelyn Hall','Evelyn Hall',79.99,1,'2023-12-07 01:21:36.425742','Evelyn Hall','2023-12-07 01:21:39.000000',NULL,0,'Finalizado',20),(31,'Compra del usuario Mason Lewis','Mason Lewis',79.99,1,'2023-12-07 01:21:56.311960','Mason Lewis','2023-12-07 01:21:58.000000',NULL,0,'Finalizado',15),(32,'Compra del usuario Mason Lewis','Mason Lewis',379.98,2,'2023-12-07 01:22:17.723291','Mason Lewis','2023-12-07 01:22:25.000000',NULL,0,'Finalizado',15),(33,'Compra del usuario Mason Lewis','Mason Lewis',79.99,1,'2023-12-07 01:22:47.217186','Mason Lewis','2023-12-07 01:22:50.000000',NULL,0,'Finalizado',15),(34,'Compra del usuario Luis Navarro','Luis Navarro',79.99,1,'2023-12-07 01:23:20.730853','Luis Navarro','2023-12-07 01:23:20.000000',NULL,1,'Activo',33);
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallado_compras`
--

DROP TABLE IF EXISTS `detallado_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallado_compras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL DEFAULT '0',
  `fecha_de_creacion` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `usuario_de_creacion` varchar(255) DEFAULT NULL,
  `fecha_de_actualizacion` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `compraId` int DEFAULT NULL,
  `productoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d90dd2d45dbbfbd46cd0b83a408` (`compraId`),
  KEY `FK_e360fcb27d1b18e2e2d38d7adb2` (`productoId`),
  CONSTRAINT `FK_d90dd2d45dbbfbd46cd0b83a408` FOREIGN KEY (`compraId`) REFERENCES `compras` (`id`),
  CONSTRAINT `FK_e360fcb27d1b18e2e2d38d7adb2` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallado_compras`
--

LOCK TABLES `detallado_compras` WRITE;
/*!40000 ALTER TABLE `detallado_compras` DISABLE KEYS */;
INSERT INTO `detallado_compras` VALUES (1,1,'2023-12-07 00:38:19.685649','Samantha Ruiz','2023-12-07 00:38:19.000000',1,16),(2,1,'2023-12-07 00:38:25.104543','Samantha Ruiz','2023-12-07 00:38:25.000000',1,6),(3,1,'2023-12-07 00:39:21.601876','Carlos Hernandez','2023-12-07 00:39:21.000000',2,10),(4,1,'2023-12-07 00:39:44.036218','Carlos Hernandez','2023-12-07 00:39:44.000000',3,16),(5,2,'2023-12-07 00:39:50.215469','Carlos Hernandez','2023-12-07 00:39:50.000000',3,17),(6,2,'2023-12-07 00:40:18.075905','Samantha Ruiz','2023-12-07 00:40:20.000000',4,7),(7,1,'2023-12-07 00:41:12.838668','Samantha Ruiz','2023-12-07 00:41:12.000000',5,7),(8,1,'2023-12-07 00:41:15.625398','Samantha Ruiz','2023-12-07 00:41:15.000000',5,5),(9,1,'2023-12-07 00:41:18.643873','Samantha Ruiz','2023-12-07 00:41:18.000000',5,2),(10,1,'2023-12-07 00:43:11.452851','Samantha Ruiz','2023-12-07 00:43:11.000000',6,2),(11,6,'2023-12-07 00:43:19.491324','Samantha Ruiz','2023-12-07 00:43:19.000000',6,9),(12,2,'2023-12-07 00:44:14.109991','Diego Martínez','2023-12-07 00:44:14.000000',7,5),(13,1,'2023-12-07 00:44:20.078127','Diego Martínez','2023-12-07 00:44:20.000000',7,16),(14,2,'2023-12-07 00:45:27.295074','Carlos Hernandez','2023-12-07 00:45:28.000000',8,11),(15,2,'2023-12-07 00:46:22.350736','Carlos Hernandez','2023-12-07 00:46:29.000000',9,11),(16,1,'2023-12-07 00:46:32.494526','Carlos Hernandez','2023-12-07 00:46:32.000000',9,13),(17,3,'2023-12-07 00:47:18.151581','Carlos Hernandez','2023-12-07 00:47:28.000000',10,13),(18,2,'2023-12-07 00:48:16.847001','Carlos Hernandez','2023-12-07 00:48:25.000000',11,1),(19,1,'2023-12-07 00:49:05.691973','María Fernández','2023-12-07 00:49:05.000000',12,1),(20,1,'2023-12-07 00:49:09.202667','María Fernández','2023-12-07 00:49:09.000000',12,6),(21,1,'2023-12-07 00:49:26.855696','María Fernández','2023-12-07 00:49:26.000000',13,6),(22,1,'2023-12-07 00:49:51.006703','María Fernández','2023-12-07 00:49:51.000000',14,6),(23,1,'2023-12-07 00:50:04.893804','María Fernández','2023-12-07 00:50:04.000000',14,11),(24,1,'2023-12-07 00:50:31.570413','Lucia Gonzalez','2023-12-07 00:50:31.000000',15,11),(25,2,'2023-12-07 00:50:36.566195','Lucia Gonzalez','2023-12-07 00:51:09.000000',15,18),(26,1,'2023-12-07 00:51:25.745841','Samantha Ruiz','2023-12-07 00:51:25.000000',16,18),(27,1,'2023-12-07 00:51:54.277021','Diego Martínez','2023-12-07 00:51:54.000000',17,15),(28,1,'2023-12-07 00:52:10.628079','Diego Martínez','2023-12-07 00:52:10.000000',18,14),(29,1,'2023-12-07 00:53:15.768080','Diego Martínez','2023-12-07 00:53:15.000000',19,3),(30,1,'2023-12-07 00:53:42.175705','Carlos Hernandez','2023-12-07 00:53:42.000000',20,4),(31,1,'2023-12-07 00:54:02.059538','Carlos Hernandez','2023-12-07 00:54:02.000000',20,8),(32,2,'2023-12-07 00:54:23.522711','Diego Martínez','2023-12-07 00:54:42.000000',21,8),(33,1,'2023-12-07 00:54:46.510425','Diego Martínez','2023-12-07 00:54:46.000000',21,1),(34,1,'2023-12-07 00:54:48.262903','Diego Martínez','2023-12-07 00:54:48.000000',21,2),(35,1,'2023-12-07 00:54:50.602230','Diego Martínez','2023-12-07 00:54:50.000000',21,3),(36,1,'2023-12-07 00:54:53.207533','Diego Martínez','2023-12-07 00:54:53.000000',21,4),(37,1,'2023-12-07 00:54:55.868573','Diego Martínez','2023-12-07 00:54:55.000000',21,5),(38,1,'2023-12-07 00:57:45.702778','Adalberto te amo mucho mucho','2023-12-07 00:57:45.000000',22,15),(39,1,'2023-12-07 01:17:01.956575','Ethan Walker','2023-12-07 01:17:01.000000',23,15),(40,1,'2023-12-07 01:17:25.640902','Isabel Méndez','2023-12-07 01:17:25.000000',24,12),(41,2,'2023-12-07 01:17:28.822320','Isabel Méndez','2023-12-07 01:17:28.000000',24,2),(42,2,'2023-12-07 01:17:53.976515','Miguel Ángel Sánchez','2023-12-07 01:17:53.000000',25,4),(43,1,'2023-12-07 01:18:04.510316','Miguel Ángel Sánchez','2023-12-07 01:18:04.000000',25,14),(44,1,'2023-12-07 01:18:44.786767','Isabella Wilson','2023-12-07 01:18:44.000000',26,11),(45,1,'2023-12-07 01:19:09.222602','Marco Vazquez','2023-12-07 01:19:09.000000',27,17),(46,2,'2023-12-07 01:19:20.593846','Marco Vazquez','2023-12-07 01:19:20.000000',27,18),(47,2,'2023-12-07 01:19:57.722354','Mia Thomas','2023-12-07 01:19:57.000000',28,1),(48,1,'2023-12-07 01:20:29.008180','Noah Davis','2023-12-07 01:20:29.000000',29,17),(49,1,'2023-12-07 01:20:33.004493','Noah Davis','2023-12-07 01:20:33.000000',29,18),(50,2,'2023-12-07 01:20:38.185357','Noah Davis','2023-12-07 01:21:03.000000',29,9),(51,1,'2023-12-07 01:20:41.136857','Noah Davis','2023-12-07 01:20:41.000000',29,1),(52,1,'2023-12-07 01:20:43.221875','Noah Davis','2023-12-07 01:20:43.000000',29,2),(53,1,'2023-12-07 01:20:45.198608','Noah Davis','2023-12-07 01:20:45.000000',29,3),(54,1,'2023-12-07 01:20:47.647640','Noah Davis','2023-12-07 01:20:47.000000',29,4),(55,1,'2023-12-07 01:20:49.934338','Noah Davis','2023-12-07 01:20:49.000000',29,5),(56,1,'2023-12-07 01:20:53.658254','Noah Davis','2023-12-07 01:20:53.000000',29,6),(57,1,'2023-12-07 01:20:56.599178','Noah Davis','2023-12-07 01:20:56.000000',29,8),(58,1,'2023-12-07 01:21:00.226484','Noah Davis','2023-12-07 01:21:00.000000',29,7),(59,1,'2023-12-07 01:21:06.613916','Noah Davis','2023-12-07 01:21:06.000000',29,11),(60,1,'2023-12-07 01:21:09.008113','Noah Davis','2023-12-07 01:21:09.000000',29,12),(61,1,'2023-12-07 01:21:11.335892','Noah Davis','2023-12-07 01:21:11.000000',29,13),(62,1,'2023-12-07 01:21:14.388207','Noah Davis','2023-12-07 01:21:14.000000',29,14),(63,1,'2023-12-07 01:21:36.433810','Evelyn Hall','2023-12-07 01:21:36.000000',30,12),(64,1,'2023-12-07 01:21:56.320728','Mason Lewis','2023-12-07 01:21:56.000000',31,12),(65,1,'2023-12-07 01:22:17.730784','Mason Lewis','2023-12-07 01:22:17.000000',32,17),(66,1,'2023-12-07 01:22:23.362722','Mason Lewis','2023-12-07 01:22:23.000000',32,15),(67,1,'2023-12-07 01:22:47.225839','Mason Lewis','2023-12-07 01:22:47.000000',33,12),(68,1,'2023-12-07 01:23:20.739127','Luis Navarro','2023-12-07 01:23:20.000000',34,12);
/*!40000 ALTER TABLE `detallado_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `precio` decimal(10,2) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `fabricante` varchar(255) DEFAULT NULL,
  `cantidad_en_existencia` int NOT NULL DEFAULT '0',
  `unidad_de_medida` varchar(50) DEFAULT NULL,
  `fecha_de_creacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `usuario_de_creacion` varchar(255) DEFAULT NULL,
  `fecha_de_actualizacion` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `usuario_de_actualizacion` varchar(255) DEFAULT NULL,
  `activo` tinyint DEFAULT NULL,
  `extra2` varchar(255) DEFAULT NULL,
  `enPromocion` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Tropical Paradise Adventure','A week-long adventure in a tropical paradise with beach resorts and jungle tours.',1499.99,'Travel packages','Global Adventures',23,'package','2023-12-07 00:38:01.008705','SYSTEM','2023-12-07 01:20:41.000000',NULL,1,NULL,0),(2,'European Highlights Tour','Experience the best of Europe with this 10-day tour across historical landmarks.',2199.99,'Travel packages','Continental Journeys',9,'package','2023-12-07 00:38:01.015619','SYSTEM','2023-12-07 01:20:43.000000',NULL,1,NULL,0),(3,'Safari Expedition','An unforgettable safari experience in the Serengeti with wildlife sightings and luxury camping.',2999.99,'Travel packages','Wildlife Voyages',17,'package','2023-12-07 00:38:01.022192','SYSTEM','2023-12-07 01:20:45.000000',NULL,1,NULL,0),(4,'Andean Explorer Journey','Discover the mysteries of the Andes with this guided tour that includes Machu Picchu.',1899.99,'Travel packages','Mountain Mysteries Tours',20,'package','2023-12-07 00:38:01.028245','SYSTEM','2023-12-07 01:20:47.000000',NULL,1,NULL,0),(5,'Caribbean Cruise Getaway','A luxury cruise that takes you to the heart of the Caribbean\'s most stunning islands.',1599.99,'Travel packages','Oceanic Cruises',35,'package','2023-12-07 00:38:01.035131','SYSTEM','2023-12-07 01:20:49.000000',NULL,1,NULL,0),(6,'Alaskan Wilderness Retreat','Explore the Alaskan wilderness with guided tours of glaciers and national parks.',2499.99,'Travel packages','Frontier Explorers',15,'package','2023-12-07 00:38:01.041165','SYSTEM','2023-12-07 01:20:53.000000',NULL,1,NULL,0),(7,'Ancient Egypt Discovery','A cultural and historical tour of Egypt\'s ancient landmarks, including the Pyramids and the Nile.',1999.99,'Travel packages','Time Travel Tours',21,'package','2023-12-07 00:38:01.047022','SYSTEM','2023-12-07 01:21:00.000000',NULL,1,NULL,0),(8,'Japanese Culture Experience','Immerse yourself in Japanese culture with this tour of Tokyo, Kyoto, and Mount Fuji.',2899.99,'Travel packages','Nippon Adventures',14,'package','2023-12-07 00:38:01.053139','SYSTEM','2023-12-07 01:20:56.000000',NULL,1,NULL,0),(9,'Australian Outback Adventure','A rugged adventure through Australia\'s Outback with experienced guides.',2599.99,'Travel packages','Down Under Tours',14,'package','2023-12-07 00:38:01.059694','SYSTEM','2023-12-07 01:21:03.000000',NULL,1,NULL,0),(10,'Arctic Expedition','A journey to the Arctic Circle to experience the midnight sun and polar wildlife.',3499.99,'Travel packages','Polar Adventures',9,'package','2023-12-07 00:38:01.065824','SYSTEM','2023-12-07 00:39:21.000000',NULL,1,NULL,0),(11,'Grand Canyon Helicopter Tour','Experience breathtaking views of the Grand Canyon with this exclusive helicopter tour.',499.99,'Tours','Sky High Tours',42,'tour','2023-12-07 00:38:01.071745','SYSTEM','2023-12-07 01:21:06.000000',NULL,1,NULL,0),(12,'Historic Rome Walking Tour','Walk through history with a guided tour of Rome\'s ancient landmarks, including the Colosseum and Roman Forum.',79.99,'Tours','Eternal City Guides',94,'tour','2023-12-07 00:38:01.077594','SYSTEM','2023-12-07 01:23:20.000000',NULL,1,NULL,0),(13,'Paris Night Bike Tour','Discover the magic of Paris at night on a guided bike tour around the city\'s most iconic sights.',99.99,'Tours','City Lights Cycling',55,'tour','2023-12-07 00:38:01.084804','SYSTEM','2023-12-07 01:21:11.000000',NULL,1,NULL,0),(14,'Luxury Beachfront Resort Stay','Enjoy a lavish stay at our beachfront resort, featuring world-class amenities and breathtaking ocean views.',299.99,'Hotel stays','OceanView Resorts',17,'night','2023-12-07 00:38:01.091419','SYSTEM','2023-12-07 01:21:14.000000',NULL,1,NULL,0),(15,'Mountain Cabin Retreat','Escape to our cozy mountain cabin, nestled in the heart of the scenic wilderness.',199.99,'Hotel stays','Highland Hideaways',26,'night','2023-12-07 00:38:01.097205','SYSTEM','2023-12-07 01:22:23.000000',NULL,1,NULL,0),(16,'Downtown Luxury Hotel Experience','Experience the heart of the city in our luxury hotel, located within walking distance of major attractions.',349.99,'Hotel stays','Urban Elite Hotels',47,'night','2023-12-07 00:38:01.103095','SYSTEM','2023-12-07 00:44:20.000000',NULL,1,NULL,0),(17,'Romantic Countryside Inn','Spend a romantic getaway in our charming countryside inn, offering a peaceful and idyllic setting.',179.99,'Hotel stays','Country Comfort Inns',20,'night','2023-12-07 00:38:01.108558','SYSTEM','2023-12-07 01:22:17.000000',NULL,1,NULL,0),(18,'Historic Boutique Hotel Stay','Immerse yourself in history with a stay at our boutique hotel, housed in a beautifully restored historic building.',259.99,'Hotel stays','Heritage Hotels',34,'night','2023-12-07 00:38:01.114404','SYSTEM','2023-12-07 01:20:33.000000',NULL,1,NULL,0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productosenpromocion`
--

DROP TABLE IF EXISTS `productosenpromocion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productosenpromocion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `precio_en_promocion` decimal(10,2) DEFAULT NULL,
  `fecha_de_inicio` datetime DEFAULT NULL,
  `fecha_de_finalizacion` datetime DEFAULT NULL,
  `activo` tinyint DEFAULT '1',
  `extra1` varchar(255) DEFAULT NULL,
  `extra2` varchar(255) DEFAULT NULL,
  `producto_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3ebb7cdf151c1eec3dfcad202a0` (`producto_id`),
  CONSTRAINT `FK_3ebb7cdf151c1eec3dfcad202a0` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productosenpromocion`
--

LOCK TABLES `productosenpromocion` WRITE;
/*!40000 ALTER TABLE `productosenpromocion` DISABLE KEYS */;
INSERT INTO `productosenpromocion` VALUES (1,'Tropical Paradise Adventure','Special offer on our week-long adventure in a tropical paradise.',1299.99,'2023-11-30 18:00:00','2023-12-31 17:59:59',1,NULL,NULL,1),(2,'European Highlights Tour','Limited time discount on our 10-day European tour.',1999.99,'2023-11-30 18:00:00','2023-12-31 17:59:59',1,NULL,NULL,2),(3,'Safari Expedition','Promotional price for our Serengeti safari experience.',2799.99,'2023-11-30 18:00:00','2023-12-31 17:59:59',1,NULL,NULL,3);
/*!40000 ALTER TABLE `productosenpromocion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `correo_electronico` varchar(255) DEFAULT NULL,
  `contrasenia` varchar(255) DEFAULT NULL,
  `fecha_de_creacion` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `usuario_de_creacion` varchar(255) DEFAULT NULL,
  `fecha_de_actualizacion` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `usuario_de_actualizacion` varchar(255) DEFAULT NULL,
  `activo` tinyint DEFAULT '1',
  `extra1` varchar(255) DEFAULT NULL,
  `extra2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_79cfbe9c9405d6051482ae1e8b` (`correo_electronico`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin',NULL,'$2b$10$JLLw7c49tfpYhRHfdDOzUuYSmWRiRm06/Q4SgRYV/4gik/LSBlD0m','2023-12-07 00:38:00.996467','admin','2023-12-07 01:12:19.199955',NULL,1,NULL,NULL),(2,'Samantha Ruiz','samantha.ruiz@example.com','$2b$10$3DuRdd3skJXPT7c1LnD3.um80oCY7kIPA8k9T82A4VB/daINCNhQi','2023-12-07 00:38:01.188000','Diego Martínez','2023-12-07 01:12:19.194348',NULL,1,NULL,NULL),(3,'Lucia Gonzalez','lucia.gonzalez@example.com','$2b$10$qFhuvyH4yQ4UKLb./SSxuuU/lL3EKyULAZ/l13KTeOc9nR3z2WSoG','2023-12-07 00:38:01.246000','admin','2023-12-07 01:12:19.199152',NULL,1,NULL,NULL),(4,'Diego Martínez','diego.martinez@example.com','$2b$10$71J/AD2P0zPWM/.oCJMrzOhfLdsvd0o0hvLVrbNftOaBB3WmOH0UW','2023-12-07 00:38:01.303000','admin','2023-12-07 01:12:19.199352',NULL,1,NULL,NULL),(5,'María Fernández','maria.fernandez@example.com','$2b$10$4Z2clMPiaD4mql42vwYuQ.WyGWqwyBfiVrkNEkgaoOibtE2kJR.a2','2023-12-07 00:38:01.358000','admin','2023-12-07 01:12:19.199552',NULL,1,NULL,NULL),(6,'Carlos Hernandez','carlos.hernandez@example.com','$2b$10$oJvHYLw4RUJaMaVKJuhYPuW5hN5hRMRBn8taELfeeBEvHpU2zd2j6','2023-12-07 00:38:01.413000','admin','2023-12-07 01:12:19.199756',NULL,1,NULL,NULL),(8,'Jose abram','abramr@examplerr.com','$2b$10$Iyh09TjfTC1/PMHnHJNnUuIPBfPXm0dX0Dqts9u85an4qh6.4TGUK','2023-12-07 00:57:10.684341','Diego Martínez','2023-12-07 01:13:02.076624',NULL,1,NULL,NULL),(9,'Emma Johnson','emma.johnson@mequieromatar.com','$2b$10$UyfSl/rhhbMkb/vTe5JveuBG80kN3pxxRKRwfMfwdqJ20ERetVkU2','2023-12-07 01:01:42.088821','System','2023-12-07 01:12:19.193446',NULL,1,NULL,NULL),(10,'Olivia Smith','olivia.smith@trivago.com','$2b$10$qAwE.0f36reXHw.0qAGkwuUKQXWqSyLmTEncqP24NEfOfIELMXwyu','2023-12-07 01:01:55.990197','System','2023-12-07 01:12:19.193897',NULL,1,NULL,NULL),(11,'Ava Martinez','ava.martinez@openenglish.com','$2b$10$//CNaWWA8EBft4aVWxNreOQzIsMr/FQ9Vs6Z0dn7Fp0YeO0iv89tO','2023-12-07 01:02:06.328489','System','2023-12-07 01:12:19.194120',NULL,1,NULL,NULL),(12,'Noah Davis','noah.davis@openenglish.com','$2b$10$7VijY/Hq35wWoshvhH2exOdZfxk4uVpkAZxS8d3sM5l2TM5yUVC5e','2023-12-07 01:02:34.992149','Carlos Hernandez','2023-12-07 01:12:19.198151',NULL,1,NULL,NULL),(13,'James Lopez','james.lopez@trivago.com','$2b$10$vUc1s0xFkgZcQmRNkDfUnu/seU95WaSnDf8Tp2GJqB3BKUhsv5a/6','2023-12-07 01:02:45.955900','Carlos Hernandez','2023-12-07 01:12:19.200355',NULL,1,NULL,NULL),(14,'William Garcia','william.garcia@betterme.com','$2b$10$98X7H31zZrI/FEvaQDl7GOaon5pmzRaVU0Z7sLiXjV6ovTdNTfNdG','2023-12-07 01:02:56.265794','María Fernández','2023-12-07 01:12:19.194573',NULL,1,NULL,NULL),(15,'Mason Lewis','mason.lewis@oulette.com','$2b$10$KgWZE/DYEXkGEJCBRdKVGONO.X12AUbNV5SwkvBqxBdpR4tF0HhiC','2023-12-07 01:03:04.827304','Ava Martinez','2023-12-07 01:12:19.200154',NULL,1,NULL,NULL),(16,'Benito Camelo','benito.clark@albur.com','$2b$10$9BnXw.VjDMIEGyN8aRB9xeMUfO2Ot4H5bL32M417ChMrTnWsc7R22','2023-12-07 01:03:22.006930','María Fernández','2023-12-07 01:16:17.734659',NULL,1,NULL,NULL),(17,'Paco Gertes','paco@albur.com','$2b$10$LOk.Ghh0J2JNsaZQ.VJmZe.RbTDZiZjU6/OMv4/cKTGxisKOvLvyi','2023-12-07 01:03:34.077698','María Fernández','2023-12-07 01:16:17.734258',NULL,1,NULL,NULL),(18,'Logan Anderson','logan.anderson@yourmom.com','$2b$10$I/HOPbqkwkDXt3LBbsdUb.he8tvP9LOnM/RQC0ops9xjFzeRWo1fa','2023-12-07 01:03:42.821155','Sophia Rodriguez','2023-12-07 01:12:19.198353',NULL,1,NULL,NULL),(19,'Sophia Rodriguez','sophia.rodriguez@trivago.com','$2b$10$ynnrDHOEzr3yo/bnlGy..uhBWS.2pZeRLXwAmr8wnZygTqOLz5.XS','2023-12-07 01:03:54.727841','Logan Anderson','2023-12-07 01:12:19.198750',NULL,1,NULL,NULL),(20,'Evelyn Hall','evelyn.hall@modelo.com','$2b$10$OVHZjOGFFLgSjbPuabI5HOScZLvivBNfMkFPRXNqYucY1XbHbOt96','2023-12-07 01:04:11.302240','Amelia Clark','2023-12-07 01:12:19.195856',NULL,1,NULL,NULL),(21,'Adalberto te amo mucho','adalteamo@amor.101.com','$2b$10$UpjRsO4qpOiE3l2VT.yIl.0nDnSBx42NYhqTMsk/s3kQND4NF5Y2i','2023-12-07 01:04:23.091883','Amelia Clark','2023-12-07 01:13:33.725123',NULL,1,NULL,NULL),(22,'Ethan Walker','ethan.walker@helloitsme.com','$2b$10$Vzspou1H8Kb839B64Ez7L.CCGUvaHhg7Oq701gE92eXe3d9MtAeCK','2023-12-07 01:04:37.075558','María Fernández','2023-12-07 01:12:19.195647',NULL,1,NULL,NULL),(23,'Mason Lewis','mason.lewis@exampler.com','$2b$10$2MA6XpbUtqifBkMTO2jat.JG8z6sISrfDcW3IYpvGPDDgVIfc1Lmm','2023-12-07 01:04:45.600975','Sophia Rodriguez','2023-12-07 01:12:19.198552',NULL,1,NULL,NULL),(24,'Amelia Clark','amelia.clark@trivago.com','$2b$10$m7kxvO7wl6/6lbZJFgnLXuAIC5cgjUOAF5ZJDeF/3UgZAuW5J6jnW','2023-12-07 01:04:55.699249','Amelia Clark','2023-12-07 01:12:19.196062',NULL,1,NULL,NULL),(25,'Lucas Harris','lucas.harris@DairyQweeb.com','$2b$10$T9YWMjiuiDlvOT8u2Hj9lu41mqptfWoenRfw0449Vbp.Xh0TOCu0.','2023-12-07 01:05:12.725284','Logan Anderson','2023-12-07 01:12:19.198949',NULL,1,NULL,NULL),(26,'Michael Jackson','jackson@ImStillDead.com','$2b$10$HFcWtCSlMsBtWbjPlylktOfwTE4vpPQekv6zIy6omyEDwjuuxHLK.','2023-12-07 01:05:31.103754','María Fernández','2023-12-07 01:12:19.195236',NULL,1,NULL,NULL),(27,'Benjamin Lee','benjamin.lee@exampler.com','$2b$10$7Hxd6Bx1gFyi6eNja915HuaMKCvkXnTySlKcMK2fBCR/Cbm3SwSLO','2023-12-07 01:05:38.982452','Amelia Clark','2023-12-07 01:12:19.200755',NULL,1,NULL,NULL),(28,'Mia Thomas','mia.thomas@modelo.com','$2b$10$O3Rt2IV7cVVo2LQymZFctuy92YoCjkm0MGI6J2HUu.qrKRrKBSY5C','2023-12-07 01:05:50.798754','Amelia Clark','2023-12-07 01:12:19.200961',NULL,1,NULL,NULL),(29,'Logan Anderson','erest.anderson@modelo.com','$2b$10$6vxopp1c2gJ8spxCmQNmeuajT49F35lY6WWryMy7enycGPotAU5vG','2023-12-07 01:06:03.792032','Amelia Clark','2023-12-07 01:12:19.196270',NULL,1,NULL,NULL),(30,'Isabella Wilson','isabella.wilson@Mota.com','$2b$10$8TbekFR3OPFeYCrk7cJTx.NT/w8fMiM4c.td/00.G/siDq9/Er/tC','2023-12-07 01:06:15.205250','Benjamin Lee','2023-12-07 01:12:19.201177',NULL,1,NULL,NULL),(31,'Joseph es un exigente','chupala@modelo.com','$2b$10$X4ZdLBTx.tTMaPWYp.fTv.rDrtgkRaIhaRWrUK7tw8BRSGVJaZm/e','2023-12-07 01:07:11.841898','María Fernández','2023-12-07 01:12:19.195439',NULL,1,NULL,NULL),(32,'Elbert Alarga','Alarga@albur.com','$2b$10$wYpmCCkAOESD8eqWDKXsleEqSJ7y/G8xkf..4yFfTfQNg3c/W1CyG','2023-12-07 01:07:24.156777','Amelia Clark','2023-12-07 01:12:19.196483',NULL,1,NULL,NULL),(33,'Luis Navarro','luis.navarro@exampler.com','$2b$10$FiJG2TC7eIXYBnlBS2hje.aHyVU9rYPjlAjp.aHtJgdUBadaZT7ke','2023-12-07 01:08:14.606437','Isabella Wilson','2023-12-07 01:12:19.197738',NULL,1,NULL,NULL),(34,'Ana Torres','ana.torres@openenglish.com','$2b$10$.ZlKu1h/cLJEDCRMTv9GJuZY0p4uFaZscX0ZlTKeyssGnUFfyLQ7K','2023-12-07 01:08:26.173348','Benjamin Lee','2023-12-07 01:12:19.201379',NULL,1,NULL,NULL),(35,'Elena Rodriguez','elena.rodriguez@whew.com','$2b$10$VcqTF9e90J08ABpo54MAxODUYJl0Q91QzcdUnyFdjSru6c2pBp2ZK','2023-12-07 01:08:34.715426','Isabella Wilson','2023-12-07 01:12:19.197536',NULL,1,NULL,NULL),(36,'Aquiles Castro','castr@whew.com','$2b$10$5p.xfwwMTqDa9dbYxKS.3e.2xvZPLYFts7ixqFqQBP9AKKtf/SlMS','2023-12-07 01:09:01.652979','Mason Lewis','2023-12-07 01:12:19.196892',NULL,1,NULL,NULL),(37,'Patricia Fernández','patricia.fernandez@exampler.com','$2b$10$4P2ozPVE/Z6mM3D6Kqhi4eAl7VijNW1QyXVnJ5/lgPX0CVc6BYtXe','2023-12-07 01:09:20.358048','Benjamin Lee','2023-12-07 01:12:19.201578',NULL,1,NULL,NULL),(38,'Miguel Ángel Sánchez','miguel.sanchez@trivago.com','$2b$10$De33o/PJhFmMaP8rRHOJWOv.QJ6SUPcTrHH2HQF6yJi8vBwplcKu.','2023-12-07 01:09:35.476219','Mason Lewis','2023-12-07 01:12:19.197126',NULL,1,NULL,NULL),(39,'Javier López','lopez@whew.com','$2b$10$Isp17VxLOwu49NFjpXRHQeFIMK3gLYC261QA/70mgD.FzmJXN8YKW','2023-12-07 01:10:01.137103','Patricia Fernández','2023-12-07 01:12:19.197943',NULL,1,NULL,NULL),(40,'Jorge Nitales','Nitales@whew.com','$2b$10$DzDnxYPYIacm/7gfTvr8du8mCuriwhyQanAW5kEEbGk6zkuLkX.5a','2023-12-07 01:10:17.273808','Amelia Clark','2023-12-07 01:12:19.196690',NULL,1,NULL,NULL),(41,'Elena Rodriguez','elena.rodriguez@exampler.com','$2b$10$0POcvylKPP6g9s.YG23qhemajWqzB30iVNjDkvchJq8SksIhtyuCG','2023-12-07 01:10:36.383570','Mason Lewis','2023-12-07 01:12:19.197335',NULL,1,NULL,NULL),(42,'Marco Vazquez','marco.vazquez@example.com','$2b$10$TjJUlU8b1mWcdk8LOxXhD.iEBFLMU8nXCrJtCTkY8M3EZZ6KTqaeW','2023-12-07 01:14:00.831320','Adalberto te amo mucho mucho','2023-12-07 01:14:00.831320',NULL,1,NULL,NULL),(43,'Isabel Méndez','isabel.mendez@example.com','$2b$10$r2i2hXCKP0QDpyqCNLkKk.1gcOOUp9C9NKFg2czB0pwL8t9DWTOgO','2023-12-07 01:14:07.296960','Adalberto te amo mucho mucho','2023-12-07 01:14:07.296960',NULL,1,NULL,NULL),(44,'Laura Jiménez','laura.jimenez@example.com','$2b$10$/Els6Gohcj4ClZqHZ6KCEuolIEUFs67eAkfzNAoXrDRe4dPidrxN2','2023-12-07 01:14:15.538523','Adalberto te amo mucho mucho','2023-12-07 01:14:15.538523',NULL,1,NULL,NULL),(45,'Patricia Fernández','patricia.fernandez@example.com','$2b$10$VjUgRWgYvTdStUwSl3O57uxpoRITceTPEy/lKsKRSzP3oq5e0Ec6G','2023-12-07 01:14:20.613018','Adalberto te amo mucho mucho','2023-12-07 01:14:20.613018',NULL,1,NULL,NULL),(46,'Miguel Ángel Sánchez','miguel.sanchez@example.com','$2b$10$2rNH9IX8FDMP.sPFT42XG.zKK6Fr/NMgcrCPxUdl4W0c8MXbFFzw2','2023-12-07 01:14:26.817205','Adalberto te amo mucho mucho','2023-12-07 01:14:26.817205',NULL,1,NULL,NULL),(47,'Dolores Delano','dolores@whew.com','$2b$10$ysrmhF5Zu6jTHwr2MZMFredTF7WkqUfv1L5P4nH5x7A6MWgod5JHe','2023-12-07 01:14:42.808432','Adalberto te amo mucho mucho','2023-12-07 01:14:42.808432',NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-07  1:27:41
