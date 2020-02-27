import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'requests-http';

  mostrarMenu = false;

    constructor(private authService: AuthService) {

    }

    ngOnInit() {
      this.authService.mostrarMenuEmitter.subscribe(
        mostrar => this.mostrarMenu = mostrar
      );
    }
}
