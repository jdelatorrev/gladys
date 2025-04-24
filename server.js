const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Railway config
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const sqlImport = `
DROP TABLE IF EXISTS productos;

CREATE TABLE productos (
   id           INTEGER  NOT NULL PRIMARY KEY,
   descripcion  VARCHAR(100) NOT NULL,
   color        VARCHAR(100),
   costo        NUMERIC(6,2) NOT NULL,
   cliente      VARCHAR(100),
   precio_final NUMERIC(6,2) NOT NULL,
   estado       VARCHAR(20) NOT NULL
);

INSERT INTO productos(id, descripcion, color, costo, cliente, precio_final, estado) VALUES 
(1, 'CONJUNTO FRIDA', NULL, 258.00, NULL, 300.00, 'disponible'),
(2, 'CONJUNTO NIÑO', NULL, 239.00, NULL, 300.00, 'disponible'),
(3, 'PANTALONES LINO VESTIR', NULL, 219.00, NULL, 450.00, 'disponible'),
(4, 'VESTIDO MEZCLILLA', NULL, 349.00, NULL, 600.00, 'disponible'),
(5, 'BLUSAS LINO RAYAS', NULL, 225.00, NULL, 380.00, 'disponible'),
(6, 'VESTIDO MEZCLILLA', 'OBSCURO', 260.00, NULL, 500.00, 'disponible'),
(7, 'FALDA MEZCLILLA CINTO BLANCO', NULL, 359.00, NULL, 550.00, 'disponible'),
(8, 'CONJUNTO FALDA', 'AMARILLA', 389.00, NULL, 600.00, 'disponible'),
(9, 'CONJUNTO CHALECO RAYAS', NULL, 199.00, NULL, 500.00, 'disponible'),
(10, 'BLUSAS DE PIEDRAS Y PERLAS', 'BLANCA, NEGRA, BEIGE', 169.00, NULL, 330.00, 'disponible'),
(11, 'VESTIDO CORTO', 'ROSA CON HOJAS', 349.00, NULL, 550.00, 'disponible'),
(12, 'PANTALON DE MEZCLILLA CON RESORTE', 'OBSCURO', 239.00, NULL, 450.00, 'disponible'),
(13, 'CONJUNTO PANTALON CHALECO', 'BEIGE', 349.00, NULL, 650.00, 'disponible'),
(14, 'BLUSA DE VESTIR CON COLLAR', 'CREMA', 240.00, NULL, 380.00, 'disponible'),
(15, 'VESTIDO TIPO CAMISERO', 'BEIGE', 319.00, NULL, 500.00, 'disponible'),
(16, 'CONJUNTO CON MOÑOS', 'ROSA', 325.00, NULL, 650.00, 'disponible'),
(17, 'BLUSA ESTAMPADA MULTI COLOR', 'AMARILLA Y ROJA', 159.00, NULL, 280.00, 'disponible'),
(18, 'BLUSA DE PIEDRAS', 'BEIGE BLANCA Y NEGRO', 179.00, NULL, 350.00, 'disponible'),
(19, 'BLUSA DE CAMISETA (DIOR CON PIEDRAS)', 'AMARILLA Y NEGRA', 189.00, NULL, 330.00, 'disponible'),
(20, 'BLUSACDE HOJAS', 'NARANJA', 259.00, NULL, 380.00, 'disponible'),
(21, 'BLUSA CAMISERA ELEGANTE', 'AMARILLA', 429.00, NULL, 860.00, 'disponible'),
(22, 'CONJUNTO SHORTS', 'BLANCO', 239.00, NULL, 480.00, 'disponible'),
(23, 'BLUSAS VESTIR', 'ROSA Y BLANCA CON AZUL', 229.00, NULL, 380.00, 'disponible'),
(24, 'VESTIDO OLANES', 'VERDE', 259.00, NULL, 550.00, 'disponible'),
(25, 'VESTIDO FLORES', 'ROSA', 279.00, NULL, 500.00, 'disponible'),
(26, 'BLUSA CON BESO', 'VERDE', 159.00, NULL, 330.00, 'disponible'),
(27, 'BLUSA CAMISERA', 'BEIGE Y AZUL', 189.00, NULL, 350.00, 'disponible'),
(28, 'VESTIDO', 'CAFÉ CLARO', 290.00, NULL, 500.00, 'disponible'),
(29, 'VESTIDO MANCHAS', 'AZUL BLANCO', 290.00, NULL, 500.00, 'disponible'),
(30, 'VESTIDO HOJAS', 'VERDE', 280.00, NULL, 450.00, 'disponible'),
(31, 'BLUSA CAMISERA', 'VERDE ROSA Y BLANCA', 100.00, NULL, 280.00, 'disponible'),
(32, 'BLUSA BORDADO MANGA', 'LILA Y BLANCA', 100.00, NULL, 380.00, 'disponible'),
(33, 'BLUSA CAMISETA', 'NEGRO, VERDE, AZUL', 100.00, NULL, 280.00, 'disponible'),
(34, 'VESTIDO PLISADO', 'ROSA, CAFÉ', 199.00, NULL, 450.00, 'disponible'),
(35, 'BLUSA FLORES', 'AZUL CLARO AZUL REY', 75.00, NULL, 250.00, 'disponible'),
(36, 'VESTIDO BOTONES LARGO', 'VERDE ROSA', 159.00, NULL, 430.00, 'disponible'),
(37, 'BLUSA PERLA', 'VERDE', 149.00, NULL, 380.00, 'disponible'),
(38, 'BLUSA CAMISETA', '2 BLANCAS, 2 NEGRAS Y AMARILLA', 160.00, NULL, 350.00, 'disponible'),
(39, 'OVERALL MEZCLILLA', NULL, 299.00, NULL, 600.00, 'disponible'),
(40, 'VESTIDO MEZCLILLA', NULL, 359.00, NULL, 550.00, 'disponible'),
(41, 'VESTIDO MEZCLILLA', NULL, 299.00, NULL, 550.00, 'disponible'),
(42, 'CONJUNTO CON PIEDRAS', 'BLANCO', 199.00, NULL, 380.00, 'disponible'),
(43, 'PANTALON', 'LADRILLO', 100.00, NULL, 350.00, 'disponible'),
(44, 'PANTALON', 'ROSA PALO', 100.00, NULL, 350.00, 'disponible'),
(45, 'BLUSA CAMISERA', 'AZUL Y NARANJA', 100.00, NULL, 300.00, 'disponible'),
(46, 'VESTIDOS', 'MORADOS', 100.00, NULL, 250.00, 'disponible'),
(47, 'BLUSA CAMISERA', '3 ROSAS, GRIS, BLANCA, 3 NEGRAS, BEIGE', 140.00, NULL, 350.00, 'disponible'),
(48, 'PANTALON FLOR', 'CAFÉ ROSA NEGRO', 199.00, NULL, 480.00, 'disponible'),
(49, 'CONJUNTO CHALECO CON LINEAS', 'BEIGE', 250.00, NULL, 650.00, 'disponible'),
(50, 'CONJUNTO CHALECO', 'NEGRO CON BEIGE', 250.00, NULL, 650.00, 'disponible'),
(51, 'PANTALON', 'VERDE MILITAR', 199.00, NULL, 400.00, 'disponible'),
(52, 'VESTIDO FLORES', 'BLANCO', 239.00, NULL, 430.00, 'disponible'),
(53, 'VESTIDO PALMERAS', 'BLANCO', 199.00, NULL, 430.00, 'disponible'),
(54, 'VESTIDO PLISADO MARIPOSAS', 'BLANCO', 199.00, NULL, 380.00, 'disponible'),
(55, 'PANTALON', 'GRIS', 199.00, NULL, 450.00, 'disponible'),
(56, 'PANTALON MEZCLILLA CARGO', NULL, 200.00, NULL, 490.00, 'disponible'),
(57, 'BLUSA TIPICA', 'BLANCO', 159.00, NULL, 350.00, 'disponible'),
(58, 'VESTIDO HOJAS', 'NARANJA', 199.00, NULL, 430.00, 'disponible'),
(59, 'VESTIDO', 'VERDE CON BLANCO', 249.00, NULL, 480.00, 'disponible'),
(60, 'VESTIDO HOJAS Y FLORES LADRILLO', 'BLANCO', 199.00, NULL, 430.00, 'disponible'),
(61, 'BLUSA', 'ROSA PALO', 100.00, NULL, 350.00, 'disponible'),
(62, 'BLUSA REVERSIBLE', 'ROSA PALO', 139.00, NULL, 350.00, 'disponible'),
(63, 'PANTALON DE MEZCLILLA CON PIEDRAS', NULL, 260.00, NULL, 580.00, 'disponible'),
(64, 'PANTALON DE MEZCLILLA PIERNA ANCHA', NULL, 319.00, NULL, 550.00, 'disponible'),
(65, 'PANTALON DE MEZCLILLA PIERNA ANCHA', NULL, 310.00, NULL, 550.00, 'disponible'),
(66, 'CONJUNTO SHORTS CON MOÑOS', 'VERDE', 299.00, NULL, 550.00, 'disponible');
`;

