import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService 
{
  // Producto temporal para cuando se desea agregar.
  public tempProduct: Product;

  // Listado de productos en el carrito de compras.
  public cartList: {quantity: number, product: Product}[] = [];


  constructor(
    private router: Router
  ) 
  { }

  /**
   * Añade un producto al carrito de compras.
   * @param product 
   * @param quantity 
   */
  addProduct(product: Product, quantity: number)
  {
    const productToAdd = {
      quantity: quantity,
      product: product
    };

    this.cartList.push(productToAdd);
  }


  addProductToCart(product: Product)
  {
    this.tempProduct = product;
    this.router.navigate(['/tabs/tab1/addProduct'])
  }

  sizeOfCart(): number
  {
    return this.cartList.length;
  }


}
