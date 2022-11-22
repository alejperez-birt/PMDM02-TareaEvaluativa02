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

  constructor() {

  }

  // Función que añade un artículo al array de seleccion de lectura
  // Primero se comprueba si éste existe ya en el array mediante la llamada a la función localizarArticulo
  agregarArticulo(articulo: Article) {
    let i = this.localizarArticulo(articulo);
    if (i == -1) {
      this.seleccionArticulos.push(articulo);
    }
    console.log(this.seleccionArticulos);
  }

  // Función que elimina un artículo del array de seleccion de lectura
  // Primero se comprueba si éste existe ya en el array mediante la llamada a la función localizarArticulo
  eliminarArticulo(articulo: Article) {
    let i = this.localizarArticulo(articulo);
    if (i != -1) {
      this.seleccionArticulos.splice(i, 1);
    }
    console.log(this.seleccionArticulos);
  }

  // Función que comprueba si existe ya un artículo en el array de lectura antes de agrgarlo o eliminarlo
  localizarArticulo(articulo: Article) {
    let encontrado: any = this.seleccionArticulos.find(
      function(art) { 
        return art == articulo;
      }
    );

    let i = this.seleccionArticulos.indexOf(encontrado);
    return i;
  }

  // Función que devuelve el array de los artículos seleccionados para leer
  getArticulos() {
    return this.seleccionArticulos;
  }
}
