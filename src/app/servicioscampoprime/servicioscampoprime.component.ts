import { Component } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';

@Component({
  selector: 'app-servicioscampoprime',
  templateUrl: './servicioscampoprime.component.html',
  styleUrl: './servicioscampoprime.component.scss'
})

// export class ServicioscampoprimeComponent{

// }

export class ServicioscampoprimeComponent{
  servicios : any[] = []

  constructor(private listar_servicios: PeticionesService) { }

  ngOnInit(): void {
    this.listar_servicios.getServicios().subscribe((data: any) => {
      this.servicios = data
    })
  }
}