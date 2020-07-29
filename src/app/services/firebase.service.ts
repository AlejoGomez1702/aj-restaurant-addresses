import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Product } from '../interfaces/Product'; 
import { ProductsList } from '../interfaces/ProductsList';
import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/RegisterForm';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService 
{
  // Imagen principal de la aplicación.
  public coverPageURL: String = 'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/cover-page%2Fcover-page.png?alt=media&token=3bb9535d-1251-4589-b1d3-fae866264c8c';

  // Imagenes de los medios de pago disponibles.
  public paymentsImages = [
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fvisa_icon.png?alt=media&token=6443e28b-4e0e-4f8d-bdac-0157c4f592b3',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Famerica_icon.png?alt=media&token=81467564-fe44-48d0-a65c-b174589f36a3',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fmaster_icon.png?alt=media&token=87d30447-cf5c-4efe-ba68-ba852e932ecf',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdisscover_icon.png?alt=media&token=9d5a2cb0-cffa-417b-8718-6ade59107071',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fjcb_icon.png?alt=media&token=935d7050-a8c3-4104-abf1-dfa5dc694b0d',
    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdinners_icon.png?alt=media&token=74d740d7-13a3-4e1f-a7da-573b1bf3a72e',

    'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fcash_icon.png?alt=media&token=fa5c5aa1-fcc8-4e1c-8d53-bad6c7c0a40d'
    // 'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Famerican_express_card.svg?alt=media&token=ee6e9dc9-0f64-4928-8c58-a44e24f10ca6',
    // 'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdinners-club_card.svg?alt=media&token=d4e72cab-cf89-43e6-aab1-2b1a53dc1d61',
    // 'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdinners-club_card.svg?alt=media&token=d4e72cab-cf89-43e6-aab1-2b1a53dc1d61',
    // 'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdinners-club_card.svg?alt=media&token=d4e72cab-cf89-43e6-aab1-2b1a53dc1d61',
    // 'https://firebasestorage.googleapis.com/v0/b/crud-ionic-c3d18.appspot.com/o/payments%2Fdollar.svg?alt=media&token=dc3fd93f-dae2-4fd0-b82c-6311fa666bf0'
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
    // this.loadPaymentImages();
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
   * 
   * @param user 
   */
  createUser(user: RegisterForm, credentials)
  {
    const db = firebase.firestore();
    db.collection('users').doc(credentials.user.uid).set({
      names: user.names,
      surnames: user.surnames,
      email: user.email,
      phone: user.phone
    }).then(() => {
      console.log('Se creo en la base de datos el usuario');
      // console.log(user);
    }).catch((error) => {
      console.log('NOOOO SE PUDO CREAR EN LA BASE DE DATOS');
    });
  }

}
