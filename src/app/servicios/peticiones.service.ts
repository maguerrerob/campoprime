import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
// import { CookieService } from "ngx-cookie-service";

//Despliegue
// const baseUrl = "http://51.83.33.196:8000"
//Local
const baseUrl = "http://127.0.0.1:8000"

@Injectable({
  providedIn: 'root'
})

export class PeticionesService {
  private url_crear_token =  baseUrl + '/oauth2/token/';
  private url_obtener_user = baseUrl + '/api/v1/usuario/token/';
  private url_registrar_user = baseUrl + '/api/v1/registrar/usuario/';

  constructor(private http: HttpClient,
    private oauthService: OAuthService
  ) {
    this.initLoginGoogle();
  }

  loginUsuario(datosLogin: any): Observable<any> {
    const datosCrearToken = new HttpParams()
    .set('grant_type', 'password')
    .set('username', datosLogin['usuario'])
    .set('password', datosLogin['pass'])
    
    .set('client_id', 'client_id')
    .set('client_secret', '1234Probando.');

    const cabecera = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    return this.http.post<any>(this.url_crear_token,datosCrearToken.toString(), {headers: cabecera})
    .pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // Para configurar token en cookies
  // setToken(token:string){
  //   this.cookies.set("token", token);
  // }

  // // Para obtener token en cookies
  // getToken(){
  //   return this.cookies.get("token");
  // }

  
  getUserLogged(token: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>(`${this.url_obtener_user}`+`${token}`, { headers })
    .pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  registroService(dataSignUp: any): Observable<any>{
    return this.http.post<any>(this.url_registrar_user, dataSignUp).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  // getServicios(): Observable<any[]> {
  //   return this.http.get<any[]>(`${baseUrl}/listar_servicios`);
  // }

  initLoginGoogle(){
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '450213620048-qcqje06s286vbgv2077bh06tvcb1a40j.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/home',
      scope: 'openid profile email',
    }

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  loginGoogle(){
    this.oauthService.initLoginFlow();
  }

  logoutGoogle(){
    this.oauthService.logOut();
  }

  getProfileGoogle(){
    return this.oauthService.getIdentityClaims();
  }
}