import { Notice } from "./notice";
import { User } from "./user";

export class Sale {
    id?: number;
    valorLance?: number;
    empresa?: User;
    notice?: Notice;
}
