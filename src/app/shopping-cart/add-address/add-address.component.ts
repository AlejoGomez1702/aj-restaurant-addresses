import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Street } from 'src/app/interfaces/Street';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit 
{
  // Formulario con los datos para registrar una nueva dirección.
  public addressForm = new FormGroup({
    street: new FormControl(''),
    street_optional: new FormControl('')
  });

  constructor(
    private fbService: FirebaseService
  ) 
  { }

  ngOnInit() 
  {}

  /**
   * Registra una nueva dirección al usuario logueado.
   */
  registerAddress()
  {
    const form = <Street>this.addressForm.value;

    return this.fbService.addAddress(form);
  }

}
