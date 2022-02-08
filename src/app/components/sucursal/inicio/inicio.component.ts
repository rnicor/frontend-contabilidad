import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SucursalService } from '../sucursal.service';
import { Sucursal } from '../sucursal.types';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
// const ELEMENT_DATA: PeriodicElement[] =  [
//   // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ]

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  displayedColumns: string[] = ['tipo', 'numero', 'nombre',  'telefono',  'departamento', 'pais', 'acciones'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];  'celular', 'fax', 'ciudad','direccion',
  listCursal:Array<Sucursal> = [];
  dataSource = new MatTableDataSource (this.listCursal);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private sucursalService : SucursalService,
    private _snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.getSucursal();
  }
  // ngAfterViewInit() {
  //   this.listCursal.paginator = this.paginator;
  // }

  getSucursal()  {
    this.sucursalService.listar().subscribe(res=>{
      this.listCursal = res;
      this.dataSource = new MatTableDataSource (this.listCursal);
    })
  }
  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
    console.log(filterValue.trim());
  }
  eliminarSucursal(index: any) {
    this.sucursalService.delete(index).subscribe(data => {
      console.log('eliminar', data);
      this.getSucursal();
      this.sucursalService.exito(data.mensaje);
    }, error => {
      this.sucursalService.error("error en el procedimiento")
    });
  }
  editarSucursal() {

  }
}
