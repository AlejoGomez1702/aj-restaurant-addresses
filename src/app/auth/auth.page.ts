import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit 
{

  constructor(
    private authService: AuthService,
    private router: Router 
  ) 
  { }

  ngOnInit() 
  {
  }

  /**
   * Iniciar Sesión con google.
   */
  signInWithGoogle()
  {
    this.authService.googleSignin();
  }

  /**
   * Redirige a la página para registrar un usuario.
   */
  goToRegisterUrl()
  {
    this.router.navigate(['/auth/register'])
  }

}
