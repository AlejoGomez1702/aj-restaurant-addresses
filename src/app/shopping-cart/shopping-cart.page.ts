import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartList } from '../interfaces/CartList';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AlertController } from '@ionic/angular';

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
    private shoppingCartService: ShoppingCartService,
    public alertController: AlertController
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
   * Dialogo para eliminar un producto del carrito de compras.
   */
  async presentAlertConfirm(item: CartList, index: number) 
  {
    // console.log('El producto a eliminar es: ');
    // console.log(this.cartList[index]);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure to remove the product!',
      message: item.product.name + ' !!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.cartList.splice(index, 1);
            this.calculatePrices();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Redirige a la vista de autenticación de usuarios.
   */
  goToAuthUser()
  {
    this.router.navigate(['/auth']);
  }

  /**
   * Redirige atras al listado de productos.
   */
  goBack()
  {
    this.router.navigate(['/tabs/tab1']);
  }

}
