import mongoose from "mongoose";

const urlDb =
  "mongodb+srv://frandavid:44824319@e-commercecoder.rxomyr4.mongodb.net/ecommerce";

export const connectMongoDB = async () => {
  //Conectar con la base de datos
  try {
    mongoose.connect(urlDb);
    console.log("MongoDb Conectado correctamente");
  } catch (error) {
    console.log(error);
  }
};
