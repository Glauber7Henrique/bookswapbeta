import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Fire } from '../../util/fire';
import { Cadastro } from '../../util/cadastrolivro';
//apartir daqui!
import { BarcodeScanner } from 'ionic-native';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
//até aqui!

@Component({
  templateUrl: 'build/pages/acervocad/acervocad.html',
})
export class AcervocadPage {
  IsbnCod: string;
  Cancel: boolean;
  DadosLivro: any;
  Url: string;
  Titulo: string;
  Autor: string;
  Sinopse: string;
  CapaLivro: string;
  FormatoCodBar: string;
  TxtTitulo: string;
  TxtAutor: string;
  TxtGenero: string;

  constructor(private navCtrl: NavController, public fire: Fire, public http: Http) {
  }
  salvaLivro(){
    this.fire.cadastraLivro(this.TxtTitulo, this.TxtAutor, this.TxtGenero).then(() =>{
      alert('O livro "' + this.TxtTitulo + '" foi cadastrado com sucesso!')
      this.TxtTitulo = ""
      this.TxtAutor = ""
      this.TxtGenero = ""

    }, error =>{
      alert('Não foi possivel cadastrar o livro. Tente novamente mais tarde.')
    })

  }

  scan(){
    var json: any;
    var IsbnCod: any;
    BarcodeScanner.scan().then(barcodeData =>{
      this.IsbnCod = barcodeData.text;
      this.Cancel = barcodeData.cancelled;
      this.FormatoCodBar = barcodeData.format;
      this.consultaBooksApi(this.IsbnCod);
    },(err) =>{
      console.log
    });
    //this.consultaBooksApi();
  }
  consultaBooksApi(IsbnCodQry: string){
    let url = 'https://www.googleapis.com/books/v1/volumes?q=ISBN:' + IsbnCodQry; // + '&projection=lite';
    this.http.get(url).map(res => res.json()).subscribe(data => {
        //this.dadosLivro = data.items[0].volumeInfo.title;
        this.DadosLivro = data.items[0].volumeInfo;
        //this.capaLivro = this.dadosLivro.imageLinks.thumbnail;
        this.TxtTitulo = this.DadosLivro.title;
        this.TxtAutor = this.DadosLivro.authors[0];
        //this.TxtSinopse = this.DadosLivro.description;
    }

  );

  }


}