// IMPORTACIÓN AUTOMÁTICA SOLO UNA VEZ
(async () => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM productos');
    if (parseInt(result.rows[0].count) === 0) {
      await pool.query(sqlImport);
      console.log("✔️ Datos importados exitosamente.");
    } else {
      console.log("✔️ Tabla ya contiene datos. No se importó.");
    }
  } catch (err) {
    console.error("❌ Error al importar datos:", err);
  }
})();


// API de búsqueda
app.get('/api/productos', async (req, res) => {
  const busqueda = req.query.busqueda || '';
  const estadoFiltro = req.query.estado || '';

  let sql = `SELECT * FROM productos WHERE 
               (CAST(id AS TEXT) ILIKE $1 OR 
               descripcion ILIKE $1 OR 
               color ILIKE $1 OR
               cliente ILIKE $1)`;
  let params = [`%${busqueda}%`];

  if (estadoFiltro) {
    sql += ` AND estado = $2`;
    params.push(estadoFiltro);
  }

  try {
    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API actualizar producto
app.put('/api/productos/:id', async (req, res) => {
  const id = req.params.id;
  const { estado, cliente } = req.body;

  const sql = `UPDATE productos SET estado = $1, cliente = $2 WHERE id = $3`;

  try {
    await pool.query(sql, [estado, cliente, id]);
    res.json({ message: 'Producto actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Ruta catch-all para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
