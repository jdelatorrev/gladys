const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const sql = `
CREATE TABLE mytable(
   id           INTEGER  NOT NULL PRIMARY KEY 
  ,descripcion  VARCHAR(36) NOT NULL
  ,color        VARCHAR(38)
  ,costo        NUMERIC(6,2) NOT NULL
  ,cliente      VARCHAR(30)
  ,precio_final NUMERIC(6,2) NOT NULL
  ,estado       VARCHAR(10) NOT NULL
);
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (1,'CONJUNTO FRIDA',NULL,258.00,NULL,300.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (2,'CONJUNTO NIÑO',NULL,239.00,NULL,300.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (3,'PANTALONES LINO VESTIR',NULL,219.00,NULL,450.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (4,'VESTIDO MEZCLILLA',NULL,349.00,NULL,600.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (5,'BLUSAS LINO RAYAS',NULL,225.00,NULL,380.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (6,'VESTIDO MEZCLILLA','OBSCURO',260.00,NULL,500.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (7,'FALDA MEZCLILLA CINTO BLANCO',NULL,359.00,NULL,550.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (8,'CONJUNTO FALDA','AMARILLA',389.00,NULL,600.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (9,'CONJUNTO CHALECO RAYAS',NULL,199.00,NULL,500.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (10,'BLUSAS DE PIEDRAS Y PERLAS','BLANCA, NEGRA, BEIGE',169.00,NULL,330.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (11,'VESTIDO CORTO','ROSA CON HOJAS',349.00,NULL,550.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (12,'PANTALON DE MEZCLILLA CON RESORTE','OBSCURO',239.00,NULL,450.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (13,'CONJUNTO PANTALON CHALECO','BEIGE',349.00,NULL,650.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (14,'BLUSA DE VESTIR CON COLLAR','CREMA',240.00,NULL,380.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (15,'VESTIDO TIPO CAMISERO','BEIGE',319.00,NULL,500.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (16,'CONJUNTO CON MOÑOS','ROSA',325.00,NULL,650.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (17,'BLUSA ESTAMPADA MULTI COLOR','AMARILLA Y ROJA',159.00,NULL,280.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (18,'BLUSA DE PIEDRAS','BEIGE BLANCA Y NEGRO',179.00,NULL,350.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (19,'BLUSA DE CAMISETA (DIOR CON PIEDRAS)','AMARILLA Y NEGRA',189.00,NULL,330.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (20,'BLUSACDE HOJAS','NARANJA',259.00,NULL,380.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (21,'BLUSA CAMISERA ELEGANTE','AMARILLA',429.00,NULL,860.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (22,'CONJUNTO SHORTS','BLANCO',239.00,NULL,480.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (23,'BLUSAS VESTIR','ROSA Y BLANCA CON AZUL',229.00,NULL,380.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (24,'VESTIDO OLANES','VERDE',259.00,NULL,550.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (25,'VESTIDO FLORES','ROSA',279.00,NULL,500.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (26,'BLUSA CON BESO','VERDE',159.00,NULL,330.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (27,'BLUSA CAMISERA','BEIGE Y AZUL',189.00,NULL,350.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (28,'VESTIDO','CAFÉ CLARO',290.00,NULL,500.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (29,'VESTIDO MANCHAS','AZUL BLANCO',290.00,NULL,500.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (30,'VESTIDO HOJAS','VERDE',280.00,NULL,450.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (31,'BLUSA CAMISERA','VERDE ROSA Y BLANCA',100.00,NULL,280.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (32,'BLUSA BORDADO MANGA','LILA Y BLANCA',100.00,NULL,380.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (33,'BLUSA CAMISETA','NEGRO, VERDE, AZUL',100.00,NULL,280.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (34,'VESTIDO PLISADO','ROSA, CAFÉ',199.00,NULL,450.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (35,'BLUSA FLORES','AZUL CLARO AZUL REY',75.00,NULL,250.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (36,'VESTIDO BOTONES LARGO','VERDE ROSA',159.00,NULL,430.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (37,'BLUSA PERLA','VERDE',149.00,NULL,380.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (38,'BLUSA CAMISETA','2 BLANCAS, 2 NEGRAS Y AMARILLA',160.00,NULL,350.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (39,'OVERALL MEZCLILLA',NULL,299.00,NULL,600.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (40,'VESTIDO MEZCLILLA',NULL,359.00,NULL,550.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (41,'VESTIDO MEZCLILLA',NULL,299.00,NULL,550.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (42,'CONJUNTO CON PIEDRAS','BLANCO',199.00,NULL,380.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (43,'PANTALON','LADRILLO',100.00,NULL,350.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (44,'PANTALON','ROSA PALO',100.00,NULL,350.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (45,'BLUSA CAMISERA','AZUL Y NARANJA',100.00,NULL,300.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (46,'VESTIDOS','MORADOS',100.00,NULL,250.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (47,'BLUSA CAMISERA','3 ROSAS, GRIS, BLANCA, 3 NEGRAS, BEIGE',140.00,NULL,350.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (48,'PANTALON FLOR','CAFÉ ROSA NEGRO',199.00,NULL,480.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (49,'CONJUNTO CHALECO CON LINEAS','BEIGE',250.00,NULL,650.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (50,'CONJUNTO CHALECO','NEGRO CON BEIGE',250.00,NULL,650.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (51,'PANTALON','VERDE MILITAR',199.00,NULL,400.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (52,'VESTIDO FLORES','BLANCO',239.00,NULL,430.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (53,'VESTIDO PALMERAS','BLANCO',199.00,NULL,430.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (54,'VESTIDO PLISADO MARIPOSAS','BLANCO',199.00,NULL,380.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (55,'PANTALON','GRIS',199.00,NULL,450.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (56,'PANTALON MEZCLILLA CARGO',NULL,200.00,NULL,490.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (57,'BLUSA TIPICA','BLANCO',159.00,NULL,350.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (58,'VESTIDO HOJAS','NARANJA',199.00,NULL,430.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (59,'VESTIDO','VERDE CON BLANCO',249.00,NULL,480.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (60,'VESTIDO HOJAS Y FLORES LADRILLO','BLANCO',199.00,NULL,430.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (61,'BLUSA','ROSA PALO',100.00,NULL,350.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (62,'BLUSA REVERSIBLE','ROSA PALO',139.00,NULL,350.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (63,'PANTALON DE MEZCLILLA CON PIEDRAS',NULL,260.00,NULL,580.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (64,'PANTALON DE MEZCLILLA PIERNA ANCHA',NULL,319.00,NULL,550.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (65,'PANTALON DE MEZCLILLA PIERNA ANCHA',NULL,310.00,NULL,550.00,'disponible');
INSERT INTO mytable(id,descripcion,color,costo,cliente,precio_final,estado) VALUES (66,'CONJUNTO SHORTS CON MOÑOS','VERDE',299.00,NULL,550.00,'disponible');

`;

(async () => {
  try {
    await pool.query(sql);
    console.log("Datos importados exitosamente.");
    process.exit(0);
  } catch (err) {
    console.error("Error al importar datos:", err);
    process.exit(1);
  }
})();
