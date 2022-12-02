import { GestionStorageService } from './gestion-almacenamiento.service';
import { IArticulo, Article } from './../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionArticulosService {

  // Se crea e inicializa el array donde se guardan los artículos seleccionados para leer
  private seleccionArticulos: Article [] = [];

  constructor(private gestionAlmacenamiento: GestionStorageService) {

  }

  // Función que añade un artículo al array de seleccion de lectura
  // Primero se comprueba si éste existe ya en el array mediante la llamada a la función localizarArticulo
  agregarArticulo(articulo: Article) {
    let i = this.localizarArticulo(articulo);
    if (i == -1) {
      this.seleccionArticulos.push(articulo);
    }
    console.log(this.seleccionArticulos);
    // También se agregará al almacenamiento local al actualizarlo
    this.gestionAlmacenamiento.setObject("articulos", this.seleccionArticulos);
  }

  // Función que elimina un artículo del array de seleccion de lectura
  // Primero se comprueba si éste existe ya en el array mediante la llamada a la función localizarArticulo
  eliminarArticulo(articulo: Article) {
    let i = this.localizarArticulo(articulo);
    if (i != -1) {
      this.seleccionArticulos.splice(i, 1);
    }
    console.log(this.seleccionArticulos);
    // También se eliminará del almacenamiento local al actualizarlo
    this.gestionAlmacenamiento.setObject("articulos", this.seleccionArticulos);    
  }

  // Función que comprueba si existe ya un artículo en el array de lectura antes de agrgarlo o eliminarlo
  localizarArticulo(articulo: Article) {

    let indice = -1;
    for (let i = 0; i < this.seleccionArticulos.length; i++) {
      if (this.seleccionArticulos[i].title == articulo.title) {
        indice = i;
        break;
      }
    }
    return indice;
  }

  // Función que devuelve el array de los artículos seleccionados para leer
  getArticulos() {
    return this.seleccionArticulos;
  }

  // Función que recupera la información almacenada en local
  recuperarArticulos() {
    let datosPromesa: Promise<Article[]> = this.gestionAlmacenamiento.getObject("articulos");
    datosPromesa.then( datos => {
      this.seleccionArticulos.push(...datos);
    });
  }
}
