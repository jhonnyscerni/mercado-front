import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditalArquivoResponse, NoticeFile } from 'app/models/notice-file';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeFileService {

  private url: string = `${environment.urlbase}/mercado/editais`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  downloadFile(id) {

    const httpOptions = {
      responseType: 'blob' as 'json'
    };
  
    return this.httpClient.get(`${this.url}/${id}/arquivo/url`, httpOptions);
  }

  getFileFromApi(id): Observable<HttpResponse<Blob>> {
    return this.httpClient.get<Blob>(`${this.url}/${id}/arquivo/url`, { observe: 'response', responseType: 'blob' as 'json'});
  }
    

  loadByID(id): Observable<EditalArquivoResponse> {
    return this.httpClient.get<EditalArquivoResponse>(`${this.url}/${id}/arquivo`)
    .pipe(
      catchError(this.serviceError))
  }

  remove(id): Observable<EditalArquivoResponse> {
    return this.httpClient.delete(`${this.url}/${id}/arquivo`)
    .pipe(
      catchError(this.serviceError));
}


  public uploadfile(file: File, descricao: any, id: any) {

    const formData = new FormData();
    formData.append('arquivo', file);
    formData.append('descricao', descricao)
    return this.httpClient.put(this.url + "/"+ id +"/arquivo", formData)
  }

  protected serviceError(response: Response | any) {
    let customError: string[] = [];
    let customResponse = { error: { errors: [] }}

    if (response instanceof HttpErrorResponse) {

        if (response.statusText === "Unknown Error") {
            customError.push("Ocorreu um erro desconhecido");
            response.error.errors = customError;
        }
    }
    if (response.status === 500) {
        customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.");
        
        // Erros do tipo 500 não possuem uma lista de erros
        // A lista de erros do HttpErrorResponse é readonly                
        customResponse.error.errors = customError;
        return throwError(customResponse);
    }

    console.error(response);
    return throwError(response);
}
}

function saveAs(blob: Blob, arg1: string): void {
  throw new Error('Function not implemented.');
}
