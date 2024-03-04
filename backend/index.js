const express = require('express');
const mssql = require('mssql');

const app = express();
const port = 3001;

// Configuración de la conexión a la base de datos MSSQL
const config = {
  user: 'tu_usuario',
  password: 'tu_contraseña',
  server: 'tu_servidor.database.windows.net',
  database: 'tu_base_de_datos',
  options: {
    encrypt: true   // Habilita la encriptación
  }
};

// Rutas
app.get('/tasks', async (req, res) => {
  try {
    await mssql.connect(config);
    const result = await mssql.query`SELECT * FROM Tasks`;
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las tareas');
  } finally {
    mssql.close();
  }
});

// Puedes agregar rutas adicionales para CRUD operations

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
