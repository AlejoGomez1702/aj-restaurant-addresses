import { Component, OnInit } from '@angular/core';
import { RegisterForm } from 'src/app/interfaces/RegisterForm';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit 
{
  // Formulario con los datos de registro.
  public registerForm = new FormGroup({
    names: new FormControl(''),
    surnames: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl('')
  });
  // public registerForm = new FormControl('');

  constructor(
    private authService: AuthService
  ) 
  { 
  }

  ngOnInit() 
  {}

  /**
   * Hace un request a firebase con la información del usuario que se esta registrando.
   */
  registerUser()
  {
    const user = this.registerForm.value;
    this.authService.register(user);

    // console.log(this.registerForm.value);
  }

}
