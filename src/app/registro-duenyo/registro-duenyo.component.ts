import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from '../servicios/peticiones.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro-duenyo',
  templateUrl: './registro-duenyo.component.html',
  styleUrl: './registro-duenyo.component.scss'
})
export class RegistroDuenyoComponent{
  username: string="";
  f_name: string="";
  l_name: string="";
  email: string="";
  pass1: string="";
  pass2: string="";
  rol: string ="";
  telefono: string="";

  constructor(private router: Router,
    private registroDuenyo: PeticionesService,
  ) { }

  registroFormulario() {
    const dataSignUp = {
      username: this.username,
      first_name: this.f_name,
      last_name: this.l_name,
      email: this.email,
      password1: this.pass1,
      password2: this.pass2,
      rol: "3",
      telefono: this.telefono,
    };
    this.registroDuenyo.registroService(dataSignUp).subscribe(
      response => {
        console.log(response);
        
        const user = {usuario: this.username, pass: this.pass1}
        this.registroDuenyo.loginUsuario(user).subscribe((data) =>{
          sessionStorage.setItem('token', data.access_token);
          this.iniciarSesion()
        })
      },
      error => {
        console.log(error);
      }
    );
  }

  iniciarSesion(){
    this.registroDuenyo.getUserLogged(sessionStorage.getItem('token')).subscribe((data) =>{
      this.router.navigate(['/home-duenyo'])
    })
  }
}