import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AcervoMapaPage } from '../acervo-mapa/acervo-mapa';
import { AcervoPage } from '../acervo/acervo';

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  constructor(private navCtrl: NavController) {

  }

  openMap(){
    this.navCtrl.push(AcervoMapaPage);
  }

}
