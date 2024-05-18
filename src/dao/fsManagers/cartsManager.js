import { json } from "express";
import fs from "fs";

const pathFile = "./src/dao/fsManagers/carts.json";
//Clase Manager de Carrito
class CartsManager {
  constructor() {
    this.carts = [];
  }
  //Muestro Carritos
  async getCarts() {
    const cartsJson = await fs.promises.readFile(pathFile, "utf8");
    this.carts = JSON.parse(cartsJson) || [];

    return this.carts;
  }
  //Creo un carrito
  async createCarts() {
    const id = this.carts.length + 1;
    const newCarts = {
      id,
      products: [],
    };
    this.carts.push(newCarts); //Pusheo al array los productos

    await fs.promises.writeFile(pathFile, JSON.stringify(this.carts));
    return this.carts;
  }
  //Muestro Carrito por Id
  async getCartsById(cid) {
    await this.getCarts();
    const IdExists = this.carts.filter((cartID) => cartID.id === cid);
    if (IdExists) {
      return this.carts[cid - 1].products;
    } else {
      console.log(`No existe este ID del carrito: |${cid} |`);
    }
  }
  //Busco por ID el Carrito, y agrego los productos pasados por parametro
  async addProductCart(cid, pid) {
    await this.getCarts();
    const indexCart = this.carts.findIndex((cart) => cart.id === parseInt(cid)); //Busco el id Carrito
    if (indexCart !== -1) {
      const cart = this.carts[indexCart];

      //Busco el producto por su ID
      const productExist = cart.products.findIndex(
        (p) => p.product === parseInt(pid)
      );
      if (productExist !== -1) {
        //Si lo encuentra,agrego mas productos del mismo
        cart.products[productExist].quantity++;
      } else {
        //Si no, agrego ese nuevo producto
        cart.products.push({
          product: parseInt(pid),
          quantity: 1,
        });
      }
      await fs.promises.writeFile(pathFile, JSON.stringify(this.carts));
      return cart;
    }
    console.log(`No existe este ID del carrito: | ${cid} |`);
    return this.carts;
  }
}

const cartsManager = new CartsManager();
export default cartsManager;
