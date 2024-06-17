import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { HeaderComponent } from './header/header.component';
import { RegistroDuenyoComponent } from './registro-duenyo/registro-duenyo.component';
import { HomeDuenyoComponent } from './home-duenyo/home-duenyo.component';
import { LayoutComponent } from './layout/layout.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CreacionRecintoComponent } from './creacion-recinto/creacion-recinto.component';
import { BusquedaAvanzadaComponent } from './busqueda-avanzada/busqueda-avanzada.component';
import { ListaRecintosComponent } from './lista-recintos/lista-recintos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroClienteComponent,
    HeaderComponent,
    RegistroDuenyoComponent,
    HomeDuenyoComponent,
    LayoutComponent,
    CreacionRecintoComponent,
    BusquedaAvanzadaComponent,
    ListaRecintosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
