import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';



const baseUrl = 'http://localhost:4200/api/alumnos';

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(baseUrl);
  }
  get(id: any): Observable<Alumno> {
    return this.http.get<Alumno>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
	const formData = new FormData();
	formData.append('title', <string>data.title);
    formData.append('status', <string>data.status);
	formData.append('content', <string>data.content);
    return this.http.post(`${baseUrl}`, data, {responseType: 'text'});
  }
   update(id: any, data: Alumno): Observable<any> {
	const bodyData = {
		"id": id,
    	"nombre": data.nombre,
    	"fechaNacimiento": data.fechaNacimiento
	};
    return this.http.put(`${baseUrl}`, bodyData, {responseType: 'text'});
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, { responseType: 'text' })
  }
  
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(nombre: any): Observable<Alumno> {
    return this.http.get<Alumno>(`${baseUrl}?nombre=${nombre}`);
  }
}
