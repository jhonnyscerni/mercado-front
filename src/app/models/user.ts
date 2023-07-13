import { Role } from './role';
import { Company } from './company';
export class User {
    id?: number;
    username?: string;
    email?: string;
    telefone?: string;
    password?: string;
    tipoUsuario?: string;
    statusUsuario?: string;
    empresa?: Company;
    grupos?: Role[] = [];
}
