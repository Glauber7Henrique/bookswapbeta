import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/barcodescanner/barcodescanner.html',
})
export class BarcodescannerPage {

  isbncod: string;
  cancel: boolean;
  dadosLivro: any;
  url: string;
  titulo: string;
  autor: string;
  sinopse: string;
  capaLivro: string;
  formatocb: string;

  constructor(private navCtrl: NavController, public http: Http) {

  }
  scan(){
    var json: any;
    var isbncod: any;
    BarcodeScanner.scan().then(barcodeData =>{
      this.isbncod = barcodeData.text;
      this.cancel = barcodeData.cancelled;
      this.formatocb = barcodeData.format;
      this.consultaBooksApi(this.isbncod);
    },(err) =>{
      console.log
    });
    //this.consultaBooksApi();
  }
  consultaBooksApi(isbn: any){
    let url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn; // + '&projection=lite';
    this.http.get(url).map(res => res.json()).subscribe(data => {
        //this.dadosLivro = data.items[0].volumeInfo.title;
        this.dadosLivro = data.items[0].volumeInfo;
        //this.capaLivro = this.dadosLivro.imageLinks.thumbnail;
        this.titulo = this.dadosLivro.title;
        this.autor = this.dadosLivro.authors[0];
        this.sinopse = this.dadosLivro.description;
    });

  }

}
