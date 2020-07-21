import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Product } from '../interfaces/Product'; 
import { ProductsList } from '../interfaces/ProductsList';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService 
{
  // Imagen principal de la aplicación.
  public coverPageURL: String = 'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/cover-page%2Fcover-page.png?alt=media&token=3bb9535d-1251-4589-b1d3-fae866264c8c';

  // Imagenes de los medios de pago disponibles.
  public paymentsImages = [
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Famerican_express_card.svg?alt=media&token=ee6e9dc9-0f64-4928-8c58-a44e24f10ca6',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdinners-club_card.svg?alt=media&token=d4e72cab-cf89-43e6-aab1-2b1a53dc1d61',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdinners-club_card.svg?alt=media&token=d4e72cab-cf89-43e6-aab1-2b1a53dc1d61',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdinners-club_card.svg?alt=media&token=d4e72cab-cf89-43e6-aab1-2b1a53dc1d61',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdollar.svg?alt=media&token=dc3fd93f-dae2-4fd0-b82c-6311fa666bf0'
  ];

  // Productos que se ofrecen en el restaurante.
  public products: ProductsList[] = [];

  // ***************************************************
  // Categorias del "MENU"
  public categoriesMenu: string[] = [];
  // Categorias de "BEBIDAS"
  public categoriesDrinks: string[] = [];  

  // Productos que ofrece el restaurante
  //public products: Product[] = [];

  // ***************************************************

  constructor() 
  {
    firebase.initializeApp(environment.firebaseConfig);
    this.initInformation();
  }

  initInformation()
  {
    // this.loadAllCategories();
    this.loadCoverFile();
    // this.loadAllProducts();
    this.loadPaymentImages();
    this.initAllProducts();
  }

  /**
   * Inicializa todos los productos que se ofertan en el negocio.
   */
  initAllProducts()
  {
    const db = firebase.firestore();

    // Estoy recorriendo todas las categorias de los productos.
    db.collection('categories').get().then((categories) => {
        categories.forEach((category) => {
          let categoryName = <string> category.data().name; // nombre para mostrar en la vista.
          let collectionName = <string> category.data().collection; // nombre de la colección de productos.

          if(collectionName) // si existe el atributo "collection" en la categoria del producto.
          {
            // Obteniendo el listado de productos correspondientes a la categoria.
            db.collection(collectionName).get().then((products) => {
              let categoryProducts = [];
              products.forEach((product) => {
                categoryProducts.push(<Product>product.data());
              });

              this.products.push({category: categoryName, products: categoryProducts});
            });
          }

        });
    });
  }

  /**
   * Obtiene el listado de todas las categorias de productos.
   */
  // loadAllCategories()
  // {
  //   this.categoriesMenu = [];
  //   this.categoriesDrinks = [];

  //   const db = firebase.firestore();
  //   db.collection('categories').get().then((categories) => {
  //       categories.forEach((category) => {
  //         // console.log(category.data().name);
  //         this.categoriesMenu.push(category.data().name);
  //       });
  //   });

  //   db.collection('categories_2').get().then((categories) => {
  //     categories.forEach((category) => {
  //       this.categoriesDrinks.push(category.data().name);
  //     });
  //   });
  // }

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
        this.coverPageURL = doc.data().url;
      } 
      else 
      {
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
  // loadAllProducts()
  // {
  //   const db = firebase.firestore();
  //   // Obteniendo el listado de "Antojitos (whims)".
  //   db.collection('whims').get().then((whims) => {
  //     let category = 'Antojitos'; // Si se modifica el restaurante o sección (modificar).
  //     let sectionToAdd = [];

  //     whims.forEach((whim) => {
  //       const productToAdd = {
  //         product: <Product>whim.data()
  //       };
  //       sectionToAdd.push(productToAdd);
  //     });

  //     this.products2.push({category: category, products: sectionToAdd});
  //   });

  //   // Obteniendo el listado de hamburguesas
    
  //   // db.collection('hamburguers').get().then((hamburguers) => {
  //   //     hamburguers.forEach((hamburguer) => {
  //   //       this.products.push(<Product>hamburguer.data());
  //   //       // console.log(hamburguer.data());
  //   //     });
  //   // });
  // }
}
