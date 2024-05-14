import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { HeaderComponent } from './header/header.component';
import { RegistroDuenyoComponent } from './registro-duenyo/registro-duenyo.component';
import { HomeDuenyoComponent } from './home-duenyo/home-duenyo.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "registro-cliente", component: RegistroClienteComponent},
  {path: "header", component: HeaderComponent},
  {path: "registro-duenyo", component: RegistroDuenyoComponent},
  {path: "home-duenyo", component: HomeDuenyoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
