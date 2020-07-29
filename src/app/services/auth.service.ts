import { Injectable } from '@angular/core';
import { User } from 'firebase';

import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/RegisterForm';
import { LoginForm } from '../interfaces/LoginForm';
import { FirebaseService } from './firebase.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  // Usuario que se esta intentando autenticar.
  private user : User;

  // Hay un usuario logueado o no.
  public isLogin: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private fbService: FirebaseService,
    private router: Router
  ) 
  { 
    this.getState();
  }

  /**
   * Iniciar sesión con correo y contraseña en firebase.
   * @param email Correo eléctronico.
   * @param password Contraseña.
   */
  async login(data: LoginForm)
  {
    try 
    {
      const result = await this.afAuth.signInWithEmailAndPassword(data.email, data.password);
      return result;
    } catch (error) 
    {
      console.log(error);      
    }
    this.getState();
  }

  /**
   * Iniciar sesión con google.
   */
  loginWithGoogle()
  {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider)
    .then((result) => {
      if(result.additionalUserInfo.isNewUser)
      {
        this.fbService.createGoogleUser(result);
      }
      this.router.navigate(['/shopping-cart']);      
    }).catch((error) => {
        console.log(error)
    });
    // return this.authLogin(new auth.GoogleAuthProvider);

    // return this.authLogin(new auth.GoogleAuthProvider);
  }

  /**
   * Iniciar sesión con facebook.
   */
  loginWithFacebook()
  {
    return this.afAuth.signInWithPopup(new auth.FacebookAuthProvider)
    .then((result) => {
      if(result.additionalUserInfo.isNewUser)
      {
        this.fbService.createFacebookUser(result);
      }
      this.router.navigate(['/shopping-cart']);      
    }).catch((error) => {
        console.log(error)
    });
    // return this.authLogin(new auth.FacebookAuthProvider);
  }

  /**
   * Registra un usuario en firebase. 
   * @param email 
   * @param password 
   */
  async register(user: RegisterForm)
  {
    await this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then((credentials) => {
      this.fbService.createUser(user, credentials);
      return true;
    });
  }

  /**
   * Obtiene el usuario logueado actualmente.
   */
  async getCurrentUser()
  {
    try 
    {
      return await this.afAuth.authState.pipe(first()).toPromise();
    } catch (error) 
    {
      console.log(error); 
    }    
  }

  /**
   * Cierra sesión al usuario logueado.
   */
  async logout()
  {
    try 
    {
      await this.afAuth.signOut();
    } catch (error) 
    {
      console.log(error);
    }
  }

  /**
   * Indica si hay un usuario logueado o no.
   */
  async getState()
  {
    try 
    {
      await this.afAuth.onAuthStateChanged((user) => {
        if(user)
        {
          this.fbService.getUserByUid(user.uid);
          this.isLogin = true
        }
        else
        {
          this.isLogin = false;
        }
      });      
    } catch (error) 
    {
      console.log(error);      
    }
  }
}
