import express from "express";
import mongoose from "mongoose";
import routes from "../routes/routes.js";
import cors from 'cors';

const app = express();//Ejecutar express

mongoose.set('strictQuery', true)// evitar advertencias de mongoose

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://0.0.0.0:27017/inventario')
.then(() => {
    console.log('Se conectó correctemente a MongoDB');
})
.catch((err) => {
    console.error('Error al conectar la bd MongoDB', err);
});

//  Esto debe ir ANTES de tus rutas
app.use(cors({
    origin: 'http://localhost:3000' // solo permite peticiones desde el frontend
}));

// Permite que Express lea datos en formato JSON enviado en las peticiones
app.use(express.json());

app.use("/api", routes);



// app.get("/", (req, res) => {
//     res.send("API funcionando");
// });

//puerto
const port = 4000;
// variable, la q guarda tipo express
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    
});

