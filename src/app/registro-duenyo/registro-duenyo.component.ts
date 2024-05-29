import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from '../servicios/peticiones.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro-duenyo',
  templateUrl: './registro-duenyo.component.html',
  styleUrl: './registro-duenyo.component.scss'
})
export class RegistroDuenyoComponent{
  @Output() datosFromChild = new EventEmitter();
  first_name!: string
  // username: string="";
  // email: string="";
  // pass1: string="";
  // pass2: string="";
  // f_name: string="";
  // l_name: string="";
  // rol: string ="";
  // telefono: string="";
  public registerForm: FormGroup;
  registerSuccess: boolean = false;

  constructor(private router: Router,
    private registroDuenyo: PeticionesService,
    public fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      pass1: new FormControl('', Validators.required),
      pass2: new FormControl('', Validators.required),
      f_name: new FormControl('', Validators.required),
      l_name: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required)
    })
  }

    registroFormulario() {
      if (this.registerForm.valid){
        const dataSignUp = {
          username: this.registerForm.value.username,
          email: this.registerForm.value.email,
          first_name: this.registerForm.value.f_name,
          last_name: this.registerForm.value.l_name,
          password1: this.registerForm.value.pass1,
          password2: this.registerForm.value.pass2,
          rol: "3",
          telefono: this.registerForm.value.telefono,
        };
        
        this.registroDuenyo.registroService(dataSignUp).subscribe(
          response => {

            const user = {usuario:response.username, pass:response.password};
            this.registroDuenyo.loginUsuario(user).subscribe((data) =>{
              sessionStorage.setItem('token', data.access_token);
              
              this.iniciarSesion()
            })
          },
          error => {
            console.log('Registration error: ', error);
          }
        );
      }
    }
    
    iniciarSesion(){
      this.registroDuenyo.getUserLogged(sessionStorage.getItem('token')).subscribe((data) =>{
        this.first_name = data.first_name
        this.shareFirstName()
        this.registerSuccess = true
        setTimeout(() => {
          this.router.navigate(['/home-duenyo']);
        }, 1000);
      })
    }

    shareFirstName() {
      // Se usa método emit para compartir al padre
      this.datosFromChild.emit(this.first_name)
    }
}