import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda-avanzada',
  templateUrl: './busqueda-avanzada.component.html',
  styleUrl: './busqueda-avanzada.component.scss'
})
export class BusquedaAvanzadaComponent {
  dia!: any;

  constructor(
    private router : Router
  ) {}

  logout(){
    sessionStorage.clear()
    this.router.navigate(['/'])
  }

  buscarRecintos(){
    console.log("Búsqueda para buscar recintos");
    
  }
}


