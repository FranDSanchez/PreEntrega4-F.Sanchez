import { Router, json, response } from "express";
import cartsManager from "../dao/fsManagers/cartsManager.js";
import cartsDao from "../dao/mongoDao/carts.dao.js";
import productDao from "../dao/mongoDao/product.dao.js";
const router = Router();

router.post("/", createCarts); //Creo carrito
router.get("/", getCarts); //Muestro Carrito
router.get("/:cid", getCartsById); //Muestro Carrito por ID
router.post("/:cid/product/:pid", addProductCart); //Agrego Producto a un Carrito por ID

async function createCarts(req, res) {
  try {
    const cart = await cartsDao.create();

    return res.json({ status: 201, payload: cart });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "Error",
    });
  }
}

async function getCarts(req, res) {
  try {
    const carts = await cartsDao.getAll();

    return res.json({ status: 200, payload: carts });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "Error",
    });
  }
}

async function getCartsById(req, res) {
  try {
    const { cid } = req.params;
    const cartsById = await cartsDao.getById(cid);

    if (cartsById) {
      return res.json({ status: 200, payload: cartsById });
    }
    const error = new Error(`El carrito con ID:| ${cid} | no existe`);
    error.status = 404;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "Error",
    });
  }
}

async function addProductCart(req, res) {
  try {
    const { cid, pid } = req.params;
    const cart = await cartsDao.addProductToCart(cid, pid);
    console.log(cart.cart);
    console.log(cart.product);
    if (cart.product == false)
      return res.json({
        status: "Error 404",
        response: `El producto con ID:| ${pid} | no existe`,
      });
    if (cart.cart == false)
      return res.json({
        status: "Error 404",
        response: `El carrito con ID:| ${cid} | no existe`,
      });

    return res.json({ status: "success:200", payload: cart });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "Error",
    });
  }
}

export default router;
