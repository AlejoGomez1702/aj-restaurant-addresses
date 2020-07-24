import { Component, OnInit } from '@angular/core';
import { ProductsList } from '../interfaces/ProductsList';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Product } from '../interfaces/Product';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit
{
  public firstHeader: boolean;
  public coverPageURL: String;
  // Productos ofertados en el negocio.
  public products: ProductsList[] = [];

  // Valor del toolbar de productos (va cambiando a medida que cambia la categoria).
  public category: string = 'ANTOJITOS';

  constructor
  (
    private router: Router,
    @Inject(DOCUMENT) document,
    private firebaseService: FirebaseService
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
    this.coverPageURL = this.firebaseService.coverPageURL;
    this.products = this.firebaseService.products;    
  }

  /**
   * Prepara la vista para agregar un producto al carrito.
   * @param productInfo 
   */
  addToCart(productInfo: Product)
  {
    console.log(productInfo);
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

    this.changeSection(valueScroll);

    // Condición (If ternario)
    (valueScroll >= pointForChange) ? this.firstHeader = false : this.firstHeader = true;
  }

  /**
   * Mueve el toolbar dependiendo en que sección de categorias este parado el cliente.
   */
  changeSection(valueScroll: number)
  {
    for (let i = 0; i < this.products.length; i++) 
    {
      let section = this.products[i];

      let category = section.category;
      let topPx = document.getElementById(category).offsetTop;   
      
      // console.log('SCROLL====> El valor del scroll => ' + valueScroll);
      // console.log('TOPTOP====> El valor de topPx => ' + topPx);
      // console.log('La longitud de pr');

      if(valueScroll >= topPx)
      {
        this.category = this.products[i].category;
        //console.log('los pixeles que me saca son: ' + category + "  " + topPx);
        // return;
      }    
      // else
      // {
      //   // this.category = this.products[i+1].category;
      //   //console.log('ahora me saca es: ' + category + " " + topPx);
      // }
    }



    // for (let section of this.products) 
    // {
    //   let category = section.category;
    //   let topPx = document.getElementById(category).offsetTop;   
      
    //   console.log('El valor del scroll => ' + valueScroll);
    //   console.log('El valor de topPx => ' + topPx);

    //   if(valueScroll >= topPx)
    //   {
    //     this.category = category;
    //     console.log('los pixeles que me saca son: ' + category + "  " + topPx);
    //     // return;
    //   }    
    //   else
    //   {
    //     console.log('ahora me saca es: ' + category + " " + topPx);
    //   }

    //   break;
    // }
  }


}
