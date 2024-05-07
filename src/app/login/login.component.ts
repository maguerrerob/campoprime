import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [PeticionesService]
})

export class LoginComponent {

}