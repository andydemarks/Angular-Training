import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MartianSol } from '../models/photos';

@Injectable({
  providedIn: 'root'
})
export class MarsServiceService {
  //uses the base nasa api url for mars rover images in our environment file
  private readonly apiUrl = environment.apiUrl;

  //since we will be using an api that is from the web, we need to use httpclient
  constructor(private http: HttpClient) { }

  //use the api to grab the images by sol (sol is martian rotation/day [sol 0 = first "day"])
  //we will use the very first image from each sol and will do sols 0-10 for this project's example
  getMarsRoverPhotosBySol(sol: number): Observable<MartianSol>
  {
    return this.http.get<MartianSol>(this.apiUrl + `/photos?sol=${sol}&api_key=PNsS9QtkhfU1mC6EfLy0tZymTxCIztyAtDa6EuyU`);
  }

}
