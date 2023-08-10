import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'app/models/product';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { ProductService } from 'app/services/product.service';
import { CategoryProductService } from 'app/services/category-product.service';
import { BrandService } from 'app/services/brand.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent extends BaseFormComponent implements OnInit {

  produto: Product;
  idProduto: number;
  categoriasProdutos = [];
  marcasProdutos = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProductService,
    private categoriaProdutoService: CategoryProductService,
    private categoriaMarcaService: BrandService,
    private toastr: ToastrService,
    private location: Location
  ) {
    super();
  }


  ngOnInit(): any {
    this.carregarCategoriaProdutos();
    this.carregarMarcaProdutos();
    this.route.params.subscribe((params: any) => {
      const idProduto = params['idProduto'];
      if (idProduto) {
        const produto$ = this.produtoService.loadByID(idProduto);
        produto$.subscribe((produto) => {
          this.updateForm(produto);
        });
      }
    });
    this.cadastroForm = this.fb.group({
      id: [''],
      codigoExterno: [''],
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      descricao: ['', Validators.required],
      categoriaId: ['', Validators.required],
      marcaId: ['', Validators.required]

    });
  }

  updateForm(produto): any {
    this.cadastroForm.patchValue({
      id: produto.id,
      codigoExterno: produto.codigoExterno,
      nome: produto.nome,
      descricao: produto.descricao,
      categoriaId: produto.categoriaProduto.id,
      marcaId: produto.marcaProduto.id,
    });
  }

  carregarCategoriaProdutos(): any {
    return this.categoriaProdutoService.list()
      .subscribe(categoriasProdutos => this.categoriasProdutos = categoriasProdutos);
  }

  carregarMarcaProdutos(): any {
    return this.categoriaMarcaService.list()
      .subscribe(marcasProdutos => this.marcasProdutos = marcasProdutos);
  }

  submit() {
    let msgSuccess = 'Produto criado com sucesso!';
    let msgError = 'Erro ao criar produto, tente novamente!';
    if (this.cadastroForm.value.id) {
        msgSuccess = 'Produto atualizado com sucesso!';
        msgError = 'Erro ao atualizar produto, tente novamente!';
    }

    this.produtoService.save(this.cadastroForm.value).subscribe(
        (success) => {
            this.toastr.success(msgSuccess, 'Informação :)');
            this.location.back();
        },
        error => this.toastr.error(msgError, 'Opa :(')
    );
  }

  cancelar(): any {
    this.router.navigate(['/produtos/lista'], { relativeTo: this.route });
  }

  lista(): any {
    this.router.navigate(['/produtos/lista'], { relativeTo: this.route });
  }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
}

}
