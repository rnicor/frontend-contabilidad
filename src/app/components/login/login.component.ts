import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;


  constructor(
    private fb: FormBuilder, 
    private authorizationService: AuthorizationService,
    private _snackBar: MatSnackBar,
    private router : Router
    ) {
    this.form = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
   }

  ngOnInit(): void {

  }
  ingresar()
  {
    const username = this.form.value.username;
    const password = this.form.value.password;
    console.log(username, password);
    if(username == 'MYC' && password == '12345'){
      this.router.navigate(['sucursal']);
    } else {
      this.error()
    }
  }
  login() {
    const username = this.form.value.username;
    const password = this.form.value.password
    const grant_type = 'password'
   const  user = {
      grant_type:grant_type,  
      username: username,
      password: password,
    };
    if (username === '' || password === '' || password.length < 3) {
      console.log('error');
    } else {
      this.authorizationService.login(user).subscribe(res => {
        localStorage.removeItem('mfx-token');
        sessionStorage.removeItem('mfx-token');
        localStorage.removeItem('mfx-lang');
        sessionStorage.removeItem('mfx-lang');
        sessionStorage.setItem('mfx-token', res.token);
        console.log(res)
      }, error => {
        this.error();
        console.log('ERRORrr', error);
      });
    }
   }
   error() {
    this._snackBar.open('usuario o contraseña inválidos', '',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    }
    )
   }

}
