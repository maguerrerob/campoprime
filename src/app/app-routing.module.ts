import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { HeaderComponent } from './header/header.component';
import { RegistroDuenyoComponent } from './registro-duenyo/registro-duenyo.component';
import { HomeDuenyoComponent } from './home-duenyo/home-duenyo.component';
import { CreacionRecintoComponent } from './creacion-recinto/creacion-recinto.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "registro-cliente", component: RegistroClienteComponent},
  {path: "registro-duenyo", component: RegistroDuenyoComponent},
  {path: "header", component: HeaderComponent},
  {path: "home", component: HomeComponent},
  {path: "home-duenyo",component: HomeDuenyoComponent},
  {path: 'creacion-recinto', component: CreacionRecintoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
