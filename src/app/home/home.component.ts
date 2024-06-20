import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  recintos: any[] = [];
  query: string = '';

  constructor(
    private HomeService: PeticionesService,
    private router: Router
  ) {}

  logout(){
    sessionStorage.clear()
    this.router.navigate(['/'])
  }


  busqueda(): void {
    this.HomeService.buscarRecintos(this.query).subscribe((data: any) => {
      this.HomeService.setRecintos(data, this.query);
      this.router.navigate(['/lista-recintos']);
    });
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
