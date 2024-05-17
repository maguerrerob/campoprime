import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from '../servicios/peticiones.service';

@Component({
  selector: 'app-registro-duenyo',
  templateUrl: './registro-duenyo.component.html',
  styleUrl: './registro-duenyo.component.scss'
})
export class RegistroDuenyoComponent {
  username: string="";
  email: string="";
  pass1: string="";
  pass2: string="";
  rol: string ="";
  telefono: string="";

  constructor(private router: Router,
    private registroDuenyo: PeticionesService) {  }

    registroFormulario() {
      const dataSignUp = {
        username: this.username,
        email: this.email,
        password1: this.pass1,
        password2: this.pass2,
        rol: "3",
        telefono: this.telefono,
      };
      this.registroDuenyo.registroService(dataSignUp).subscribe(
        response => {
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        }
      );
    }
}
