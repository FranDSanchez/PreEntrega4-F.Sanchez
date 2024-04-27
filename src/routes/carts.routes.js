import { Router, json, response } from "express";
import cartsManager from "../data/fs/cartsManager.js";

const router = Router();

router.post("/", createCarts);
router.get("/", getCarts);
router.get("/:cid", getCartsById);
router.post("/:cid/product/:pid", addProductCart);

async function createCarts(req, res) {
  try {
    const cart = await cartsManager.createCarts();

    return res.json({ status: 200, response: cart });
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
    const carts = await cartsManager.getCarts();

    return res.json({ status: 200, response: carts });
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
    const cartsById = await cartsManager.getCartsById(cid);

    if (cartsById) {
      return res.json({ status: 200, response: cartsById });
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
    const cart = await cartsManager.addProductCart(cid, pid);

    return res.json({ status: 201, response: cart });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "Error",
    });
  }
}

export default router;
