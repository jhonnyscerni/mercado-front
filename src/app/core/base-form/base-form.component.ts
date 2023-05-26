import {Component, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';

@Component({
    template: ''
})
export abstract class BaseFormComponent implements OnInit {

  cadastroForm: FormGroup;

  formResult: string = '';

  errors: any[] = [];

  mudancasNaoSalvas: boolean;

  constructor() { }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ngOnInit() {
  }

  abstract submit();

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/member-ordering
  onSubmit() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.formResult = JSON.stringify(this.cadastroForm.value);
      console.log(this.formResult);
      this.submit();
    } else {
      console.log('formulario invalido');
      //this.verificaValidacoesForm(this.cadastroForm);
    }
  }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/member-ordering
    verifierValidatesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verifierValidatesForm(controle);
      }
    });
  }


    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/member-ordering
  verifierValidTouched(campo: string) {
    return (
      !this.cadastroForm.get(campo).valid &&
      (this.cadastroForm.get(campo).touched || this.cadastroForm.get(campo).dirty)
    );
  }

  // verificaEmailInvalido() {
  //   const campoEmail = this.cadastroForm.get('email');
  //   if (campoEmail.errors) {
  //     return campoEmail.errors['email'] && campoEmail.touched;
  //   }
  // }

  // verificaRequired(campo: string) {
  //   return (
  //     this.cadastroForm.get(campo).hasError('required') &&
  //     (this.cadastroForm.get(campo).touched || this.cadastroForm.get(campo).dirty)
  //   );
  // }

  // aplicaCssErro(campo: string) {
  //   return {
  //     'has-error': this.verifierValidTouched(campo),
  //     'has-feedback': this.verifierValidTouched(campo)
  //   };
  // }


}
