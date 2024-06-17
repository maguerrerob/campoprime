import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-recintos',
  templateUrl: './lista-recintos.component.html',
  styleUrl: './lista-recintos.component.scss'
})
export class ListaRecintosComponent {
  recintos: any;

  constructor(
    private peticionesService: PeticionesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.listarecintos();
  }

  listarecintos(): void {
    this.peticionesService.getrecintos().subscribe((data: any) => {
      this.recintos = data;
      console.log(this.recintos)

    });
  }

}

