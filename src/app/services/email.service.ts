import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class EmailService 
{
  constructor(
    private emailComposer: EmailComposer
  ) 
  { }


  /**
   * Enviar un correo electrónico al cliente.
   */
  sendEmailToClient()
  {    
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        this.sendMail().then(() => {
          console.log('Se envio el correo');
        }).catch((error) => {
          console.log('no se puede enviar el correo');
          console.log(error);
        });
      }
     });
  }

  sendMail()
  {
    let email = {
      to: 'luis.gomezc@autonoma.edu.co',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [
      //   'file://img/logo.png',
      //   'res://icon.png',
      //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //   'file://README.pdf'
      // ],
      subject: 'Probando el envio de correos de ionic',
      body: 'How are you? Nice greetings from Leipzig mammiiii sera que si yo no se vamos a probar',
      isHtml: true
    };
    // Send a text message using default options
    return this.emailComposer.open(email);
}


}
