import { Component } from '@angular/core';
import { StripeService } from '../services/stripe.service';

// Payments with Stripe.
import { Stripe } from '@ionic-native/stripe/ngx';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page 
{
  cardDetails = {
    number: '4242424242424242',
    expMonth: 12,
    expYear: 2020,
    cvc: '220'
  }

  constructor(
    private stripe: Stripe,
    private http: HttpClient
  ) 
  {}

  payWithStripe() {
    console.log('TokenInfo ===> generando el token');
    this.stripe.setPublishableKey(environment.stripeKey);

    this.stripe.createCardToken(this.cardDetails)
      .then(token => {
        this.makePayment(token);
        
        console.log(token);
        // this.makePayment(token.id);
      })
      .catch(error => console.error(error));
  }

  makePayment(token) 
  {
    console.log('MakePayment ===> Voy a llamar por post.');
    this.http.post('https://us-central1-crud-ionic-c3d18.cloudfunctions.net/payWithStripe', {
      amount: 100,
      currency: "usd",
      token: token.id
    }).subscribe(data => {
      console.log(data);
    });
  }

}
