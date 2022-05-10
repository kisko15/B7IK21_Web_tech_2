import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.getProtectedData();
  }

  getProtectedData() {
    this.crudService.getProtectedData().subscribe(
      (data: any) => console.log(data)
    );
  }

}
