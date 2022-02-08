import { Component, OnInit } from '@angular/core';
import { SucursalService } from './sucursal.service';
import { Sucursal } from './sucursal.types';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  listSucursal: Array<Sucursal> = [];
  constructor(
    private SucursalService: SucursalService
  ) { }

  ngOnInit(): void {
    this.getSucursal();
  }
 getSucursal() {
   this.SucursalService.listar().subscribe(res => {
     this.listSucursal = res;
     console.log(res)
   })
 }
}
