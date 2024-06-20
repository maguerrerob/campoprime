import { Component } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.scss'
})
export class RegistroClienteComponent {
  username: string="";
  f_name: string="";
  l_name: string="";
  email: string="";
  pass1: string="";
  pass2: string="";
  rol: string ="";
  telefono: string="";

  constructor(private router: Router,
  private registroCliente: PeticionesService) {  }
  
  registroFormulario() {
    const dataSignUp = {
      username: this.username,
      first_name: this.f_name,
      last_name: this.l_name,
      email: this.email,
      password1: this.pass1,
      password2: this.pass2,
      rol: "2",
      telefono: this.telefono,
    };
    this.registroCliente.registroService(dataSignUp).subscribe(
      response => {
        console.log(response);
        
        const user = {usuario: this.username, pass: this.pass1}
        this.registroCliente.loginUsuario(user).subscribe((data) =>{
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
    this.registroCliente.getUserLogged(sessionStorage.getItem('token')).subscribe((data) =>{
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('first_name', data.first_name);
      sessionStorage.setItem('last_name', data.last_name);
      sessionStorage.setItem('email', data.email);
      this.getClienteId(data.id)
    })
  }

  getClienteId(usuario_id:string){
    this.registroCliente.getClienteId(usuario_id).subscribe((data) => {
      sessionStorage.setItem('idCliente', data.id)
    })
    this.router.navigate(['/home'])
  }
}
