const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3888;

app.use(cors());
app.use(express.json());

const initDB = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        precio DECIMAL(10,2),
        stock INT
      );
    `);
        console.log("Tabla 'productos' verificada/creada exitosamente");
    } catch (err) {
        console.error("Error creando tabla:", err);
    }
};
initDB();

// --- RUTAS ---
app.get('/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear producto 
app.post('/productos', async (req, res) => {
    const { nombre, precio, stock } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *',
            [nombre, precio, stock]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});