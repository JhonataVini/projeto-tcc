import { Curso } from './cursos-lista/curso';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso>  {

  constructor( http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
  loadByID(id) {
    return null;
  }
}
