import { Role } from './role';
import { Address } from './address';
export class User {
    id?: number;
    username?: string;
    razaoSocial?: string;
    nomeFantasia?: string;
    cnpj?: string;
    enderecos?: Address[] = [];
    inscEstadual?: string;
    inscMunicipal?: string;
    categoria?: string;
    email?: string;
    telefone?: string;
    tipoUsuario?: string;
    statusUsuario?: string;
    password?: string;
    grupos?: Role[] = [];
}
