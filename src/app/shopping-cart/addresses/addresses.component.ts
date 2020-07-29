import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserAuth } from 'src/app/interfaces/UserAuth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit
{
  // Usuario actualmente logueado.
  public user: UserAuth;

  // Dirección mapeada para saber cual se selecciona.
  public addresses: boolean[];

  // Indica si se selecciono una opción de dirección.
  public isAddressSelected: boolean;

  // Sirve para que la página se refresca con una nueva dirección.
  // mySubscription: any;

  constructor(
    private fbService: FirebaseService,
    private router: Router
  ) 
  {
    this.initInformation();
    this.fbService.componentMethodCalled$.subscribe(() => {
      this.initInformation();
    });
  }

  ngOnInit() 
  {
  }

  /**
   * Inicializa la información que necesita la vista.
   */
  initInformation()
  {
    this.isAddressSelected = false;
    this.fbService.getLoginUser().subscribe((user) => {
      this.user = user;
    });

    const numAddresses = this.user.addresses.length;
    this.addresses = [];
    for (let i = 0; i < numAddresses; i++) 
    {
      this.addresses[i] = false;
    }
  }


  /**
   * 
   * @param index 
   */
  verifyAddress(index: number): boolean
  {    
    console.log('Direcciones');
    console.log(this.addresses);
    let selected = false;
    for (const address of this.addresses) 
    {
      if(address)
      {
        selected = true;
        break;
      }
    }

    // Si no hay ningúno seleccionado, se selecciona como primero.
    if(!selected)
    {
      this.addresses[index] = true;
      this.isAddressSelected = true;
      return true;
    }    
    else if(selected && this.addresses[index]) // Si esta seleccionado lo voy a desseleccionar.
    {
      this.addresses[index] = false;
      this.isAddressSelected = false;
      return false;
    }
    else if(selected) // Si voy a seleccionar otra dirección a la ya seleccionada.
    {
      for (let i = 0; i < this.addresses.length; i++) 
      {
        const element = this.addresses[i];
        if(element)
        {
          this.addresses[i] = false;
          this.addresses[index] = true;
          return true;
        }
      }
    }

  }

  /**
   * Me dirige al componente para agregar una nueva dirección al usuario.
   */
  goToaddUserAddress()
  {
    this.router.navigate(['shopping-cart/add-address']);
  }

    /**
   * Me dirige al componente para realizar el pago del pedido.
   */
  goToPaymentUrl()
  {
    this.router.navigate(['shopping-cart/payment']);
  }

}
