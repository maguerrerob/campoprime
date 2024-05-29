import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  constructor(
    private HomeService: PeticionesService,
    private router: Router
  ) {}

  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['/'])
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
