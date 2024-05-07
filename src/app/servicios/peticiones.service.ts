import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "http://127.0.0.1:8000"

@Injectable({
  providedIn: 'root'
})

export class PeticionesService {

  constructor(private http: HttpClient) { }

  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/listar_servicios`);
  }
}