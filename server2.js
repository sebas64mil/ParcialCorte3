const express = require('express');
const path = require('path');
const FirestoreService = require('./Modules/NoSQL/firestore_service.js');
const FirestoreQuery = require('./Modules/NoSQL/firestore_query.js');
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

/** Firestore **/
app.post('/example/firestore', async (req, res) => {
  const { id, ...data } = req.body;
  const firestore = new FirestoreService('users');

  try {
    await firestore.postDocument(id, data);
    res.status(200).send("Document added to Firestore.");
  } catch (err) {
    console.error("Firestore error:", err);
    res.status(500).send("Error adding document.");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
