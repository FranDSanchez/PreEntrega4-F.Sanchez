import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

//

const getAll = async () => {
  const cart = cartModel.find(); //Muestro todos los Carritos
  return cart;
};

const getById = async (id) => {
  const cart = await cartModel.findById(id); //Busco carrito por ID
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data); //Creo un nuevo carrito
  return cart;
};

const addProductToCart = async (cid, pid) => {
  //Busco producto por ID para agregar al Carrito
  const product = await productModel.findById(pid);
  if (!product)
    return {
      product: false,
    };

  await cartModel.findByIdAndUpdate(cid, { $push: { products: product } }); //push al array

  const cart = await cartModel.findById(cid);
  if (!cart)
    return {
      cart: false,
    };
  return cart;
};

export default {
  getAll,
  getById,
  create,
  addProductToCart,
};
