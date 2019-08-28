import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable'
import {Data} from './../interface/data'
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
datos: Observable<any>;
dato:Observable<any>;
api='https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) { }
 
obtenerDatos(){
  const path= `${this.api}/todos`;
  return this.http.get<Data>(path);
}
obtenerDato(id:string){
  const path= `${this.api}/todos/${id}`;
  return this.http.get<Data>(path);
}

crearDato(data:Data){
  const path= `${this.api}/todos`;
  return this.http.post(path,data)
}

editarDato(data:Data){
const path=`${this.api}/todos/${data.id}`;
return this.http.put<Data>(path,data)
}


eliminarDato(id:string){
  const path=`${this.api}/todos/${id}`;
  return this.http.delete<Data>(path,)
  }

}
