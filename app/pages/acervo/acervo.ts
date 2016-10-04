import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AcervocadPage } from '../acervocad/acervocad';
import { Fire } from '../../util/fire';
import { AcervoMapaPage } from '../acervo-mapa/acervo-mapa';

@Component({
  templateUrl: 'build/pages/acervo/acervo.html',
})
export class AcervoPage {
  listalivros: any = [];

  constructor(private navCtrl: NavController, private livros: Fire) {
    this.initPage();


  }
    initPage(){
      this.livros.getAcervo(livros =>{
        this.listalivros.push(livros);
      })
    }

    openCadastro(){
      this.navCtrl.push(AcervocadPage);
    }
    openMap(acervo){
      this.navCtrl.push(AcervoMapaPage, { acervo });
    }
  }
