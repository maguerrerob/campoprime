import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  first_name!: string

  onDataCheck($event: any) {
    this.first_name = $event
  }

  userInfo = {
    image: "https://thumbs.dreamstime.com/b/icono-de-prueba-signo-interrogaci%C3%B3n-vectorial-con-el-s%C3%ADmbolo-avatar-perfil-persona-usuario-masculino-para-iniciar-sesi%C3%B3n-en-un-168495430.jpg",
    rol: "SALES"
  }

  constructor(
    private router: Router
  ){ }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }
}
