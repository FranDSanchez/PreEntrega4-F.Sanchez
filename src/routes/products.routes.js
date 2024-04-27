import { Router } from "express";
import productManager from "../data/fs/productManager2.js";

const router = Router();

router.post("/", addProduct);

router.get("/", getProducts);

//ruta GET para buscar producto por ID
router.get("/:pid", getProductById);

//Ruta PUT para actualizar un producto pasando por parametro ID
router.put("/:pid", updateProductById);

//Ruta DELETE para eliminar producto pasando parametro por ID
router.delete("/:pid", deleteProduct);

async function addProduct(req, res) {
  try {
    const product = {
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      status: req.body.status,
      stock: req.body.stock,
      category: req.body.category,
      thumbnail: req.body.thumbnail,
      status: req.body.status,
    };
    const newProduct = await productManager.addProduct(product);
    return res.json({
      status: 201,
      response: newProduct || "Productos Creados con exito",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "Error",
    });
  }
}

//Muestro los productos
async function getProducts(req, res) {
  try {
    const { limit } = req.query; //realizo una consulta,
    const products = await productManager.getProducts(limit); //se muestra todos los productos hasta al ID pasado por parametro
    if (products) {
      return res.json({ status: 200, response: products, limit });
    }
    const error = new Error(`Error al cargar`);
    error.status = 404;
    throw error;
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "Error al cargar",
    });
  }
}

//Muestro por ID productos
async function getProductById(req, res) {
  try {
    const { pid } = req.params;
    const productId = await productManager.getProductById(pid);

    //Valido si existe el ID
    if (productId) {
      return res.json({ status: 200, response: productId });
    }
    const error = new Error(`El producto con ID:| ${pid} | no existe`);
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

async function updateProductById(req, res) {
  try {
    const { pid } = req.params;
    const product = req.body;

    const updateProduct = await productManager.updateProduct(pid, product);
    if (updateProduct) {
      return res.json({ status: 201, response: updateProduct });
    }
    const error = new Error(`El producto con ID:| ${pid} | no existe`);
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

async function deleteProduct(req, res) {
  try {
    const { pid } = req.params;

    const deleteProduct = await productManager.deleteProduct(pid);
    if (deleteProduct) {
      return res.json({
        status: 201,
        message: `Producto con ID ${pid} ha sido eliminado`,
      });
    }
    const error = new Error(`El producto con ID:| ${pid} | no existe`);
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
export default router;
