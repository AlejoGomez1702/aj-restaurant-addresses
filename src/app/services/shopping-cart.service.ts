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
  // Subtotal de todos los productos
  public subtotal: number;

  // Tax total de todos los productos.
  public taxTotal: number;

  // Cupon de descuento si se ingreso por parte del usuario.
  public couponCode: string;

  // Producto temporal para cuando se desea agregar.
  public tempProduct: Product;

  // Listado de productos en el carrito de compras.
  public cartList: CartList[] = [];

  constructor(
    private router: Router
  ) 
  { 
    this.subtotal = 0;
    this.taxTotal = 0;
  }

  /**
   * Añade un producto al carrito de compras.
   * @param product 
   * @param quantity 
   */
  addProduct(product: Product, quantity: number, options: OptionProduct, type: number)
  {
    const productToAdd = {
      type: type,
      quantity: quantity,
      product: product,
      options: options
    };

    const inCart = this.verifyProductInList(product, quantity, type, options);

    if(!inCart)
    {
      this.cartList.push(productToAdd);
    }

    this.getTotalOfItems();
    this.calculatePrices();

    console.log('Carrito de compras');
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
   * 
   * @param index 
   */
  deleteProduct(index: number)
  {
    this.cartList.splice(index, 1);
    this.calculatePrices();
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

  /**
   * Obtiene el valor total de un item en el carrito de compras.
   */
  getTotalOfItems()
  {
    for (let i = 0; i < this.cartList.length; i++) 
    {
      const item = this.cartList[i];
      let tax = 0;
      let priceTotal = 0;

      // Tipo de producto
      //* 1 ==> Producto sin opciones ni tamaños ni sabores.
      //* 2 ==> Producto con sabores (flavors).
      //* 3 ==> Producto con tamaño (size).
      //* 4 ==> Producto con opciones (options).
      //* 5 ==> Producto con opciones y tamaños.
      switch (item.type) 
      {
        case 1:
          tax = item.product.tax * item.quantity;
          priceTotal = item.product.price * item.quantity; 
          this.cartList[i].total_tax = tax;
          this.cartList[i].price_total = priceTotal;
          break;

        case 2:
          tax = item.product.tax * item.quantity;
          priceTotal = item.product.price * item.quantity; 
          this.cartList[i].total_tax = tax;
          this.cartList[i].price_total = priceTotal;
          break;

        case 3:
          tax = item.options.size.tax * item.quantity;
          priceTotal = item.product.initial_price * item.quantity;
          this.cartList[i].total_tax = tax;
          this.cartList[i].price_total = priceTotal;
          break;

        case 4:          
          tax = (item.product.initial_price + item.options.option.additional_value) * item.quantity;
          tax = tax * item.product.tax;
          priceTotal = (item.product.initial_price + item.options.option.additional_value) * item.quantity;
          this.cartList[i].total_tax = tax;
          this.cartList[i].price_total = priceTotal;
          break;

        case 5:
          tax = (item.options.size.value + item.options.option.additional_value) * item.quantity;
          tax = tax * item.product.tax;
          priceTotal = (item.options.size.value + item.options.option.additional_value) * item.quantity;
          this.cartList[i].total_tax = tax;
          this.cartList[i].price_total = priceTotal;
          break;
      
        default:
          break;
      }
      
    }
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


}
