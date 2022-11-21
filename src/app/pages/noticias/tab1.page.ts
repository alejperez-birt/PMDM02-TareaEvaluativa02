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

  articulos: Article[] = [];

  constructor(private leerFichero: HttpClient, public gestionArticulos: GestionArticulosService) {
    this.getArticulosFichero();
  }

  getArticulosFichero() {
    let datosFichero: Observable<IArticulo>;

    datosFichero = this.leerFichero.get<IArticulo>("/assets/datos/articulos.json");

    datosFichero.subscribe(datos => {
      console.log(datos.articles);
      this.articulos.push(...datos.articles);
    });
  }

  seleccion(evento: any, articulo: Article) {
    let seleccion: boolean;
    seleccion = evento.detail.checked;
    
    if (seleccion) {
      console.log("OK");
      this.gestionArticulos.agregarNoticia(articulo);
    } else {
      console.log("NO");
      this.gestionArticulos.eliminarNoticia(articulo);
    }
  }

  marcar(articulo: Article) {
    if (this.gestionArticulos.localizarNoticia(articulo) == -1) {return false} else {return true};
  }

}
