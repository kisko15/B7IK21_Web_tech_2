import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {

  getId: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) { }

  productsForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.compose([ Validators.required, Validators.min(500) ])],
    description: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getProduct(this.getId).subscribe(res => {
      this.productsForm.setValue({
        name: res.data['name'],
        price: res.data['price'],
        description: res.data['description']
      });
    });
  }

  get name() {
    return this.productsForm.get('name');
  }

   get price() {
    return this.productsForm.get('price');
  }

  get description() {
    return this.productsForm.get('description');
  }

  onUpdate(): any {
    this.crudService.updateProduct(this.getId, this.productsForm.value)
    .subscribe({
      next: () => this.ngZone.run(() => this.router.navigateByUrl('/products-list')),
      error: (err: any) => console.log(err),
      complete: () => console.log('Data updated successfully!')
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
