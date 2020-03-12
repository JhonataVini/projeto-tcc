import { AuthService } from './../login/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, CanDeactivate } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    teste: any;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  pesquisa() {
     if (this.authService.usuarioEstaAutenticado()) {
       this.router.navigate(['/busca-reativa']);
       return true;
     }
     this.router.navigate(['/login']);
     return false;
  }

}
