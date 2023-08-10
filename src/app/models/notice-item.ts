import { Brand } from './brand';
import { CategoryProduct } from './category-product';
import { Notice } from './notice';
import { Product } from './product';
import { User } from './user';

export class NoticeItem {
    id?: number;
    especificacao?: string;
    observacao?: string;
    produto?: Product[] = [];;
    edital?: Notice;
    quantidade?: number;
    propostaParcial?: boolean = false;
    peso?: number;
    largura?: number;
    altura?: number;
    profundidade?: number;
    valorMaximo?: number;
}
