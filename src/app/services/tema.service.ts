import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { Tema } from '../models/tema.model';
import { catchError } from 'rxjs/operators';

const baseUrl = 'http://localhost:4200/api/temas'

@Injectable({
  providedIn: 'root'
})

export class TemaService {

  constructor(private http: HttpClient) { }
   
  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(baseUrl);
  }
  get(id: any): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}/${id}`);
  }
  
  create(data: any): Observable<any> {
	console.log(data);
	const formData = new FormData();
	formData.append('title', <string>data.title);
    formData.append('status', <string>data.status);
	formData.append('content', <string>data.content);
    return this.http.post(`${baseUrl}`, data, {responseType: 'text'});
  }
  update(id: any, data: Tema): Observable<any> {
	const bodyData = {
		"id": id,
    	"nombre": data.nombre,
		"duracion": data.duracion ,
	};
    return this.http.put(`${baseUrl}`, bodyData, {responseType: 'text'});
  }
 
   delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            if (error.error.includes('foreign key constraint fails')) {
              return throwError('No se puede eliminar el tema porque está siendo referenciado en otras tablas.');
            }
          }
          return throwError('Ocurrió un error al intentar eliminar el tema.');
        })
      );
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  
  findByTitle(nombre: any): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}?nombre=${nombre}`);
  }

}