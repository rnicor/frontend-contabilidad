import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/menu';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( 
    private httpClient: HttpClient
  ) { }

  getMenu():Observable <Menu[]> {
    return this.httpClient.get<Menu[]>('./assets/data/data.json');
  }
}
