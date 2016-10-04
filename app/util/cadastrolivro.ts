import { Fire } from './fire';
import { Injectable } from '@angular/core';

@Injectable()
export class Cadastro {
  firebase: any;

  constructor(fire: Fire){
    this.firebase = fire.getDB();
  }

  cadastraLivro(){
    //var titulo = titulo;
    //var autor = autor;
    //genero = genero;

    let ref = this.firebase.database().ref('users');

    return ref.child('livros').push({
      titulo: 'titulo',
      autor: 'autor',
      genero: 'Genero'
    });
  }



}
