import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Product } from '../interfaces/Product'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageFirebaseService 
{
  // Imagen principal de la aplicación.
  // public coverPage: Image = {full: '', url: '', name: ''};
  public coverPageURL: String = 'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/cover-page%2Fcover-page.png?alt=media&token=3bb9535d-1251-4589-b1d3-fae866264c8c';

  // Categorias del "MENU"
  public categoriesMenu: string[] = [];
  // Categorias de "BEBIDAS"
  public categoriesDrinks: string[] = [];  

  // Productos que ofrece el restaurante
  public products: Product[] = [];

  // Imagenes de los medios de pago disponibles.
  public paymentsImages = [
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Famerican_express_card.svg?alt=media&token=ee6e9dc9-0f64-4928-8c58-a44e24f10ca6',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdinners-club_card.svg?alt=media&token=d4e72cab-cf89-43e6-aab1-2b1a53dc1d61',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdinners-club_card.svg?alt=media&token=d4e72cab-cf89-43e6-aab1-2b1a53dc1d61',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdinners-club_card.svg?alt=media&token=d4e72cab-cf89-43e6-aab1-2b1a53dc1d61',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdollar.svg?alt=media&token=dc3fd93f-dae2-4fd0-b82c-6311fa666bf0'
  ];

  constructor() 
  {
    firebase.initializeApp(environment.firebaseConfig);
    this.initInformation();
  }

  initInformation()
  {
    this.loadAllCategories();
    this.loadCoverFile();
    this.loadAllProducts();
    this.loadPaymentImages();
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
   * Obtiene la imagen de portada principal del restaurante. 
   */
  loadCoverFile()
  {
    const db = firebase.firestore();
    let coverRef = db.collection('images_urls').doc('cover');
    coverRef.get().then((doc) => {
      if (doc.exists) 
      {
        // console.log('en el servicio lo asigne');
        // console.log(doc.data().url);
        this.coverPageURL = doc.data().url;
        // console.log("Document data:", doc.data());
      } 
      else 
      {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    });
  }

  /**
   * Inicializa las urls que hacen referencia a las imagenes de medios de pago.
   */
  loadPaymentImages() 
  {
    this.paymentsImages = [];

    const db = firebase.firestore();
    db.collection('images_urls').get().then((imagesUrls) => {
        imagesUrls.forEach((imageUrl) => {
          if(imageUrl.data().name != 'cover')
          {
            this.paymentsImages.push(imageUrl.data().url);
          } 
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
}
