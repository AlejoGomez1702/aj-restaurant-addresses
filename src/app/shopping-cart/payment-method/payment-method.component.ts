import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

// Payments with Stripe.
import { Stripe } from '@ionic-native/stripe/ngx';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit 
{
  public card: boolean;
  public cash: boolean;

  // El pedido se puede pagar con tarjeta.
  public acceptCard: boolean;

  // Datos de la tarjeta con la que el cliente va pagar.
  cardDetails = {
    number: '4242424242424242',
    expMonth: 12,
    expYear: 2020,
    cvc: '220'
  }

  // public backCash: number;

  // Formulario pago con tarjeta(stripe).
  public paymentForm = new FormGroup({
    card_number: new FormControl(''),
    expiry_date: new FormControl(''),
    card_code: new FormControl(''),
  });

  // Formulario para pago en efectivo.
  public cashForm = new FormGroup({
    back_cash: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private firebaseService: FirebaseService,
    private stripe: Stripe,
    private router: Router,
    public alertController: AlertController,
  ) 
  { 
    // this.backCash = 0;
    this.card = false;
    this.cash = false;
    //         Si el dinero total del carrito (Subtotal + Tax) es mayor que...               ||
    //            ...el dinero minímo aceptado por el restaurante                            ||
    //                                                                                       ||
    //                                                                                       \/
    this.acceptCard = (this.shoppingCartService.subtotal + this.shoppingCartService.taxTotal) >  
                            (this.firebaseService.generalInformation.minimum_with_card)
  }

  ngOnInit() {}

  /**
   * Pagar el pedido con tarjeta (stripe).
   */
  payWithStripe() {
    this.stripe.setPublishableKey(environment.stripeKey);

    this.cardDetails = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
    }

    this.stripe.createCardToken(this.cardDetails)
      .then(token => {
        console.log(token);
        // this.makePayment(token.id);
      })
      .catch(error => console.error(error));
  }

  /**
   * Pagar el pedido en la entrega (efectivo).
   */
  payWithCash()
  {
    const refundMoney = this.cashForm.controls['back_cash'].value;
    this.shoppingCartService.saleInformation.refund_money = refundMoney;

    this.shoppingCartService.registerSale()
    .then(() => {
      this.presentSaleSuccesfull();   
      this.router.navigate(['tabs/tab1']);   
    }).catch((error) => {
      console.log(error);
    });
  }

  /**
   * Dialogo de compra realizada satisfactoriamente.
   */
  async presentSaleSuccesfull() 
  {
    // console.log('El producto a eliminar es: ');
    // console.log(this.cartList[index]);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Congratulations!',
      message: 'your order has been completed',

    });

    await alert.present();
  }


  showInfo()
  {
    console.log('Card ' + this.card);
    console.log('Cash ' + this.cash);
  }

  salir()
  {
    this.authService.logout().then((yes) => {
      this.router.navigate(['shopping-cart']);
    });
  }

}
