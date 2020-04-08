import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  urlApi = 'http://localhost:3000';
  // urlApi = 'https://softwareperu.herokuapp.com';

  constructor(private http: HttpClient) { }

  getProveedor() {
    return this.http.get(`${this.urlApi}/proveedores`);
  }

  postProveedor(model: Proveedor) {
    return this.http.post(`${this.urlApi}/proveedor`, model);
  }

  putProveedor(model: Proveedor) {
    return this.http.put(`${this.urlApi}/proveedor/${model._id}`, model);
  }

  deleteProveedor(id: string) {
    return this.http.delete(`${this.urlApi}/proveedor/${id}`);
  }
}
