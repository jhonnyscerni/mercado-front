import { Address } from './address';
import { Product } from './product';
import { User } from './user';
export class Notice {
    id?: number;
    titulo?: string;
    numero?: number;
    dataInicio?: Date;
    dataFim?: Date;
    empresa?: User;
    produtos?: Product[] = [];;
    endereco?: Address;
}
