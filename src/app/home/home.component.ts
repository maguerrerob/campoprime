import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';
import { Carousel } from 'bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{
  constructor(
    private HomeService: PeticionesService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    const carouselElement = document.getElementById('carouselExampleSlidesOnly');
    if (carouselElement) {
      const carousel = new Carousel(carouselElement, {
        interval: 5000,
        ride: 'carousel'
      });
    }
  }

  logout(){
    sessionStorage.clear()
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
