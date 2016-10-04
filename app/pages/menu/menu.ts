import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AcervoPage } from '../acervo/acervo';

@Component({
  templateUrl: 'build/pages/menu/menu.html',
})
export class MenuPage {
  rootPage: any = HomePage;
  home: any = HomePage;
  acervo: any = AcervoPage;

  constructor(private navCtrl: NavController) {

  }

    onMenu(page){
      this.rootPage = page;
    }
}
