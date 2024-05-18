import { Router, response } from "express";
import productManager from "../dao/fsManagers/productManager2.js";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();

//Agrego Productos
router.post("/", addProduct);

//Muestro todos los Productos
router.get("/", getProducts);

//ruta GET para buscar producto por ID
router.get("/:pid", getProductById);

//Ruta PUT para actualizar un producto pasando por parametro ID
router.put("/:pid", updateProductById);

//Ruta DELETE para eliminar producto pasando parametro por ID
router.delete("/:pid", deleteProduct);

//Funcion Agrego Productos
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
    const newProduct = await productDao.create(product);
    return res.json({
      status: 201,
      payload: newProduct || "Productos Creados con exito",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "Error",
    });
  }
}

//Funcion Muestro los productos
async function getProducts(req, res) {
  try {
    // const { limit } = req.query; //realizo una consulta,
    const products = await productDao.getAll(); //se muestra todos los productos hasta al ID pasado por parametro
    if (products) {
      return res.json({ status: "sucess", payload: products });
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

//Funcion Muestro por ID productos
async function getProductById(req, res) {
  try {
    const { pid } = req.params;
    const productId = await productDao.getById(pid);

    //Valido si existe el ID
    if (productId) {
      return res.json({ status: 200, payload: productId });
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

//Funcion para actualizar un producto pasando por parametro ID
async function updateProductById(req, res) {
  try {
    const { pid } = req.params;
    const productData = req.body;

    const updateProduct = await productDao.update(pid, productData);
    if (updateProduct) {
      return res.json({ status: "sucess", payload: updateProduct });
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

//Funcion para eliminar producto pasando parametro por ID
async function deleteProduct(req, res) {
  try {
    const { pid } = req.params;

    const deleteProduct = await productDao.deleteOne(pid);
    if (!deleteProduct) {
      const error = new Error(`El producto con ID:| ${pid} | no existe`);
      error.status = 404;
      throw error;
    }

    return res.json({
      status: 200,
      message: `Producto con ID ${pid} ha sido eliminado`,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "Error",
    });
  }
}
export default router;
