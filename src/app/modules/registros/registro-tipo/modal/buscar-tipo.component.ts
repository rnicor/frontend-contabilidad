import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {RegistroTipoService} from '../service/registro-tipo.service';
import {RegistroTipos} from '../type/registro-tipos.types';

@Component({
  selector: 'buscar-tipo',
  templateUrl: './buscar-tipo.component.html',
  styles: []
})

export class BuscarTipoComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    searchInputControl: FormControl = new FormControl();

    displayedColumns: string[] = ['nro', 'tipoComprobante', 'nombre', 'fecha', 'actions'];
    dataSource = new MatTableDataSource<RegistroTipos>();
    constructor(
      public dialogRef: MatDialogRef<BuscarTipoComponent>,
      private registroTipoService: RegistroTipoService) {  }
    ngOnInit(): void {
      this.registroTipoService.listar().subscribe(
          (response) => {
              this.dataSource.data = response;
          }
      );
    }
    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    seleccionarTipo(registroTipos: RegistroTipos): void {
        this.dialogRef.close(registroTipos);
    }

    filtrarTipo(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filtro.trim().toLowerCase();
    }

    cerrarDialog(): void {
        this.dialogRef.close();
    }
}
