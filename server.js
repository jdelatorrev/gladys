const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'productosdb'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// API de búsqueda
app.get('/api/productos', (req, res) => {
  const busqueda = req.query.busqueda || '';
  const estadoFiltro = req.query.estado || '';

  let sql = `SELECT * FROM productos WHERE 
               (id LIKE ? OR 
               descripcion LIKE ? OR 
               color LIKE ? OR
               cliente LIKE ?)`;
  let params = [`%${busqueda}%`, `%${busqueda}%`, `%${busqueda}%`, `%${busqueda}%`];

  if (estadoFiltro) {
    sql += ` AND estado = ?`;
    params.push(estadoFiltro);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// API actualizar producto
app.put('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  const { estado, cliente } = req.body;

  const sql = `UPDATE productos SET estado = ?, cliente = ? WHERE id = ?`;
  db.query(sql, [estado, cliente, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Producto actualizado' });
  });
});

// Servir el frontend para cualquier otra ruta
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
