import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit 
{

  constructor(
    private authService: AuthService,
    private router: Router
  ) 
  { }

  ngOnInit() {}

  salir()
  {
    this.authService.logout().then((yes) => {
      this.router.navigate(['shopping-cart']);
    });
  }

}
