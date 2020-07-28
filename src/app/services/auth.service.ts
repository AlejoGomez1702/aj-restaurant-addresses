import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  // Usuario que se esta intentando autenticar.
  private user : Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) 
  { 
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user)
        {
          return this.afs.doc<User>('users/' + user.uid).valueChanges();
        }
        else
        {
          return of(null);
        }
      })

    );
  }


  /**
   * Realiza el login con google.
   */
  async googleSignin()
  {
    try
    {
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    catch(error)
    {
      console.log(error);
    }
  }


}
