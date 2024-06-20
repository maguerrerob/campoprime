import { Component, ViewChild } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-creacion-recinto',
  templateUrl: './creacion-recinto.component.html',
  styleUrl: './creacion-recinto.component.scss'
})
export class CreacionRecintoComponent {
  public duenyo_recinto!: any;
  public nombre!: string;
  public descripcion!: string;
  public ciudad!: string;
  public precio_por_hora: string = "1";
  public hora_inicio!: string;
  public hora_inicio_formateada!: string;
  public hora_fin_formateada!: string;
  public hora_fin!: string;
  opcionesHoraFin: string[] = [];

  constructor(
    private peticionesService: PeticionesService,
    private router: Router,
  ) {}

  convertHora(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    if (minutes === 30) {
      return `${hours}.5`;
    } else if (minutes === 0) {
      return `${hours}`;
    } else {
      throw new Error("Formato no soportado");
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  recintoCreate() {
    if (this.validarHoras()) {
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
        sessionStorage.setItem('idRecinto', response.id);
        sessionStorage.setItem('nombreRecinto', response.nombre)
        this.peticionesService.setRecinto(response)
        this.router.navigate([`/recinto/${response.id}`]);
      }, error => {
        console.log(error);
      });
    } else {
      console.log("Horas inválidas");
    }
  }

  @ViewChild('myform') myform!: NgForm;

  actualizarOpcionesHoraFin() {
    const minutosInicio = this.hora_inicio.split(':')[1];
    if (minutosInicio === '00') {
      this.opcionesHoraFin = [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
        '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
        '21:00', '22:00', '23:00'
      ];
    } else {
      this.opcionesHoraFin = [
        '00:30', '01:30', '02:30', '03:30', '04:30', '05:30', '06:30',
        '07:30', '08:30', '09:30', '10:30', '11:30', '12:30', '13:30',
        '14:30', '15:30', '16:30', '17:30', '18:30', '19:30', '20:30',
        '21:30', '22:30', '23:30'
      ];
    }
  }

  validarHoras(): boolean {
    const regexHora = /^(0?[0-9]|1[0-9]|2[0-3]):(00|30)$/;
    if (!regexHora.test(this.hora_inicio) || !regexHora.test(this.hora_fin)) {
      return false;
    }

    const [horaInicio, minutosInicio] = this.hora_inicio.split(':').map(Number);
    const [horaFin, minutosFin] = this.hora_fin.split(':').map(Number);

    if (minutosInicio !== minutosFin) {
      return false;
    }

    if (horaInicio > horaFin || (horaInicio === horaFin && minutosInicio >= minutosFin)) {
      return false;
    }

    return true;
  }

  horaAperturaChanged(): void {
    this.actualizarOpcionesHoraFin();
  }
}