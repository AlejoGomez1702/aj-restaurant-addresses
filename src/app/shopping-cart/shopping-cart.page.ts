import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartList } from '../interfaces/CartList';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit 
{
  // Listado de productos en el carrito de compras.
  public cartList: CartList[] = [];

  // Subtotal de todos los productos
  public subtotal: number;

  // Tax total de todos los productos.
  public taxTotal: number;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) 
  {
    this.cartList = this.shoppingCartService.cartList;
    this.calculatePrices();
  }

  ngOnInit() {
  }

  /**
   * Calcula el subtotal y el tax de la lista en el carrito de compras.
   */
  calculatePrices()
  {
    this.subtotal = 0;
    this.taxTotal = 0;

    for (let i = 0; i < this.cartList.length; i++) 
    {
      const element = this.cartList[i];
      this.subtotal += element.price_total;
      this.taxTotal += element.total_tax;      
    }
  }

  /**
   * Redirige atras al listado de productos.
   */
  goBack()
  {
    this.router.navigate(['/tabs/tab1']);
  }

}
