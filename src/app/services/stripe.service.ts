import { Injectable } from '@angular/core';
// import { Stripe } from '@ionic-native/stripe/ngx';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService 
{
  constructor(
    // private stripe: Stripe
  ) 
  { 
    // this.stripe.setPublishableKey(environment.stripeKey);
  }

  // createCardToken(card)
  // {
  //   this.stripe.createCardToken(card)
  //   .then(token => console.log(token.id))
  //   .catch(error => console.error(error));
  // }


}
