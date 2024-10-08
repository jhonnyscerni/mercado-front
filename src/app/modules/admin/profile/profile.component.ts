
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from "app/shared/base-form/base-form.component";
import { User } from "app/models/user";
import { AuthService } from "app/core/auth/auth.service";
import { AlertModalService } from "app/shared/alert-modal.service";
import { UsuarioService } from "app/services/usuario.service";
@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html"
})
export class ProfileComponent extends BaseFormComponent implements OnInit {

  usuario: User = new User()
  idUsuario: number;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private location: Location,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.carregarInfo();
    this.cadastroForm = this.fb.group({
      id: [''],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      grupos: [''],
    });
  }

  carregarInfo(){
    console.log(this.authService.getUsuarioIdAutenticado())
     return this.usuarioService.loadByID(this.authService.getUsuarioIdAutenticado())
        .subscribe(usuario => {
          this.usuario = usuario
          this.updateForm(this.usuario);
          console.log(this.usuario)
        })
  }

  updateForm(usuario) {
    this.cadastroForm.patchValue({
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      password: usuario.password,
      grupos: usuario.grupos
    });
  }

  submit() {
    console.log('submit');

    let msgSuccess;
    let msgError;
    if (this.cadastroForm.value.id) {
      console.log(this.cadastroForm.value);
      msgSuccess = 'Usuário atualizado com sucesso!';
      msgError = 'Erro ao atualizar usuario, tente novamente!';
    }

    this.usuarioService.save(this.cadastroForm.value).subscribe(
      success => {
        //this.alertService.showAlertSuccess(msgSuccess);
        this.toastr.success(msgSuccess, 'Informação :)')
        this.location.back();
      },
      error => 
      //this.alertService.showAlertDanger(msgError),
      this.toastr.error(msgError, 'Opa :(')
    );
  }

  cancelar(){
    this.router.navigate(['/users/meus-cadastros'], { relativeTo: this.route });
  }

}
