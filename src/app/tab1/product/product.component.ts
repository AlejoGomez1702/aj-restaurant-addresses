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
  // Producto que se esta comprando.
  public product: Product;

  // Lleva la cuenta de la cantidad de producto.
  public productQuantity: number;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) 
  { 
    this.productQuantity = 1;
    this.product = this.shoppingCartService.tempProduct;
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
  }

  /**
   * Redirige atras al listado de productos.
   */
  goBack()
  {
    this.router.navigate(['/tabs/tab1'])
  }

}
