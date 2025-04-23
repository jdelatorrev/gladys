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
