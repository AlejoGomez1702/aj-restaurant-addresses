import { Component } from '@angular/core';
// import { FirebaseService } from '../services/firebase.service';
import { UserAuth } from '../interfaces/UserAuth';

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
    // private firebaseService: FirebaseService
  ) 
  {
    // this.user = this.firebaseService.user;
  }

}
