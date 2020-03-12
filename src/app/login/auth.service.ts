import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mostrarMenuEmitter = new EventEmitter<boolean>();
  private usuarioAuth = false;

  constructor(private router: Router) { }
   fazerLogin(usuario: Usuario) {

    if (usuario.nome === 'usuario@email.com' &&
    usuario.senha === '123456') {

    this.usuarioAuth = true;
    this.mostrarMenuEmitter.emit(true);
    this.router.navigate(['/busca-reativa']);
  } else {
      this.usuarioAuth = false;
      this.mostrarMenuEmitter.emit(false);
      this.router.navigate(['/login']);
    }
   }
   usuarioEstaAutenticado() {
    return this.usuarioAuth;
   }
}
