import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
// import { CookieService } from "ngx-cookie-service";

//Despliegue
// const baseUrl = "http://51.83.33.196:8000/api/v1/"
//Local
const baseUrl = "http://127.0.0.1:8000/api/v1/"

@Injectable({
  providedIn: 'root'
})

export class PeticionesService {
  private recinto: any[] = [];
  queryBusquedaRecintos: { [key: string]: any } = {};

  private url_crear_token =  'http://127.0.0.1:8000/oauth2/token/';
  private url_obtener_user = baseUrl + 'usuario/token/';
  private url_registrar_user = baseUrl + 'registrar/usuario/';
  private url_recintos_by_duenyo = baseUrl + 'duenyo_recintos/'
  private url_crear_recinto = baseUrl + 'recinto/post/';
  private url_getDuenyorecinto_Id = baseUrl + 'getDuenyorecintoId/';
  private url_consultarReservasDia = baseUrl + 'reservas/'
  private url_horarioRecinto = baseUrl + 'horario/recinto/';
  private url_buscarRecintos = baseUrl + 'recinto/buscar/'
  private url_obtenerRecintoAPI = baseUrl + 'obtener_recinto/'
  private url_obtenerClienteId = baseUrl + 'obtener/cliente/';
  private url_crearReserva = baseUrl + 'crear_reserva/'

  constructor(private http: HttpClient,
    private oauthService: OAuthService
  ) {
    this.initLoginGoogle();
  }

  getToken(): string{
    return sessionStorage.getItem('token') || '';
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }

  getRecintosByDuenyoRecintoId(DuenyoRecintoId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.url_recintos_by_duenyo}${DuenyoRecintoId}/recintos/`, { headers });
  }

  getDuenyorecintoId(usuario_id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.url_getDuenyorecinto_Id}${usuario_id}`, { headers });
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

  createRecinto(data: any): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.url_crear_recinto}`, data, { headers })
    .pipe(
      catchError(error => {
        throw error
      })
    );
  }

  // getrecintos(): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http.get<any>(`http://127.0.0.1:8000/api/v1/recinto/lista`, { headers })
  //     .pipe(
  //       catchError(error => {
  //         throw error;
  //       })
  //     );
  // }

  obtenerReservas(recintoId: number, dia: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.url_consultarReservasDia}${recintoId}/${dia}/`, { headers });
  }

  consultarHorarioRecinto(idRecinto: any): Observable<any> {
    const headers = this.getHeaders()
    return this.http.get<any>(`${this.url_horarioRecinto}`+`${idRecinto}`, { headers })
    .pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  buscarRecintos(query: string): Observable<any> {
    const headers = this.getHeaders();
    const params = { query: query };
    return this.http.get<any>(this.url_buscarRecintos, { headers, params })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  setRecintos(data: any[], query: string): void {
    this.queryBusquedaRecintos['recintos'] = data
    this.queryBusquedaRecintos['query'] = query
  }

  getRecintos(): any {
    console.log(this.queryBusquedaRecintos);
    
    return this.queryBusquedaRecintos;
  }

  setRecinto(data: any[]): void{    
    this.recinto = data
  }

  // setRecinto2(id: any): void{
  //   this.recinto = id
  // }

  delRecinto(): void{
    this.recinto = []
  }

  getRecinto(): any {
    if (Object.keys(this.recinto).length === 0) {
      console.log('El objeto está vacío');
    } else {
      return this.recinto
    }
  }

  obtenerRecintoAPI(id: any){
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.url_obtenerRecintoAPI}`+`${id}`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getClienteId(usuario_id: any){
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.url_obtenerClienteId}`+`${usuario_id}`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  crearReserva(reserva: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.url_crearReserva, reserva, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }
}