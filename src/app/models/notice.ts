import { Address } from './address';
import { Product } from './product';
import { User } from './user';
export class Notice {
    id?: number;
    numero?: number;
    dataInicio?: Date;
    dataFim?: Date;
    empresa?: User;
    produto?: Product;
    endereco?: Address;
}
