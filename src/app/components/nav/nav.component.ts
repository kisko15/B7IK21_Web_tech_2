import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn$?: Observable<boolean>;

  constructor(
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.crudService.isLoggedIn;
  }

  logout() {
    localStorage.removeItem('Token');
    this.crudService.setLoggedIn(false);
    this.router.navigate([ '/login' ]);
  }

}
