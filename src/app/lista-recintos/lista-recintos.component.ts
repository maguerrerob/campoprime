import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-recintos',
  templateUrl: './lista-recintos.component.html',
  styleUrl: './lista-recintos.component.scss'
})
export class ListaRecintosComponent implements OnInit {
  data: { [key: string]: any } = {};
  query: string = '';
  recintos: any[] = []

  constructor(
    private peticionesService: PeticionesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.data = this.peticionesService.getRecintos();
    if (Object.keys(this.data).length > 0) {
      console.log('Recintos recibidos:', this.data);
      this.query = this.data['query']
      this.recintos = this.data['recintos']
    } else {
      console.error('No se recibieron datos de recintos');
    }
  }

  busqueda(): void{
    this.peticionesService.buscarRecintos(this.query).subscribe((data: any) => {
      this.peticionesService.setRecintos(data, this.query);
      this.data = this.peticionesService.getRecintos();
      if (Object.keys(this.data).length > 0) {
        console.log('Recintos recibidos:', this.data);
        this.query = this.data['query']
        this.recintos = this.data['recintos']
      } else {
        console.error('No se recibieron datos de recintos');
      }
    });

  }

  accederRecinto(recinto: any): void{
    this.peticionesService.setRecinto(recinto);
    this.router.navigate(['recinto/', recinto.id]);
  }

  logout(){
    sessionStorage.clear()
    this.peticionesService.delRecinto()
    this.router.navigate(['/'])
  }

  logOutGoogle(){
    this.peticionesService.logoutGoogle();
  }

}