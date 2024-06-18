import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from '../servicios/peticiones.service';

@Component({
  selector: 'app-recinto',
  templateUrl: './recinto.component.html',
  styleUrl: './recinto.component.scss'
})
export class RecintoComponent implements OnInit {
  nombreRecinto!: any;
  ubicacionRecinto!: any;
  descripcionRecinto!: any;
  idRecinto!: any;
  hora_apertura_recinto!: any;
  hora_cierre_recinto!: any;
  hours: number[] = [];
  horasReservadas: any = {};
  today: string = "2024-06-18";

  constructor(
    private router:Router,
    private recinto:PeticionesService,
  ) {
    // const now = new Date();
    // this.today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  }

  ngOnInit(): void {
    // Apaño para poder seguir
    // sessionStorage.setItem('idRecinto', "5")

    this.idRecinto = sessionStorage.getItem('idRecinto')
    this.nombreRecinto = sessionStorage.getItem('nombreRecinto'),
    this.ubicacionRecinto = sessionStorage.getItem('ubicacionRecinto'),
    this.descripcionRecinto = sessionStorage.getItem('descripcionRecinto')
    this.consultarHorarioRecinto();
    this.obtenerReservas();

    
  }

  consultarHorarioRecinto(): void {
    this.recinto.consultarHorarioRecinto(this.idRecinto).subscribe((data: any) => {
      console.log('Datos obtenidos:', data); // Verifica los datos recibidos
      this.hora_apertura_recinto = data['hora_inicio'];
      this.hora_cierre_recinto = data['hora_fin'];
    },
    (error) => {
      console.error('Error al obtener el horario del recinto:', error);
      // Manejo de errores aquí
    });
  }

  obtenerReservas(): void {
    this.recinto.obtenerReservas(this.idRecinto, this.today).subscribe((response: any) => {
      console.log('Reservas obtenidasssssssssssssss:', response);
      this.horasReservadas = response;
    },
    (error) => {
      console.error('Error al obtener las reservas:', error);
    });
  }

  getHoursRange(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, index) => start + index);
  }

  isReserved(hour: number): boolean {
    return this.horasReservadas[hour] || false;
  }

  reservarHora(hour: number): void {
    // Aquí deberías implementar la lógica para reservar la hora seleccionada
    // Esta implementación es un ejemplo básico
    alert(`Reservando la hora de ${hour}:00 a ${hour + 1}:00 para el recinto #${this.idRecinto}`);
  }

  

  logout(){
    sessionStorage.clear()
    this.router.navigate(['/'])
  }


}
