import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private menuService: MenuService
  ) { }

  menu: Array<Menu> = []
  ngOnInit(): void {
    this.cargarMenu();
  }
  cargarMenu() {
    this.menuService.getMenu().subscribe(resp=> {
      this.menu = resp;
    })
  }


}
