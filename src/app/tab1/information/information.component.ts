import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageFirebaseService } from '../../services/storage-firebase.service'; 
import { Image } from '../../interfaces/Image';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit 
{
  // Imagenes de los medios de pago disponibles.
  public paymentsImages: string[];

  constructor(
    private router: Router,
    private storageFirebase: StorageFirebaseService
  ) 
  {
    this.paymentsImages = this.storageFirebase.paymentsImages;
    console.log(this.storageFirebase.paymentsImages);
  }

  ngOnInit() 
  {
    
  }

  /**
   * Regresa a la página de listado de productos.
   */
  goBack()
  {
    this.router.navigate(['/tabs/tab1'])
  }

}