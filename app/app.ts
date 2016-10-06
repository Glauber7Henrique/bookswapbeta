import { Component } from '@angular/core';
import { NavController, ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LoginPage } from './pages/login/login';
import { Fire } from "./util/fire";
import { HomePage } from './pages/home/home';
import { AcervoMapaPage } from './pages/acervo-mapa/acervo-mapa';
import { AcervoPage } from './pages/acervo/acervo';
import { AcervocadPage } from './pages/acervocad/acervocad';
import { Splashscreen } from 'ionic-native';
import { BarcodescannerPage } from './pages/barcodescanner/barcodescanner';
import { Cadastro } from './util/cadastrolivro';


@Component({
  templateUrl: 'build/app.html'
  //template: '<ion-nav [root]="rootPage"></ion-nav>''
})

export class MyApp {
  home: any = HomePage;
  acervo: any = AcervoPage;
  login: any = LoginPage;
  scanner: any = BarcodescannerPage;
  rootPage: any = HomePage;//this.login;


  //rootPage: any = HomePage;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      Splashscreen.hide();
      StatusBar.styleDefault();
    });
  }

  openPage(page){
    this.rootPage = page;
  }
}

ionicBootstrap(MyApp, [Fire], [Cadastro]);
