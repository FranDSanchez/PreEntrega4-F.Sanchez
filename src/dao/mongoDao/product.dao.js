import { productModel } from "../models/product.model.js";
//

const getAll = async () => {
  const product = await productModel.find(); //Busco Todos los productos
  return product;
};

const getById = async (id) => {
  const product = await productModel.findById(id); //Busco por ID
  return product;
};

const create = async (data) => {
  const product = await productModel.create(data); //Creo un nuevo producto
  return product;
};
const update = async (id, data) => {
  //Actualizo producto pasando por parametro el id y el campo a a actulizar
  await productModel.findByIdAndUpdate(id, data);
  const product = await productModel.findById(id);
  return product;
};
const deleteOne = async (id) => {
  //Elimino un producto pasando el ID por parametro
  const product = await productModel.deleteOne({ _id: id });
  if (product.deletedCount === 0) return false;
  return true;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};
