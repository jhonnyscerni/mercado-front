import { Address } from './address';
import { Company } from './company';
import { FormPayment } from './form-payment';
import { NoticeItem } from './notice-item';
import { Product } from './product';
import { Regions } from './regions';
export class Notice {
    id?: number;
    titulo?: string;
    numero?: number;
    dataInicio?: Date;
    dataFim?: Date;
    dataExibicao?: Date;
    tempoMaximoEntrega?: number;
    empresa?: Company;
    itens?: NoticeItem[] = [];
    formasPagamento?: FormPayment[] = []
    regioes?: Regions[] = []
    endereco?: Address;
}
