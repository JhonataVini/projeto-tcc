import { tap, map, filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any>;
  total: number;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      tap(value => console.log(value))
    ).subscribe();

    if (this.authService.usuarioEstaAutenticado()) {
      this.router.navigate(['/busca-reativa']);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;
    // tslint:disable-next-line: no-conditional-assignment
    if (value && (value = value.trim()) !== '') {
      const params_ = {
        search: value,
        fields
      };

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);

      this.results$ = this.http.get(this.SEARCH_URL, {params})
    .pipe(
      tap((res: any) => this.total = res.total),
      map((res: any) => res.results)
    );
    }
  }

}
