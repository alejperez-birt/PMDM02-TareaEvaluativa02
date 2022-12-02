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


  constructor(private servidorRest: HttpClient, public gestionArticulos: GestionArticulosService) {
    // Se llama a la función que recoge los articulos del servidor Rest
    gestionArticulos.recuperarArticulos();
    this.getArticulosRest("general");
  }


  // Función que recoge los articulos del servidor Rest
  getArticulosRest(categoria: string) {
    this.articulos = [];
    // Se crea el Observable y nos suscribimos a él
    let datosServidorRest: Observable<IArticulo>;

    // Se hace la consuta Rest que nos devuelva todos los articulos de la categoria correspondiente
    var url = "https://newsapi.org/v2/top-headlines?category=" + categoria + "&sortBy=publishedAt&apiKey=ed6be1723ecb4872a86aa1acab7295c3";
    datosServidorRest = this.servidorRest.get<IArticulo>(url);

    datosServidorRest.subscribe(datos => {
      // Se añaden al array los articulos recogidos
      this.articulos.push(...datos.articles);
    });
  }


  // Función a la que se llama cada vez que se modifica ion-segment
  segmentChanged(evento: any) {
    console.log(evento.detail.value);
    // Se llama a la función que lanza la petición http con el valor del ion-segment-button seleccionado como parámetro
    this.getArticulosRest(evento.detail.value);
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
