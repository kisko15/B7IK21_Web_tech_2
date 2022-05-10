import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private crudService: CrudService,
    private ngZone: NgZone
  ) {}

  productsForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.compose([ Validators.required, Validators.min(500) ])],
    description: ['', Validators.required]
  })

  get name() {
    return this.productsForm.get('name');
  }

   get price() {
    return this.productsForm.get('price');
  }

  get description() {
    return this.productsForm.get('description');
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.crudService.addProducts(this.productsForm.value)
    .subscribe({
      next: () => this.ngZone.run(() => this.router.navigateByUrl('/products-list')),
      error: (err: any) => console.log(err),
      complete: () => console.info('Data added successfully!')
    });
  }

  getErrorMessage(err: any) {
    if (err.hasError('required')) {
      return 'Kötelezően kitöltendő mező!';
    }
    return '';
  }

  getErrorMessagePrice(err: any) {
    if (err.hasError('required')) {
      return 'Kötelezően kitöltendő mező!';
    } if(err.hasError('min')) {
      return 'Minimum ár 500 Ft';
    }
    return '';
  }

}
