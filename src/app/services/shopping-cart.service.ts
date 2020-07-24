import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService 
{
  public tempProduct: Product;

  constructor(
    private router: Router
  ) 
  { }

  addProductToCart(product: Product)
  {
    this.tempProduct = product;
    this.router.navigate(['/tabs/tab1/addProduct'])
  }


}
