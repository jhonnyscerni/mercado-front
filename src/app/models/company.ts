import { Role } from './role';
import { Address } from './address';
export class Company {
    id?: number;
    razaoSocial?: string;
    nomeFantasia?: string;
    cnpj?: string;
    inscEstadual?: string;
    inscMunicipal?: string;
    categoria?: string;
    email?: string;
    telefone?: string;
    enderecos?: Address;
}
