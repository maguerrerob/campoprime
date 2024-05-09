import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PeticionesService } from '../servicios/peticiones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [PeticionesService]
})

export class LoginComponent {
  nombre: string="";
  password: string="";
  errorMensaje: string="";

  constructor(private router: Router,
    private loginService: PeticionesService,
    private tokenService: PeticionesService
  ) { }

  loginFormulario(){
    const user = {usuario:this.nombre, pass:this.password}
    this.loginService.loginUsuario(user).subscribe((data) =>{
      this.tokenService.setToken(data.access_token);
      this.router.navigate(['/home']);
    }, error => {
      this.errorMensaje = "Usuario o contraseña inválidos. Inténtelo de nuevo";
    });
  }
}