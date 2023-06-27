import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProduct } from 'app/models/category-product';
import { CategoryProductService } from 'app/services/category-product.service';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-product-form',
  templateUrl: './category-product-form.component.html',
  styleUrls: ['./category-product-form.component.scss']
})
export class CategoryProductFormComponent extends BaseFormComponent implements OnInit{
    categoriaProduto: CategoryProduct;
    idCategoriaProduto: number;

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private categoriaProdutoService: CategoryProductService,
        private toastr: ToastrService,
      ) {
        super();
      }

      ngOnInit(): any {
        this.route.params.subscribe((params: any) => {
          const idCategoriaProduto = params['idCategoriaProduto'];
          if (idCategoriaProduto) {
            const categoriaProduto$ = this.categoriaProdutoService.loadByID(idCategoriaProduto);
            categoriaProduto$.subscribe((categoriaProduto) => {
              this.updateForm(categoriaProduto);
            });
          }
        });
            this.cadastroForm = this.fb.group({
          id: [''],
          nomeDesc: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(250),
            ],
          ]
        });
      }

      updateForm(categoriaProduto): any {
        this.cadastroForm.patchValue({
          id: categoriaProduto.id,
          nomeDesc: categoriaProduto.nomeDesc
        });
      }

      submit(): any {
        //console.log('submit');

        let msgSuccess = 'Categoria Produto criado com sucesso!';
        let msgError = 'Erro ao criar categoria produto, tente novamente!';
        if (this.cadastroForm.value.id) {
          //console.log(this.cadastroForm.value);
          msgSuccess = 'categoria produto atualizado com sucesso!';
          msgError = 'Erro ao atualizar categoria produto, tente novamente!';
        }

        this.categoriaProdutoService.save(this.cadastroForm.value).subscribe(
          (success) => {
            this.toastr.success(msgSuccess, 'Informação :)');
            this.location.back();
          },
          error =>
          //this.alertService.showAlertDanger(msgError),
          this.toastr.error(msgError, 'Opa :(')
        );
      }

      cancelar(): any {
        this.router.navigate(['/categoria-produtos/lista'], { relativeTo: this.route });
      }

      listaMarcas(): any{
        this.router.navigate(['/categoria-produtos/lista'], { relativeTo: this.route });
      }

}
