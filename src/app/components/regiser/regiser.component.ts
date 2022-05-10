import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-regiser',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.css']
})
export class RegiserComponent implements OnInit {

  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone_number: ['', Validators.compose([Validators.required, Validators.pattern(/((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/g)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });

  get name() {
    return this.registerForm.get('name');
  }

  get phone_number() {
    return this.registerForm.get('phone_number');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onRegister(): any {
    this.crudService.createNewUser(this.registerForm.value)
    .subscribe({
      next: () => this.ngZone.run(() => this.router.navigateByUrl('/login')),
      error: (err: any) => console.log(err),
      complete: () => console.info('Data added successfully!')
    });
  }

  getErrorMessageName(err: any) {
    if (err.hasError('required')) {
      return 'Kötelezően kitöltendő mező!';
    } 
    return '';
  }

  getErrorMessageEmail(err: any) {
    if (err.hasError('required')) {
      return 'Kötelezően kitöltendő mező!';
    } else if(err.hasError('email')) {
      return 'Nem megfelelő formátum!';
    }
    return '';
  }

  getErrorMessagePhoneNumber(err: any) {
    if (err.hasError('required')) {
      return 'Kötelezően kitöltendő mező!';
    } else if(err.hasError('pattern')) {
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
