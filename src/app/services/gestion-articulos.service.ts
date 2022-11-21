import { IArticulo, Article } from './../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionArticulosService {

  private seleccionNoticias: Article [] = [];

  constructor() {

  }

  agregarNoticia(articulo: Article) {
    let i = this.localizarNoticia(articulo);
    if (i == -1) {
      this.seleccionNoticias.push(articulo);
    }

    console.log(this.seleccionNoticias);
  }

  eliminarNoticia(articulo: Article) {
    let i = this.localizarNoticia(articulo);
    if (i != -1) {
      this.seleccionNoticias.splice(i, 1);
    }
    console.log(this.seleccionNoticias);
  }

  localizarNoticia(articulo: Article) {
    let encontrado: any = this.seleccionNoticias.find(
      function(art) { 
        return art == articulo;
      }
    );

    let i = this.seleccionNoticias.indexOf(encontrado);
    return i;
  }

  getNoticias() {
    return this.seleccionNoticias;
  }
}
