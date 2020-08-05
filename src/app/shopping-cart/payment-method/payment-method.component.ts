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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit 
{
  public card: boolean;
  public cash: boolean;

  public isCorrectAmmount: boolean;

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
    private http: HttpClient,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private firebaseService: FirebaseService,
    private stripe: Stripe,
    private router: Router,
    public alertController: AlertController,
  ) 
  { 
    this.isCorrectAmmount = false;
    this.card = false;
    this.cash = false;
    //         Si el dinero total del carrito (Subtotal + Tax) es mayor que...               ||
    //            ...el dinero minímo aceptado por el restaurante                            ||
    //                                                                                       ||
    //                                                                                       \/
    this.acceptCard = (this.shoppingCartService.subtotal + this.shoppingCartService.taxTotal) >  
                            (this.firebaseService.generalInformation.minimum_with_card)
  }

  ngOnInit() 
  {
    console.log('*********Lo que hay en el carrito de compras es:');
    console.log(this.shoppingCartService.cartList);
  }

  /**
   * Pagar el pedido con tarjeta (stripe).
   */
  payWithStripe() 
  {
    this.stripe.setPublishableKey(environment.stripeKey);

    const numberCard = this.paymentForm.get('card_number').value;
    const dateData = this.paymentForm.get('expiry_date').value;
    const correctDate = this.getMonthAndYearCard(dateData);
    const codeCvc = this.paymentForm.get('card_code').value;

    console.log('Number card');
    console.log(numberCard);
    console.log('Date Data');
    console.log(correctDate);
    console.log('Codigo CVC');
    console.log(codeCvc);

    //*************IMPORTANTE*************IMPORTANTE*************IMPORTANTE************* */
    /**
     * Información verdadera del usuario.
     */
    // this.cardDetails = {
    //   number: numberCard,
    //   expMonth: correctDate.month,
    //   expYear: correctDate.year,
    //   cvc: codeCvc
    // };

    /**
     * Información para realizar pruebas.
     */
    this.cardDetails = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
    };

    this.stripe.createCardToken(this.cardDetails)
      .then(token => {
        console.log(token);
        let ammount = this.shoppingCartService.subtotal + this.shoppingCartService.taxTotal;
        this.makePayment(token.id, ammount)
        .subscribe((data) => {
          console.log(data);
          this.shoppingCartService.refreshCart();
          this.presentSaleSuccesfull(); 
          this.router.navigate(['tabs/tab1']); 
        });
      })
      .catch(error => {
        console.log(error);
        this.router.navigate(['tabs/tab1']); 
      });
  }

  /**
   * Realiza un pago en stripe con el token creado posteriormente
   * a introducir los datos de la tarjeta.
   * @param token 
   * @param ammount
   */
  makePayment(token, ammount: number) 
  {
    console.log('MakePayment ===> Voy a llamar por post.');
    return this.http.post('https://us-central1-crud-ionic-c3d18.cloudfunctions.net/payWithStripe', {
      amount: ammount,
      currency: "usd",
      token: token.id
    });
  }

  /**
   * Pagar el pedido en la entrega (efectivo).
   */
  async payWithCash()
  {
    const refundMoney = this.cashForm.controls['back_cash'].value;
    this.shoppingCartService.saleInformation.refund_money = refundMoney;

    await this.shoppingCartService.registerSale()
    .then(() => {
      // this.shoppingCartService.refreshCart();    // ***********solucionar
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

  /**
   * Verifica que el monto introducido actualmente por el usuario 
   * sea mayor que el valor del pedido.
   */
  verifyAmmount()
  {
    const priceTotal =  this.shoppingCartService.subtotal + this.shoppingCartService.taxTotal;
    const priceUser = this.cashForm.controls['back_cash'].value;

    if(priceTotal <= priceUser)
    {
      this.isCorrectAmmount = true;
    }else{
      this.isCorrectAmmount = false;
    }
  }

  /**
   * Parsea la informacion del ion-datetime en un objeto entendible.
   * @param date 
   */
  getMonthAndYearCard(date: string): {month: number, year: number}
  {
    console.log('EL año que me llega es: ');
    console.log(date);
    let month = '';
    let year = '';

    for (let i = 0; i < date.length; i++) {
      const element = date.charAt[i];
      if(i < 4)
      {
        year += date.charAt[i];
      }else if(i < 7 && i != 4)
      {
        month += date.charAt[i];        
      }else{
        break;
      }      
    }

    let expireMonth: number = +month;
    let expireYear: number = +year;

    return {month: expireMonth, year: expireYear};
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
