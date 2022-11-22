import { HttpClient } from '@angular/common/http';
import { GestionArticulosService } from './../../services/gestion-articulos.service';
import { Component } from '@angular/core';
import { IArticulo, Article } from './../../interfaces/interfaces';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // Se crea e inicializa el array de todos los articulos
  articulos: Article[] = [];

  constructor(private leerFichero: HttpClient, public gestionArticulos: GestionArticulosService) {
    // Se llama a la función que recoge los articulos del archivo JSON
    this.getArticulosFichero();
  }

  // Función que recoge todos los articulos del archivo JSON
  getArticulosFichero() {
    // Se crea el Observable y nos suscribimos a él
    let datosFichero: Observable<IArticulo>;

    datosFichero = this.leerFichero.get<IArticulo>("/assets/datos/articulos.json");

    datosFichero.subscribe(datos => {
      // Se añaden al array los articulos recogidos
      console.log(datos.articles);
      this.articulos.push(...datos.articles);
    });
  }

  // Función a la que se llama cada vez que se modifica uno de los CheckBox
  seleccion(evento: any, articulo: Article) {
    // Se guarda el estado de la selección del CheckBox
    let seleccion: boolean;
    seleccion = evento.detail.checked;
    
    // Si se ha marcado se llama a la función agregarArticulo del servicio
    // Si se ha desmarcado se llama a la función eliminarArticulo del servicio
    // En ambos casos se pasa como parámetro el articulo sobre el que se ha hecho selección
    if (seleccion) {
      console.log("OK");
      this.gestionArticulos.agregarArticulo(articulo);
    } else {
      console.log("NO");
      this.gestionArticulos.eliminarArticulo(articulo);
    }
  }

  // Función que indica si un articulo está marcado o no al mostrar el listado de todos los articulos
  marcar(articulo: Article) {
    if (this.gestionArticulos.localizarArticulo(articulo) == -1) {return false} else {return true};
  }

}
