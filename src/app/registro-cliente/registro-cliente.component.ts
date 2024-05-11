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
      email: this.email,
      password1: this.pass1,
      password2: this.pass2,
      rol: "2",
      telefono: this.telefono,
    };
    this.registroCliente.registroClienteService(dataSignUp).subscribe(
      response => {
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
