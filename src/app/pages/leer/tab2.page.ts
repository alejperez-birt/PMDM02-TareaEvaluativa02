import { Component, Input } from '@angular/core';
import { GestionArticulosService } from './../../services/gestion-articulos.service';
import { Article } from './../../interfaces/interfaces';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @Input() articulo: Article = {} as Article;

  constructor(public gestionArticulos: GestionArticulosService, public alertController: AlertController) {}


  async confirmar(articulo: Article) {
    console.log(articulo);
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Deseas eliminar este articulo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirmado');
            console.log(articulo);
            this.gestionArticulos.eliminarNoticia(articulo);
          }
        }
      ]
    });
    await alert.present();
  }
}
