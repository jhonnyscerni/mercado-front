import { UnitMeasure } from '../models/unit-measure';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'app/core/services/crud-service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitMeasureService extends CrudService<UnitMeasure> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/mercado/unidade-medidas`);
  }

}
