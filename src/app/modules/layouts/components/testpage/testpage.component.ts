import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { TestpageService } from '../../services/testpage.service';


import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.scss']
})
export class TestpageComponent implements OnInit {

public columnDefs: ColDef[] = [];
public customNames : any = [];

 public rowData = [
    { id: 1, name: 'Toyota', price: '20000', make: '2020' },
    { id: 2, name: 'Volkswagon', price: '30000', make: '2021' },
    { id: 3, name: 'Hyundai', price: '14000', make: '2021' },
  ];
constructor(private testpageService: TestpageService) { }

  ngOnInit(): void {
    
    this.loadProductList();
    
    this.generateColumnDefs();
  }



public generateColumnDefs()
{
  const propertiesArray = [{
       headerName : "name",
       field : "name" 
      },{
       headerName : "price",
       field : "price" 
      }];
  for (const property of propertiesArray) {
    this.customNames.push(property);
  }
}




  productList: Product[] = [];
  
  loadProductList(): void {
    this.testpageService.getProductList().subscribe(
      (data : Product[]) => {
        this.productList = data;
      },
      (error : unknown) => {
        console.error('Error loading testpage list:', error);
      }
    );
  }


  
}
