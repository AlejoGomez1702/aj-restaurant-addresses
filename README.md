## AJ CREATIVE STUDIOS
# PLANTILLA - APLICACIÓN DOMICILIOS

## Introducción
En la presente documentación se describe la manera en la cual esta estructurada la aplicación de domicilios y también como realizar una posterior edición pensando en la implementación para otros restaurantes.

## Tecnologías utilizadas
La implementación se realizó en: <br/>
[IONIC 6.10.1](https://ionicframework.com/docs) -> Framework para desarrollo de apps hibrídas. <br/>
[ANGULAR 10.0.1](https://angular.io/docs) -> Framework para desarrollo de frontend. <br/>
La base de datos, el alojamiento de imagenes, el módulo de autenticación y algunos END POINTS, se realizarón en [FIREBASE](https://firebase.google.com/), especificamente los servicios son los señalados a continuación: <br/> <br/>
![firebase-services](https://user-images.githubusercontent.com/28588187/95807081-e9308700-0cce-11eb-9a46-b1cec8913810.PNG) <br/>

## Estructura 
Se utilizó el modelo de tabs que otorga el framework IONIC por defecto y a partir de ahí se comienza el desarrollo del software donde el resultado final es la siguiente estructura:
<br/>

![estructure](https://user-images.githubusercontent.com/28588187/95807478-e3877100-0ccf-11eb-98de-13c502ec1989.PNG)

<br/>

Las siguientes carpetas alojan las 3 pestañas principales de la aplicación, (Products, Gallery, Profile). <br/>
![tabs](https://user-images.githubusercontent.com/28588187/95807592-34976500-0cd0-11eb-8c05-558f01d78e9b.PNG)
<br/>

### tab1 -> Products
![products](https://user-images.githubusercontent.com/28588187/95808167-796fcb80-0cd1-11eb-957c-73ea7da8006e.PNG)
<br/>

### tab2 -> Gallery
![gallery](https://user-images.githubusercontent.com/28588187/95808171-7bd22580-0cd1-11eb-8e1d-fcef88ca1e75.PNG)
<br/>

### tab3 -> Profile
![profile](https://user-images.githubusercontent.com/28588187/95808175-7e347f80-0cd1-11eb-8fb6-918b04f1a0f4.PNG)
<br/>

### Consumo de servicios 
La lógica de negocio de la aplicación se encuentra alojada en la carpeta servicios, y son los siguientes:
<br/>
![services](https://user-images.githubusercontent.com/28588187/95808426-04e95c80-0cd2-11eb-9ad0-eea225389cb8.PNG)
<br/>

**auth.service.ts:** Se encuentra alojado el código que maneja las sesiones de usuario, identificando si actualmente hay un usuario logueado o no,
de estarlo en esta clase se almacenará en memoria los datos que la app utilizá para su funcionamiento, además de que en este servicio 
se encuentra un arreglo en el cual se debe especificar cuales son los códigos postales(ZIP) que se aceptan para los domicilios.
<br/>
![zips](https://user-images.githubusercontent.com/28588187/95808841-fc455600-0cd2-11eb-94c4-9c56f6c93c1f.PNG)
<br/>

**firebase.service.ts:** Maneja la comunicación con el backend de firebase, es decir, es la que se encarga de obtener todos los productos almacenados en la base de datos,
registrar las compras de los clientes, obtener las imagenes de la aplicación, etc. 
Este servicio tambien obtiene un objeto con información estática, la cual contiene las URLS de las imagenes utilizadas en la app e información general del restaurante.
Este objeto se encuentra en la ruta **src/app/assets-firestorage/data.ts**, y debe verse de una manera similar a la siguiente: <br/>
![data](https://user-images.githubusercontent.com/28588187/95809280-04ea5c00-0cd4-11eb-9c97-245c9b3a2dc6.PNG)
<br/>

**shopping-cart.service.ts:** Alberga la lógica de negocio del carrito de compras, es el servicio que se encarga de controlar lo que se va añadiendo a la compra
por parte del usuario y lleva el control de las opciones seleccionadas de ser el caso y el valor total de la compra, cuando se confirma está, el servicio
posee la funcionalidad de registrar en la base de datos la venta realizadá.
<br/>
![cart](https://user-images.githubusercontent.com/28588187/95809590-c30de580-0cd4-11eb-80ff-5b07f3c604c5.PNG)
<br/>

## BASE DE DATOS










