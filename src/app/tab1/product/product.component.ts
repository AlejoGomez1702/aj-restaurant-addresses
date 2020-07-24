import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit 
{
  // Tipo de producto
  // 1 ==> Producto sin opciones ni tamaños ni sabores.
  public productType: number; 

  // Producto que se esta comprando.
  public product: Product;

  // Lleva la cuenta de la cantidad de producto.
  public productQuantity: number;

  // Indica si se puede o no agregar al carrito (todas las opciones seleccionadas).
  public isFull: boolean;

  // Valor de agregar el producto al carrito
  public total: number;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) 
  { 
    this.product = this.shoppingCartService.tempProduct;
    this.productType = this.getProductType();
    this.productQuantity = 1;
  }

  ngOnInit() {}

  /**
   * Aumenta o disminuye la cantidad de producto que se va comprar.
   * @param plus True => Aumenta, False => Disminuye.
   */
  plusQuantity(plus: boolean)
  {
    if(plus)
    {
      this.productQuantity ++;      
    }
    else
    {
      if(this.productQuantity != 1)
      {
        this.productQuantity --;
      }
    }

    this.processProduct(this.productType, true);
  }

  /**
   * Indica que tipo de producto se quiere procesar.
   * 1 ==> Producto sin opciones ni tamaños ni sabores.
   */
  getProductType(): number
  {
    // 1 Producto sin opciones ni tamaños ni sabores.
    const type1 = !this.product.options && !this.product.size && !this.product.flavors;
    if(type1)
    {
      this.total = this.product.price;
      this.isFull = true;
      return 1;
    }
  }

  /**
   * Lógica cuando un producto no tiene opciones.
   * @param type 
   * @param isPlus Sumar o restar
   */
  processProduct(type: number, isPlus: boolean)
  {
    if(type == 1) //sin opciones, tamaño ni sabor.
    {
      this.total = this.product.price * this.productQuantity;
    }
  }

  addToShoppingCart()
  {
    this.shoppingCartService.addProduct(this.product, this.productQuantity);
    this.goBack();
  }

  /**
   * Redirige atras al listado de productos.
   */
  goBack()
  {
    this.router.navigate(['/tabs/tab1']);
  }

}
