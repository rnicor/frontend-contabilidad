import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Excel} from './type/excel.type';
import {DatosFacturaCompraExcel} from './type/datos-factura-compra-excel';
import {ImportacionLibroComprasService} from './service/importacion-libro-compras.service';
import {appSnackPrimary, appSnackWarm} from '../../../core/snack/app.snack';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-importacion-libro-compras',
    templateUrl: './importacion-libro-compras.component.html',
    styleUrls: ['./importacion-libro-compras.component.scss']
})
export class ImportacionLibroComprasComponent implements OnInit {

    listaRegistroCompraFormatoExcel: DatosFacturaCompraExcel[];

    //displayedColumns: string[] = ['numero', 'nit', 'razonSocial', 'codigoAutorizacion', 'numeroFactura', 'numeroDui', 'importeTotalCompra',  'importeIcei', 'importeIehd', 'importeIpj', 'tasa', 'otroNscf', 'importeExentos', 'importeComprasGravadasTasaCero', 'subtotal', 'descuentoBonificacionRebajaIva', 'importeGiftCard', 'importeBaseCf', 'creditoFiscal', 'tipoCompra', 'codigoControl', 'fechaFactura','actions'];
    displayedColumns: string[] = ['numero', 'nit', 'razonSocial', 'codigoAutorizacion', 'numeroFactura', 'importeTotalCompra', 'subtotal', 'creditoFiscal', 'codigoControl', 'fechaFactura', 'actions'];
    dataSourceRegistroCompraFormatoExcel = new MatTableDataSource<DatosFacturaCompraExcel>([]);
    registrosCount: number = 0;

    //ejemplos
    dataSource = new MatTableDataSource<Excel>([]);
    resultadoExcel: string;
    products: any;
    count: number = 0;

    flag: boolean = true;

    constructor(
        private importacionLibroComprasService: ImportacionLibroComprasService,
        private _snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
    }

    cargarExcel(event: any): void {
        try {
            //Version 1
            //obtener el archivo
            const fileName = event.target.files[0].name;
            import('xlsx').then(xlsx => {
                let workBook = null;
                let jsonData = null;
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = reader.result;
                    workBook = xlsx.read(data, {type: 'binary'});
                    jsonData = workBook.SheetNames.reduce((initial, name) => {
                        const sheet = workBook.Sheets[name];
                        initial[name] = xlsx.utils.sheet_to_json(sheet);
                        return initial;
                    }, {});
                    this.dataSourceRegistroCompraFormatoExcel.data = jsonData[Object.keys(jsonData)[0]];
                    this.registrosCount = this.dataSourceRegistroCompraFormatoExcel.data.length;
                };
                reader.readAsBinaryString(event.target.files[0]);
            });

        } catch (e) {
            this._snackBar.open(e.error.message, 'Error!!!', appSnackWarm);
        }
    }

    excelToJson(event: any): void {
        try {
            //Version 1
            //obtener el archivo
            const fileName = event.target.files[0].name;
            import('xlsx').then(xlsx => {
                let workBook = null;
                let jsonData = null;
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = reader.result;
                    workBook = xlsx.read(data, {type: 'binary'});
                    jsonData = workBook.SheetNames.reduce((initial, name) => {
                        const sheet = workBook.Sheets[name];
                        /*initial[name] = xlsx.utils.sheet_to_json(sheet);
                        return initial;*/
                        let datos = xlsx.utils.sheet_to_json(sheet);

                        console.log(datos);

                        const jDatos = [];

                        for (let i = 0; i < datos.length; i++) {

                            const dato: DatosFacturaCompraExcel = datos[i];
                            console.log('dato', dato.fechaFactura);
                            jDatos.push({
                                codigoControl: dato.codigoControl,
                                fechaFactura:
                                    new Date((parseInt(dato.fechaFactura + 1) - (25567 + 2)) * 86400 * 1000).toLocaleString()
                            });
                        }
                        console.log('jDatos', jDatos);
                        this.dataSourceRegistroCompraFormatoExcel.data = jDatos;
                        this.registrosCount = this.dataSourceRegistroCompraFormatoExcel.data.length;
                        //console.log(this.dataSourceRegistroCompraFormatoExcel.data);
                    }, {});

                    /*this.dataSourceRegistroCompraFormatoExcel.data = jsonData[Object.keys(jsonData)[0]];
                    this.registrosCount = this.dataSourceRegistroCompraFormatoExcel.data.length;
                    console.log(this.dataSourceRegistroCompraFormatoExcel.data);*/

                };
                reader.readAsBinaryString(event.target.files[0]);
            });

        } catch (e) {
            this._snackBar.open(e.error.message, 'Error!!!', appSnackWarm);
        }
    }


    guardarOActualizar(): void {
        /*console.log(this.dataSourceRegistroCompraFormatoExcel.data);
        var date = new Date(1546108200 * 1000);
        console.log(date.toLocaleString());*/
        this.importacionLibroComprasService.guardar(this.dataSourceRegistroCompraFormatoExcel.data).subscribe(
            (response) => {
                this._snackBar.open('Se guardo el excel con exito', 'Exito!!!', appSnackPrimary);
            }
        );
    }

    eliminarItem(datosFacturaCompraExcel: DatosFacturaCompraExcel): void {
        console.log('item', datosFacturaCompraExcel);
            //eliminar de la vista.


    }


}
