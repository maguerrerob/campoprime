import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

  dia!: any;
  constructor(
    private HomeService: PeticionesService,
    private router: Router
  ) {}

  logout(){
    sessionStorage.clear()
    this.router.navigate(['/'])
  }


  busqueda(){
    // Lógica búsqueda recintos
    console.log(this.dia);
    console.log(typeof(this.dia));
    
    
    // this.router.navigate(['/busqueda-avanzada'])
  }
  

  // Google
  showDataGoogle(){
    const infoUser= JSON.stringify(this.HomeService.getProfileGoogle());
    console.log(infoUser);
  }

  logOutGoogle(){
    this.HomeService.logoutGoogle();
  }
}
