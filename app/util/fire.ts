import {Injectable} from "@angular/core";
import { AcervocadPage } from '../pages/acervocad/acervocad';

declare var firebase: any; /** para nao dar erro no firebase.initializeApp!*/

@Injectable()
export class Fire{
  user: any = {};
  firedb: any;
  /** ABAIXO, CODIGO JAVA SCRIPT PRA CONVERSAR COM O FIREBASE! */
  constructor() {
    var config = {
        apiKey: "AIzaSyDem_rxwGRChbsO036tY60BXzyetcMrxUk",
        authDomain: "bookswap-ad352.firebaseapp.com",
        databaseURL: "https://bookswap-ad352.firebaseio.com",
        storageBucket: "bookswap-ad352.appspot.com",
      };

    /**var config = {
      apiKey: "AIzaSyCYKHvHvqpYSbMlSmo73nnsWnVmpXZNYv0",
      authDomain: "bookswap-teste.firebaseapp.com",
      databaseURL: "https://bookswap-teste.firebaseio.com",
      storageBucket: "bookswap-teste.appspot.com",
    };*/

    firebase.initializeApp(config);
  }

  /** ABAIXO, MÉTODO PARA USAR A AUTENTICAÇÃO DO FACEBOOK (ID DO USUARIO retirada atraves do facebook-login.ts), PARA ACESSAR O FIREBIRD (desta forma, só quem estiver logado consegue acessar o bd do firebird)  */

  login(token: string, successCallback, errorCallback){
    let credencial = firebase.auth.FacebookAuthProvider.credential(token);

    firebase.auth().signInWithCredential(credencial).then(response => {
      this.setUser(token, response.providerData[0]); /** Atenção aqui!*/
      successCallback();
    }, error => {
      errorCallback(error);
    })
  }

/** Método abaixo retorna as informações do usuario e coloca ele em uma tupla para armazenar posteriormente na base de dados do FireBase*/
  getDB(){
    return firebase;
  }

  private setUser(token: string, authData: any){
    this.user.name = authData.displayName;
    this.user.photo = authData.photoURL;
    this.user.ID = authData.uid;
    this.user.token = token;

    this.saveUser(); /** após pegar informações, automaticamente jogar chamar o método saveUser para jogar no BD.*/
  }


  /**Método abaixo insere as informações retiradas do metodo setUser no banco de dados do fireBase*/

  private saveUser(){
    firebase.database().ref('users').child(this.user.ID).set({ //tirei o set
      name: this.user.name,
      photo: this.user.photo
      }); /**local no banco onde essa info será armazenada*/

  }

  cadastraLivro(titulo: string, autor: string, genero: string){

    let ref = firebase.database().ref('livros/' + this.user.ID);
    let displayData = new Date().toLocaleDateString();
    return ref.child('meuslivros').push({
      titulo: titulo,
      autor: autor,
      genero: genero,
      datacadastro: displayData,
    });
  }

  getAcervo(successCallback){
    let db = firebase.database().ref('livros/' + this.user.ID).child('meuslivros');

    db.on("child_added", (snapshot) => {
      let livros  = snapshot.val();

        successCallback(livros);
    });

  }


}
