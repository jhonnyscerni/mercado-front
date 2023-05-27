import { environment } from './../../environments/environment';
import { Role } from '../models/role';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CrudService} from '../core/services/crud-service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService<Role> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/mercado/grupos`);
  }

}
