import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject,takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params } from '@angular/router';
import { CartpageService } from '../../services/cartpage.service';


import { Cart } from 'src/app/models/cart.model';


@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.scss']
})
export class CartpageComponent implements OnInit {

  
  public CartForm! : FormGroup;
  public  CartId!: number;
   
  private ngUnsubscribe = new Subject<void>();

  constructor(private cartpageService: CartpageService ,
  private _formBuilder: FormBuilder,
  private _toastrService: ToastrService,
  private _route: ActivatedRoute) { }


  ngOnInit(): void {
    
    this.initCartForm();
    
    this._route.params.subscribe((params: Params) => {
      this.CartId = Number(params['id']);
      this.getCartById(this.CartId);
    });
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  cartList: Cart[] = [];


public get CartFormControls() {
    return this.CartForm.controls;
}


  private initCartForm() :  void
  {
    this.CartForm = this._formBuilder.group({
        id: [0],
      
        dimensions : [0, [Validators.required]],
      
    });
  }






public onSave() {
  if (this.CartId > 0) {
      this.editCart(this.CartForm.value);
    } else {
      this.createCart(this.CartForm.value);
    }
}

private createCart(CartData : Cart) {
  console.log(CartData);
  this.cartpageService
      .addCart(CartData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (Cart: Cart) => {
          console.log(Cart);
          this._toastrService.success('Cart created successfully.');
        },
        error: (errRes: HttpErrorResponse) => {
          if (errRes?.error?.message) {
            this._toastrService.error(errRes.error.message);
          } else {
            this._toastrService.error('Unable to load the Cart!');
          }
        },
        complete: () => {
        },
      });
}

private editCart(CartData : Cart){
  console.log(CartData);
  this.cartpageService
      .updateCart(this.CartId,CartData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this._toastrService.success('Cart details updated successfully.');
        },
        error: (errRes: HttpErrorResponse) => {
          if (errRes?.error?.message) {
            this._toastrService.error(errRes.error.message);
          } else {
            this._toastrService.error('Unable to update the Cart!');
          }
        },
        complete: () => {
        },
      });
}

  private getCartById(CartId: number) {
    if (CartId > 0) {
      this.cartpageService
        .getCart(this.CartId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (Cart: Cart) => {
            this.populateForm(Cart);
          },
          error: (errRes: HttpErrorResponse) => {
            if (errRes?.error?.message) {
              this._toastrService.error(errRes.error.message);
            } else {
              this._toastrService.error('Unable to load the Cart!');
            }
          },
          complete: () => {
          },
        });
    }
  }

 private populateForm(Cart: Cart): void {
    this.CartForm.patchValue({
       
          dimensions : Cart.dimensions,
        
    });
  }

}