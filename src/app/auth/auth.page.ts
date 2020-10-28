import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { async } from '@angular/core/testing';
const { Device, signInWithApple } = Plugins;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit 
{
  // Correo y contraseña ingresados por el usuario.
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  user = null;
  // Variable de verificación de plataforma (Andorid | IOS) default -> false
  showAppleSignIn = true;
  constructor(
    private authService: AuthService,
    private router: Router 
  ) 
  { }

  async ngOnInit() 
  {
    const device = await Device.getInfo();
    //Verifica cual si la plataforma es ios para mostrar el log in con apple
    //this.showAppleSignIn = device.platform === 'ios';
  }

  /**
   * Inicia sesión a un usuario con correo y contraseña.
   */
  login()
  {
    this.authService.login(this.loginForm.value).then((response) => {
      console.log(response);
      this.router.navigate(['/shopping-cart']);
    }).catch((error) => {
      console.log(error);
    });
    // console.log('Is Login ==> ' + isLogin);
    // this.router.navigate(['/shopping-cart'])
    // console.log(this.loginForm.value);
  }

  /**
   * Iniciar sesión con google.
   */
  loginWithGoogle()
  {
    this.authService.loginWithGoogle();
  }

  /**
   * Iniciar sesión con facebook.
   */
  loginWithFacebook()
  {
    this.authService.loginWithFacebook();
  }


  /**
   * Iniciar sesión con apple
   */
  openAppleSignIn() {
    signInWithApple.Authorize().then(async res => {
      alert(res);
      if (res.response && res.response.identityToken) {
        this.authService.loginWithApple(res.response);
      } else {
        alert("Could not be logged");
      }
    }).catch(response=>{
      alert("There is not an ios a response");
    });
  }


  /**
   * Iniciar Sesión con google.
   */
  // signInWithGoogle()
  // {
  //   this.authService.googleSignin();
  // }

  /**
   * Redirige a la página para registrar un usuario.
   */
  goToRegisterUrl()
  {
    this.router.navigate(['/auth/register'])
  }

}
