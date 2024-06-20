import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../servicios/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-duenyo',
  templateUrl: './home-duenyo.component.html',
  styleUrl: './home-duenyo.component.scss'
})
export class HomeDuenyoComponent implements OnInit {
  idDuenyo!: any;
  idUser!: number;
  recintos: any[] = [];

  constructor(
    private peticionesservice: PeticionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idDuenyo = sessionStorage.getItem('duenyo_recinto_id')
    console.log(typeof(this.idDuenyo))
    this.getRecintos(this.idDuenyo)
    // this.peticionesservice.getUserLogged(sessionStorage.getItem('token')).subscribe((data) => {
    //   this.idUser = data.id
    //   this.getRecintos(sessionStorage.getItem('duenyo_recinto_id'), this.token)
    // })
  }

  getRecintos(idDuenyo: number){
    this.peticionesservice.getRecintosByDuenyoRecintoId(idDuenyo).subscribe((data) => {
      if (data == false){
        this.router.navigate(['/creacion-recinto'])
      } else{
        // CRUD Recinto
      }
    })
  }
}