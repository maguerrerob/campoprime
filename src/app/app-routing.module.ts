import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ServicioscampoprimeComponent } from './servicioscampoprime/servicioscampoprime.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "listar_servicios", component: ServicioscampoprimeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
