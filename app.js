import express, { response } from "express";
import productManager from "./src/dao/fsManagers/productManager2.js";
import router from "./src/routes/index.js";
import cartsManager from "./src/dao/fsManagers/cartsManager.js";
import { connectMongoDB } from "./src/config/mongoDb.config.js";

//Conexion con la base de datos
connectMongoDB();

//para crear una aplicacion/servidor de express
const app = express();
//para inicializar la app de rexpress necesito configurar:
const port = 8080;
const ready = console.log("server ready on port: " + port);

//para inicilizar el servidor
app.listen(port, ready);
app.use(express.json());

//para configurar el servidor con determinadas funcionalidades
app.use(express.urlencoded({ extended: true })); //para leer queys y params

//para configurar solicitudes/peticiones

app.use("/api", router);

export default app;
