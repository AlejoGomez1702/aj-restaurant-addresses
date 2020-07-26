import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';
import { Router } from '@angular/router';
import { CartList } from '../interfaces/CartList';
import { OptionProduct } from '../interfaces/OptionProduct';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService 
{
  // Producto temporal para cuando se desea agregar.
  public tempProduct: Product;

  // Listado de productos en el carrito de compras.
  public cartList: CartList[] = [];


  constructor(
    private router: Router
  ) 
  { }

  /**
   * Añade un producto al carrito de compras.
   * @param product 
   * @param quantity 
   */
  addProduct(product: Product, quantity: number, options: OptionProduct, type: number)
  {
    const productToAdd = {
      quantity: quantity,
      product: product,
      options: options
    };

    const inCart = this.verifyProductInList(product, quantity, type, options);

    if(!inCart)
    {
      this.cartList.push(productToAdd);
    }

    console.log(this.cartList);
  }

  /**
   * Muestra la vista con el detalle del producto para agregar posteriormente.
   * @param product 
   */
  addProductToCart(product: Product)
  {
    this.tempProduct = product;
    this.router.navigate(['/tabs/tab1/addProduct'])
  }

  /**
   * Cantidad de productos en el carrito de compras.
   */
  sizeOfCart(): number
  {
    return this.cartList.length;
  }


  // *****************************LOGIC*****************************LOGIC*****************************//

  /**
   * Verifica si el producto ya esta o no en lista y de estarlo aumenta la cantidad solamente
   * @param product 
   * @param quantity 
   * @param type
   */
  private verifyProductInList(product: Product, quantity: number, type: number, options: OptionProduct): boolean
  {
    for (let i = 0; i < this.cartList.length; i++) 
    {
      const itemCart = this.cartList[i];
      if(itemCart.product.name == product.name)
      {
        if(type == 1)
        {
          this.cartList[i].quantity = itemCart.quantity + quantity;
          return true;
        }

        // Type 2 ==> Producto con sabores
        if(type == 2)
        {
          let flavorInCart = itemCart.options.flavor;
          if(flavorInCart == options.flavor)
          {
            this.cartList[i].quantity = itemCart.quantity + quantity;
            return true;
          }
          // else return false;
        }

        // Type 3 ==> Producto con tamaño
        if(type == 3)
        {
          let sizeInCart = itemCart.options.size.name;
          if(sizeInCart == options.size.name)
          {
            this.cartList[i].quantity = itemCart.quantity + quantity;
            return true;
          }
          // else return false;

        }

        // Type 4 ==> Producto con opciones
        if(type == 4)
        {
          let optionInCart = itemCart.options.option.name;
          if(optionInCart == options.option.name)
          {
            this.cartList[i].quantity = itemCart.quantity + quantity;
            return true;
          }
          // else return false;
        }

        // Type 5 ==> Producto con opciones y tamaño
        if(type == 5)
        {
          let optionInCart = itemCart.options.option.name;
          let sizeInCart = itemCart.options.size.name;
          if((optionInCart == options.option.name) && (sizeInCart == options.size.name))
          {
            this.cartList[i].quantity = itemCart.quantity + quantity;
            return true;
          }
          // else return false;
        }

      }      
    }

    return false;
  }


}
