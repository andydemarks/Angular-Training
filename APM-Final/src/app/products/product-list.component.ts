import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { MarsServiceService } from '../services/mars-service.service';
import { MartianSol, MartianSolNoPhotos } from '../models/photos';
import { retry } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Martian Sol List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  solID: number = 0;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.listOfSols = this.performFilter(value);
  }
  
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  
  //created a list of sols to display on our page
  listOfSols:MartianSolNoPhotos[] = [];
  storedListOfSols:MartianSolNoPhotos[] = [];
  index = 0;

  solFilter:string = "";

  constructor(private productService: ProductService, private marsService: MarsServiceService) {}

  performFilter(filterBy: string): MartianSolNoPhotos[] {
    filterBy = filterBy.toLocaleLowerCase();
    var regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if(regex.test(filterBy))
    {
      return this.listOfSols.filter((martianSol: MartianSolNoPhotos) =>
        martianSol.earth_date.includes(filterBy));
    }
    else if(filterBy === "")
    {
      this.listOfSols = this.storedListOfSols;
      return this.listOfSols;
    }
    else
    {
      return this.listOfSols.filter((martianSol: MartianSolNoPhotos) =>
        martianSol.camera.full_name.toLocaleLowerCase().includes(filterBy));
    }

  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    // this.sub = this.productService.getProducts().subscribe({
    //   next: products => {
    //     this.products = products;
    //     this.filteredProducts = this.products;
    //   },
    //   error: err => this.errorMessage = err
    // });

    

    //we will get the rover photos by the entered in sol (default will get them a random sol day, 
    //users can get a different sol day if they enter in a number)
    this.marsService.getMarsRoverPhotosBySol(this.randomSolDay()).subscribe(result => {
      //since the way that nasa sends the data to us from their api is weird, i had to do this to display the images.
      for(let index:number = 0; index<result.photos.length; index++)
      {
        this.listOfSols.push(result.photos[index]);
      }

      this.storedListOfSols = this.listOfSols;
      console.log(this.listOfSols);
    });
  }
  
  //will return a random number from 1-3000
  randomSolDay() {
    return Math.floor((Math.random() * 3000) + 1);
  }
  
  getPhotosFromSol(solDay: string)
  {
    this.marsService.getMarsRoverPhotosBySol(Number(solDay)).subscribe(result => {

      //set the list of sols back to an empty list
      this.listOfSols = [];

      //once again, since the way that nasa sends the data to us from their api is weird, i had to do this to display the images.
      for(let index:number = 0; index<result.photos.length; index++)
      {
        this.listOfSols.push(result.photos[index]);
      }

      this.storedListOfSols = this.listOfSols;
      console.log(result);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
