import { Component, OnInit } from '@angular/core';
import { ProveedorService } from './services/proveedor.service';
import { finalize } from 'rxjs/operators';
import { Proveedor } from './models/proveedor.model';
import * as firebase from 'firebase/app';
import 'firebase/storage';

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
  firebaseConfig: any;
  fileUpload: File;
  progress: number;

  constructor(
    public proveedorService: ProveedorService
  ) { }

  ngOnInit() {
    this.getProveedor();
    const firebaseConfig = {
      apiKey: 'AIzaSyAsNxovvglLZbJHc33oqTCektT1NSBhj_I',
      authDomain: 'example01-b13aa.firebaseapp.com',
      databaseURL: 'https://example01-b13aa.firebaseio.com',
      projectId: 'example01-b13aa',
      storageBucket: 'example01-b13aa.appspot.com',
      messagingSenderId: '746085742941',
      appId: '1:746085742941:web:fbbb347671a886797950b4',
      measurementId: 'G-FC16NJ2TSQ'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }


  updateProveedor(model: Proveedor) {
    const x = new Proveedor();
    x._id = model._id;
    x.nombres = model.nombres;
    x.apellidos = model.apellidos;
    x.dni = model.dni;
    x.foto = model.foto;
    this.proveedor = x;
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
      .pipe(
        finalize(() => {
          this.initProveedor();
          this.update = false;
        })
      )
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

  uploadFoto() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const nameFile = `${month}${day}${minute}${second}`;
    const storageRef = firebase.storage().ref();
    const upload = storageRef.child('fotos/' + `${nameFile}`)
      .put(this.fileUpload);

    upload.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.progress = progress;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    }, (error) => {
      console.error(error);
    }, () => {
      upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.proveedor.foto = downloadURL;
      });
    });
  }

  selectFoto(img) {
    this.fileUpload = img.srcElement.files[0];
    this.uploadFoto();
  }

  cancel() {
    this.initProveedor();
    this.update = false;
  }

  initProveedor() {
    this.proveedor = new Proveedor('', '', '', '');
    this.progress = 0;
  }
}
