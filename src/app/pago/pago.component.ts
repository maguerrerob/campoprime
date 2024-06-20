import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from '../servicios/peticiones.service';

declare var paypal: any;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {
  public nombreRecinto!: any
  public precioRecinto!: any;
  public idRecinto!: any
  public idCliente!: any
  public hora_inicio!: any;
  public hora_fin!: any;
  public dia!: any

  constructor(
    private router: Router,
    private peticionesPagos: PeticionesService,
  ) {}

  ngOnInit(): void {
    this.nombreRecinto = sessionStorage.getItem('nombreRecinto');
    this.precioRecinto = sessionStorage.getItem('precioRecinto');
    this.idRecinto = sessionStorage.getItem('idRecinto');
    this.idCliente = sessionStorage.getItem('idCliente');
    this.hora_inicio = sessionStorage.getItem('hora_apertura_recinto');
    this.hora_fin = sessionStorage.getItem('hora_cierre_recinto');
    this.dia = sessionStorage.getItem('dia')


    console.log(typeof(this.precioRecinto));
    

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AZIeOD0muUHOKC7RkyqReZ83f-Ex_cNIvy3pk76VjugLxsYbLXbkbzLFMrmfTo1WZBwrv-BiB_iayg11';
    script.onload = () => this.loadPayPalScript();
    document.head.appendChild(script);

  }
 

  loadPayPalScript(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            description: this.nombreRecinto,
            amount: {
              value: this.precioRecinto,
              currency: 'EUR'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('Transaction completed by ' + details.payer.name.given_name);
          const reserva = {
            cliente: this.idCliente,
            recinto: this.idRecinto,
            hora_inicio: this.hora_fin,
            hora_fin: this.hora_fin,
            dia: this.dia
          }
          this.peticionesPagos.crearReserva(reserva).subscribe(
            data => {
              alert("Reserva creada exitosamente")
              this.router.navigate(['recinto/', sessionStorage.getItem('idRecinto')]);
              console.log('Reserva creada exitosamente!', data);
            },
            error => {
              console.error('Error al crear la reserva', error);
            }
          );
        });
      },
      onError: (err: any) => {
        console.error(err);
      }
    }).render('#paypal-button-container'); // Make sure this matches the ID in your HTML
  }
}