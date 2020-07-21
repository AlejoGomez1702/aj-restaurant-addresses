import { Component, OnInit } from '@angular/core';
// import * as firebase from 'firebase';
// import { environment } from '../../environments/environment';
import { Product } from '../interfaces/Product'; 
import { Image } from '../interfaces/Image';
import { Router } from '@angular/router';
import { StorageFirebaseService } from '../services/storage-firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit
{
  public firstHeader: boolean;
  // public storageUrl: String;
  // public coverPage: Image;
  public coverPageURL: String;
  public products: Product[] = [];

  // Categorias del "MENU"
  public categoriesMenu: string[] = [];
  // Categorias de "BEBIDAS"
  public categoriesDrinks: string[] = [];  

  constructor(
    private router: Router,
    private storageFirebase: StorageFirebaseService
  ) 
  {
    this.firstHeader = true;    
  }

  ngOnInit()
  {
    this.initInformation();
  }

  /**
   * Inicializar toda la información necesaria.
   */
  initInformation()
  {
    this.categoriesMenu = this.storageFirebase.categoriesMenu;
    this.categoriesDrinks = this.storageFirebase.categoriesDrinks;
    // console.log('en el componente lo estoy buscando');
    this.coverPageURL = this.storageFirebase.coverPageURL;
    // console.log('Se esta llamandoo el componente');
    // console.log(this.storageFirebase.coverPageURL);
    // console.log(this.coverPage);
    this.products = this.storageFirebase.products;
    // this.coverPage = {
    //   full: '',
    //   name: '',
    //   url: ''
    // };

  }

  /**
   * Se acciona cuando queremos ir a la página de información del restaurante
   * @param $event 
   */
  startInformationPage()
  {
    this.router.navigate(['/tabs/tab1/information'])
  }

  // ********EVENTS********EVENTS********EVENTS********EVENTS********EVENTS**********//

  /**
   * Evento al cambiar entre categorias de productos.
   * @param $event 
   */
  segmentChanged($event:Event)
  {
    console.log('jajajja');
  }

  /**
   * Indica si se muestra la barra inicial o la barra de categorias de productos.
   * @param $event 
   */
  verifyTopBar($event:Event)
  {
    // 300 pixeles se cambia el toolbar principal
    const pointForChange = 300;
    const valueScroll = (<CustomEvent>$event).detail.scrollTop;

    // Condición (If ternario)
    (valueScroll >= pointForChange) ? this.firstHeader = false : this.firstHeader = true;
  }

}
