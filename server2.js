const express = require('express');
const path = require('path');

const SqlService = require('./Modules/SQL/connection.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname))); // Sirve index.html y PartSql.js desde la raíz

/** SQL: Ejemplo de inserción **/
app.post('/example/sql', async (req, res) => {
  const { Nombre, Correo, Telefono, FechaRegistro } = req.body;
  const db = new SqlService();
  try {
    await db.connectToDb();
await db.query(
  "INSERT INTO clientes (Nombre, correo, Telefono, FechaRegistro) VALUES (?, ?, ?, ?)",
  [ Nombre, Correo, Telefono, FechaRegistro]
);
    res.status(200).send("User registered.");
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).send("Error registering user.");
  } finally {
    await db.closeConnection();
  }
});



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
