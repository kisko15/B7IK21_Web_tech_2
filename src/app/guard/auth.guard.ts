import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, takeUntil, takeWhile } from 'rxjs';
import { CrudService } from '../service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private crudService: CrudService
    ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.crudService.isLoggedIn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn || (localStorage.getItem('Token') == null)) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
  }
  
}
