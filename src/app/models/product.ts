import { Brand } from './brand';
import { CategoryProduct } from './category-product';
import { Company } from './company';
import { User } from './user';

export class Product {
    id?: number;
    codigoExterno?: string;
    nome?: string;
    descricao?: string;
    empresa?: Company;
    categoriaProduto?: CategoryProduct;
    marcaProduto?: Brand;
}
