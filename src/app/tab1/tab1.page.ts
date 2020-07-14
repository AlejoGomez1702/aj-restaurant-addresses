import { Component, OnInit, HostListener } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/Product'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit
{
  public firstHeader: boolean;
  public storageUrl: String;
  public coverPage = {};
  public products: Product[] = [];

  // Categorias del "MENU"
  public categoriesMenu: string[] = [];
  // Categorias de "BEBIDAS"
  public categoriesDrinks: string[] = [];  

  constructor() 
  {
    this.firstHeader = true;
    firebase.initializeApp(environment.firebaseConfig);
    this.storageUrl = environment.storageUrl;    

    this.loadAllCategories();
  }

  ngOnInit()
  {
    this.loadCoverFile();
    this.loadAllProducts();
    // this.loadAllCategories();
  }

  /**
   * Obtiene el listado de todas las categorias de productos.
   */
  loadAllCategories()
  {
    this.categoriesMenu = [];
    this.categoriesDrinks = [];

    const db = firebase.firestore();
    db.collection('categories').get().then((categories) => {
        categories.forEach((category) => {
          // console.log(category.data().name);
          this.categoriesMenu.push(category.data().name);
        });
    });

    db.collection('categories_2').get().then((categories) => {
      categories.forEach((category) => {
        this.categoriesDrinks.push(category.data().name);
      });
    });

  }

  /**
   * Obtiene todos los productos almacenados en la base de datos.
   */
  loadAllProducts()
  {
    // Obteniendo el listado de hamburguesas
    const db = firebase.firestore();
    db.collection('hamburguers').get().then((hamburguers) => {
        hamburguers.forEach((hamburguer) => {
          this.products.push(<Product>hamburguer.data());
          // console.log(hamburguer.data());
        });
    });
  }

  /**
   * Obtiene la imagen de portada principal del restaurante. 
   */
  loadCoverFile() 
  {
    this.coverPage = {};
 
    const storageRef = firebase.storage().ref('cover-page');

    storageRef.listAll().then(result => {
      result.items.forEach(async ref => {
        this.coverPage = {
          name: ref.name,
          full: ref.fullPath,
          url: await ref.getDownloadURL(),
          ref: ref
        }
      });
    });
  }

  // ********EVENTS********EVENTS********EVENTS********EVENTS********EVENTS**********//

  segmentChanged($event:Event)
  {
    console.log('jajajja');
  }

  verifyTopBar()
  {
    let pixeles = window.scrollY;
    console.log(pixeles);
  }

}
