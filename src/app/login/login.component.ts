import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PeticionesService } from '../servicios/peticiones.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [PeticionesService]
})

export class LoginComponent {
  nombre!: string;
  password: string="";
  errorMensaje: string="";
  rolInt: number= 0;

  constructor(private router: Router,
    private loginService: PeticionesService,
    // private tokenService: PeticionesService
  ) { }

  loginFormulario(){
    const user = {usuario:this.nombre, pass:this.password};
    this.loginService.loginUsuario(user).subscribe((data) =>{
      sessionStorage.setItem('token', data.access_token);
      this.iniciarSesion()
    }, error => {
      this.errorMensaje = "Usuario o contraseña inválidos. Inténtelo de nuevo";
    });
  }

  iniciarSesion(){
    this.loginService.getUserLogged(sessionStorage.getItem('token')).subscribe((data) => {
      sessionStorage.setItem('id', data.id);
      this.getDuenyorecintoId(data.id)
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('first_name', data.first_name);
      sessionStorage.setItem('last_name', data.last_name);
      sessionStorage.setItem('email', data.email);
      if (data.rol == 2){
        this.router.navigate(['/home'])
      } else if (data.rol == 3){
        this.router.navigate(['/home-duenyo'])
      }
    })
  }

  getDuenyorecintoId(usuario_id:string){
    this.loginService.getDuenyorecintoId(usuario_id).subscribe((data) => {
      sessionStorage.setItem('duenyo_recinto_id', data.duenyo_recinto_id)
    })
    this.router.navigate(['/home-duenyo'])
  }

  loginGoogle(){
    this.loginService.loginGoogle()
  }
}