import { Component } from '@angular/core';
// import { FirebaseService } from '../services/firebase.service';
import { UserAuth } from '../interfaces/UserAuth';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page 
{
  // Usuario logueado.
  public user: UserAuth;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) 
  {
    this.user = this.firebaseService.user;
  }

  logout()
  {
    this.authService.logout();
  }


}
