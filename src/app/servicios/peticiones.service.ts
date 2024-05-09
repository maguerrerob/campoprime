import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

const baseUrl = "http://127.0.0.1:8000"

@Injectable({
  providedIn: 'root'
})

export class PeticionesService {

  private url_crear_token = 'http://127.0.0.1:8000/oauth2/token/';
  private url_obtener_token = 'http://127.0.0.1:8000/api/v1/usuario/token/';

  constructor(private http: HttpClient, private cookies: CookieService) { }

  loginUsuario(datosLogin: any): Observable<any> {
    const datosCrearToken = new HttpParams()
    .set('grant_type', 'password')
    .set('username', datosLogin['usuario'])
    .set('password', datosLogin['pass'])
    .set('client_id', 'client_id')
    .set('secret_id', '1234Probando.');

    const cabecera = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    return this.http.post<any>(this.url_crear_token,datosCrearToken.toString(), {headers: cabecera})
    .pipe(
      catchError(error => {
        throw error
      })
    );
  }

  // Para configurar token en cookies
  setToken(token:string){
    this.cookies.set("token", token);
  }

  // Para obtener token en cookies
  getToken(){
    return this.cookies.get("token");
  }

  getUserLogged(): Observable<any>{
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>(`${this.url_obtener_token}`+`${token}`, { headers })
    .pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // getServicios(): Observable<any[]> {
  //   return this.http.get<any[]>(`${baseUrl}/listar_servicios`);
  // }
}