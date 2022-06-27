import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {LibroDiarioService} from '../service/libro-diario.service';
import {RegistroComprobantes} from "../type/libro-diario-detalles.types";

@Component({
  selector: 'buscar-pedido',
  templateUrl: './buscar-libro-diario.component.html',
  styles: []
})

export class BuscarComprobanteComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    searchInputControl: FormControl = new FormControl();

    displayedColumns: string[] = ['numeroPedido', 'tipoPedido', 'cantidad', 'fecha', 'concepto', 'estado', 'actions'];
    dataSource = new MatTableDataSource<RegistroComprobantes>();
    constructor(
      public dialogRef: MatDialogRef<BuscarComprobanteComponent>,
      private pedidoService: LibroDiarioService) {  }
    ngOnInit(): void {
      /*this.pedidoService.listar().subscribe(
          (response) => {
              this.dataSource.data = response;
          }
      );*/
    }
    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    seleccionarPedido(pedidoRegistro: RegistroComprobantes): void {
        this.dialogRef.close(pedidoRegistro);
    }

    filtrarPedido(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filtro.trim().toLowerCase();
    }

    cerrarDialog(): void {
        this.dialogRef.close();
    }
}
