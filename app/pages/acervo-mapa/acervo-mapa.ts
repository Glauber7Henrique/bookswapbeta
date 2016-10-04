import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

/**declarar para nao ficar dando erro na class google (js)*/
declare var google: any;


@Component({
  templateUrl: 'build/pages/acervo-mapa/acervo-mapa.html',
})
export class AcervoMapaPage {

  map: any;
  livro: any;

  constructor(private navCtrl: NavController, private params:NavParams, platform: Platform) {
    platform.ready().then(() => {
      this.initPage();
    });
  }

  /** esse metodo pertmite pegar a latitude e longitude ao abrir a tela.*/
  private initPage(){
    this.livro = this.params.get("livro") || {};
    Geolocation.getCurrentPosition().then((resp) => {
      this.loadMap(resp.coords.latitude, resp.coords.longitude);
    }, (onError) =>{
      alert('Não foi possivel receber sua localização. Verifique se o GPS está ligado!')
    });
  }

  private getAddress(latLng, successCallback){
    let geocoder = new google.maps.Geocoder;

    geocoder.geocode({location: latLng}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results [1]) {
          successCallback(results[1].formatted_address);
        }
      }
    });
  }


  private loadMap(lat,lng){
    let latLng = new google.maps.LatLng(lat,lng);

    let mapOpcoes = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    let element = document.getElementById('map');
    let map = new google.maps.Map(element, mapOpcoes);
    let marker = new google.maps.Marker({
      position: latLng,
      color: '#042C62'
    });

    marker.setMap(map);

    this.getAddress(latLng, address => {
      alert(address);
    })
  }
}
