import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoticeFile } from 'app/models/notice-file';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticeFileService {

  private url: string = `${environment.urlbase}/mercado/editais`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public uploadfile(file: File, descricao: any, id: any) {

    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('descricao', descricao)
    return this.httpClient.put(this.url + "/"+ id +"/arquivo", formData)
  }
}