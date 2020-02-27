import { RouterStateSnapshot, ActivatedRouteSnapshot, CanDeactivate, RouterModule } from '@angular/router';
import { NgModule, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormCanDeactivate } from './form-candeactivate';


@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<FormCanDeactivate> {

        canDeactivate(
            component: FormCanDeactivate,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<boolean>|Promise<boolean>|boolean {

          console.log('guarda de desativação teste');

          // return component.podeMudarRota ? component.podeMudarRota() : true;
          return component.podeDesativar ? component.podeDesativar() : true;
    }
}
class AppModule {}
