import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit 
{
  public card: boolean;
  public cash: boolean;

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
    private router: Router
  ) 
  { 
    // this.backCash = 0;
    this.card = false;
    this.cash = false;
  }

  ngOnInit() {}

  /**
   * Pagar el pedido con tarjeta (stripe).
   */
  payWithCard()
  {
    
  }

  /**
   * Pagar el pedido en la entrega (efectivo).
   */
  payWithCash()
  {
    
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
