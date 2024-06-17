import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creacion-recinto',
  templateUrl: './creacion-recinto.component.html',
  styleUrl: './creacion-recinto.component.scss'
})
export class CreacionRecintoComponent{
  public duenyo_recinto!: any
  public nombre!: string;
  public descripcion!: string;
  public ciudad!: string;
  public precio_por_hora: string = "1";
  public hora_inicio!: string;
  public hora_inicio_formateada!: string;
  public hora_fin_formateada!: string;
  public hora_fin!: string;
  // imagen: File | null = null;

  constructor(
    private peticionesService: PeticionesService,
    private router: Router,
  ) {}

  // loog(){
  //   this.hora_inicio_formateada = this.convertHoraInicio(this.hora_inicio)
  //   console.log(this.hora_inicio_formateada);
  // }


  convertHora(time: string): string {
    const [hours, minutes] = time.split(':').map(Number)
    if (minutes === 30) {
      const horas = hours.toString()
      return horas + ".5";
    }else if (minutes === 0){
      const horas = hours.toString()
      return horas;
    } else {
      throw new Error("Formato no soportado")
    }


    // const value = event.target.value
    // const regex = /^(\d{1,2}):(\d{2})$/;
    // const match = value.match(regex);

    // if (match) {
    //     const hours = parseInt(match[1], 10); // Primer grupo de captura (horas)
    //     const minutes = match[2]; // Segundo grupo de captura (minutos)

    //     if (minutes === '30') {
    //         this.hora_inicio = `${hours}.5`; // Convierte "30" a ".5"
    //     } else {
    //         this.hora_inicio = `${hours}`; // Mantiene el número entero para "00"
    //     }
    // }
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate(['/'])
  }


  recintoCreate() {
    const data = {
      duenyo_recinto: sessionStorage.getItem('duenyo_recinto_id'),
      nombre: this.nombre,
      descripcion: this.descripcion,
      ciudad: this.ciudad,
      precio_por_hora: this.precio_por_hora,
      hora_inicio: this.convertHora(this.hora_inicio),
      hora_fin: this.convertHora(this.hora_fin),
    };

    this.peticionesService.createRecinto(data).subscribe(response => {
      console.log("hecho");
    }, error => {
      console.log(error);
    });
  }
}
