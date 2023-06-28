import { Brand } from './brand';
import { CategoryProduct } from './category-product';
import { User } from './user';

export class Product {
    id?: number;
    tipoUnidade?: string;
    nome?: string;
    ativo?: boolean;
    descricao?: string;
    peso?: number;
    largura?: string;
    altura?: string;
    profundidade?: string;
    valorVenda?: string;
    qtdEstoque?: string;
    qtdeAlertaEstoque?: string;
    empresa?: User;
    categoriaProduto?: CategoryProduct;
    marcaProduto?: Brand;
}
