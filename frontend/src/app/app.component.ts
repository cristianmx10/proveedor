import { Component, OnInit } from '@angular/core';
import { ProveedorService } from './services/proveedor.service';
import { finalize } from 'rxjs/operators';
import { Proveedor } from './models/proveedor.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  proveedores: Proveedor[];
  proveedor: Proveedor = {};
  update: boolean;

  constructor(
    public proveedorService: ProveedorService
  ) { }

  ngOnInit() {
    this.getProveedor();
  }

  createProveedor() {

  }

  updateProveedor(model: Proveedor) {
    this.proveedor = model;
    this.update = true;
  }

  getProveedor() {
    this.proveedorService.getProveedor()
      .subscribe(
        (data: Proveedor[]) => this.proveedores = data,
        (error) => console.error(error)
      );
  }

  postProveedor() {
    this.proveedorService.postProveedor(this.proveedor)
      .pipe(
        finalize(() => this.initProveedor())
      )
      .subscribe(
        (data: Proveedor) => this.getProveedor(),
        (error) => console.error(error)
      );
  }

  putProveedor() {
    this.proveedorService.putProveedor(this.proveedor)
      .subscribe(
        (data: Proveedor) => this.getProveedor(),
        (error) => console.error(error)
      );
  }

  deleteProveedor(id: string) {
    this.proveedorService.deleteProveedor(id)
      .subscribe(
        (data: Proveedor) => this.getProveedor(),
        (error) => console.error(error)
      );
  }

  cancel() {
    this.initProveedor();
    this.update = false;
  }

  initProveedor() {
    this.proveedor = new Proveedor('', '', '', '', '');
  }
}
