import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private crudService: CrudService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin(): any {
    this.crudService.userLogin(this.loginForm.value)
    .subscribe({
      next: (data: any) => {
        let token = data.token;
        localStorage.setItem('Token', token);
        this.crudService.setLoggedIn(true);
        this.ngZone.run(() => this.router.navigateByUrl('/'));
      },   
      error: (err: any) => console.log(err),
      complete: () => console.info('Data added successfully!')
    });
  }

  getErrorMessageEmail(err: any) {
    if (err.hasError('required')) {
      return 'Kötelezően kitöltendő mező!';
    } else if(err.hasError('email')) {
      return 'Nem megfelelő formátum!';
    }
    return '';
  }

  getErrorMessagePassword(err: any) {
    if (err.hasError('required')) {
      return 'Kötelezően kitöltendő mező!';
    } else if(err.hasError('minLength')) {
      return 'Jelszó hossza minimum 6 karakter!';
    }
    return '';
  }

}
