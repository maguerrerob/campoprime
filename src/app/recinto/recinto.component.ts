import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from '../servicios/peticiones.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-recinto',
  templateUrl: './recinto.component.html',
  styleUrl: './recinto.component.scss'
})
export class RecintoComponent implements OnInit {
  recintoData!: any
  nombreRecinto!: any;
  ciudadRecinto!: any;
  descripcionRecinto!: any;
  idRecinto!: any;
  precioRecinto!: any;
  hora_apertura_recinto!: any;
  hora_cierre_recinto!: any;
  hours: number[] = [];
  horasReservadas: any = {};
  fechaHoy!: string;
  fechaReserva!: any;

  constructor(
    private router:Router,
    private recintoPeticiones:PeticionesService,
  ) {
    // const now = new Date();
    // this.today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.recintoData = this.recintoPeticiones.getRecinto()

    // this.recintoPeticiones.obtenerRecintoAPI()
    
    console.log(this.recintoData);
    this.idRecinto = this.recintoData.id
    this.nombreRecinto = this.recintoData.nombre
    this.descripcionRecinto = this.recintoData.descripcion
    this.ciudadRecinto = this.recintoData.ciudad
    this.precioRecinto = this.recintoData.precio_por_hora
    this.hora_apertura_recinto = this.recintoData.hora_inicio
    this.hora_cierre_recinto = this.recintoData.hora_fin

    sessionStorage.setItem('idRecinto', this.idRecinto)
    sessionStorage.setItem('nombreRecinto', this.nombreRecinto),
    sessionStorage.setItem('descripcionRecinto', this.descripcionRecinto)
    sessionStorage.setItem('ciudadRecinto', this.ciudadRecinto)
    sessionStorage.setItem('precioRecinto', this.precioRecinto)
    sessionStorage.setItem('hora_apertura_recinto', this.hora_apertura_recinto)
    sessionStorage.setItem('hora_cierre_recinto', this.hora_cierre_recinto)

    const fechaActual = new Date();
    this.fechaHoy = format(fechaActual, 'yyyy-MM-dd');
    sessionStorage.setItem('dia', this.fechaHoy)
    console.log(typeof(this.fechaHoy));

    

    this.obtenerReservas();
  }

  mostrar(){
    sessionStorage.setItem('dia', this.fechaReserva)
    console.log(this.fechaReserva);
    this.obtenerReservasNewDate()
  }


  obtenerReservas(): void {
    this.recintoPeticiones.obtenerReservas(this.idRecinto, this.fechaHoy).subscribe((response: any) => {
      console.log('Reservas obtenidasssssssssssssss:', response);
      
      this.horasReservadas = response;
      console.log("eeeeeeee");
      
      console.log(this.horasReservadas);

    },
    (error) => {
      console.log("esteeeee");
      
      console.error('Error al obtener las reservas:', error);
    });
  }

  obtenerReservasNewDate(): void {
    this.recintoPeticiones.obtenerReservas(this.idRecinto, this.fechaReserva).subscribe((response: any) => {
      console.log('Reservas obtenidas22ssssssssssssss:', response);
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
    alert(`Reservando la hora de ${hour}:00 a ${hour + 1}:00 para el recinto #${this.idRecinto}`);
    this.router.navigate(['pago/', this.idRecinto])
  }

  

  logout(){
    sessionStorage.clear()
    this.recintoPeticiones.delRecinto()
    this.router.navigate(['/'])
  }


}
