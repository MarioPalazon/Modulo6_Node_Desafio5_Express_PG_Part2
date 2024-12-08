const express = require('express')
const app = express();

//Habilitar CORS
const cors = require('cors');

//Middleware
app.use(express.json());
app.use(cors());

//Importar las rutas desde carpeta routes
const postsRoutes=require('./routes/postsRoutes.js');

//Configuraciones Rutas
app.use('/posts',postsRoutes);

//Instanciando servidor
app.listen(
    3000, 
    console.log("¡Servidor encendido!")
);

