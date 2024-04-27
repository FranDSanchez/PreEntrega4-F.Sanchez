import express, { response } from "express";
import productManager from "./src/data/fs/productManager2.js";
import router from "./src/routes/index.js";
import cartsManager from "./src/data/fs/cartsManager.js";
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
