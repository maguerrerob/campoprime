import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-duenyo',
  templateUrl: './home-duenyo.component.html',
  styleUrl: './home-duenyo.component.scss'
})
export class HomeDuenyoComponent implements OnInit {
  idDuenyo!: number;
  recintos: any[] = [];
  token!: any

  constructor(
    private peticionesservice: PeticionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')
    this.peticionesservice.getUserLogged(sessionStorage.getItem('token')).subscribe((data) => {
      this.idDuenyo = data.id
      this.getRecintos(this.idDuenyo, this.token)
    })
  }

  getRecintos(idDuenyo: number, token: string){
    this.peticionesservice.getRecintosByDuenyoRecintoId(idDuenyo, token).subscribe((data) => {
      if (data == false){
        this.router.navigate(['/creacion-recinto'])
      } else{
        // CRUD Recinto
      }
    })
  }
}