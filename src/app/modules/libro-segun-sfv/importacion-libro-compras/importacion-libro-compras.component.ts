import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Excel} from './type/excel.type';
import * as XLSX from 'xlsx';
import {DatosFacturaCompraExcel} from './type/datos-factura-compra-excel';
import {ImportacionLibroComprasService} from './service/importacion-libro-compras.service';

@Component({
    selector: 'app-importacion-libro-compras',
    templateUrl: './importacion-libro-compras.component.html',
    styleUrls: ['./importacion-libro-compras.component.scss']
})
export class ImportacionLibroComprasComponent implements OnInit {

    listaRegistroCompraFormatoExcel: DatosFacturaCompraExcel[];
    /*
    importeTotalCompra: number;
    importeIcei: number;
    importeIehd: number;
    importeIpj: number;
    tasa: number;
    otroNscf: number;
    importeExentos: number;
    importeComprasGravadasTasaCero: number;
    subtotal: number;
    descuentoBonificacionRebajaIva;
    importeGiftCard: number;
    importeBaseCf: number;
    creditoFiscal: number;
    tipoCompra: string;
    codigoControl: string;
    *
    * */



    //displayedColumns: string[] = ['numero', 'nit', 'razonSocial', 'codigoAutorizacion', 'numeroFactura', 'numeroDui', 'importeTotalCompra',  'importeIcei', 'importeIehd', 'importeIpj', 'tasa', 'otroNscf', 'importeExentos', 'importeComprasGravadasTasaCero', 'subtotal', 'descuentoBonificacionRebajaIva', 'importeGiftCard', 'importeBaseCf', 'creditoFiscal', 'tipoCompra', 'codigoControl','actions'];
    displayedColumns: string[] = ['numero', 'nit', 'razonSocial', 'codigoAutorizacion', 'numeroFactura', 'numeroDui', 'importeTotalCompra',  'importeIcei', 'importeIehd', 'importeIpj', 'tasa', 'otroNscf', 'importeExentos', 'importeComprasGravadasTasaCero', 'subtotal', 'descuentoBonificacionRebajaIva', 'importeGiftCard', 'importeBaseCf', 'creditoFiscal', 'tipoCompra', 'codigoControl', 'fechaFactura','actions'];
    dataSourceRegistroCompraFormatoExcel = new MatTableDataSource<DatosFacturaCompraExcel>([]);
    registrosCount: number = 0;

    //ejemplos
    dataSource = new MatTableDataSource<Excel>([]);
    resultadoExcel: string;
    products: any;

    count: number = 0;

    flag: boolean = true;
    jsontext: string;

    constructor(
        private importacionLibroComprasService: ImportacionLibroComprasService,
    ) {
    }

    ngOnInit(): void {
    }

    /*onFileChange(evt: any): void {
        this.dataSource.data = [];
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) throw new Error('No puede cargar multiples archivos');

        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            const bstr: string = e.target.result;

            const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
            const workbookSheets = wb.SheetNames;
            const wsname: string = wb.SheetNames[0];
            console.log('wsname', wsname);
            const dataExcel: any[] = XLSX.utils.sheet_to_json(wb.Sheets[wsname], {
                dateNF: 'MM/DD/YYYY',
            });
            console.log('data excel', dataExcel);
            this.dataSource.data = dataExcel;
            this.resultadoExcel = this.dataSource.data.toString();

            console.log('this.dataSource.data', this.dataSource.data);
        };

        reader.readAsBinaryString(target.files[0]);


    }*/

    /*
    uploadExcel(e) {

        try{

            const fileName = e.target.files[0].name;

            import('xlsx').then(xlsx => {
                let workBook = null;
                let jsonData = null;
                const reader = new FileReader();
                // const file = ev.target.files[0];
                reader.onload = (event) => {
                    const data = reader.result;
                    workBook = xlsx.read(data, { type: 'binary' });
                    jsonData = workBook.SheetNames.reduce((initial, name) => {
                        const sheet = workBook.Sheets[name];
                        initial[name] = xlsx.utils.sheet_to_json(sheet);
                        return initial;
                    }, {});
                    this.products = jsonData[Object.keys(jsonData)[0]];
                    console.log(this.products);

                };
                reader.readAsBinaryString(e.target.files[0]);
            });

        }catch(e){
            console.log('error', e);
        }

    }*/


    cargarExcel(event: any): void{
        try{
            //Version 1
            //obtener el archivo
            const fileName = event.target.files[0].name;
            import('xlsx').then(xlsx => {
                let workBook = null;
                let jsonData = null;
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = reader.result;
                    workBook = xlsx.read(data, { type: 'binary' });
                    jsonData = workBook.SheetNames.reduce((initial, name) => {
                        const sheet = workBook.Sheets[name];
                        initial[name] = xlsx.utils.sheet_to_json(sheet);
                        return initial;
                    }, {});
                    this.dataSourceRegistroCompraFormatoExcel.data = jsonData[Object.keys(jsonData)[0]];
                    this.registrosCount = this.dataSourceRegistroCompraFormatoExcel.data.length;
                    console.log(this.dataSourceRegistroCompraFormatoExcel.data);

                };
                reader.readAsBinaryString(event.target.files[0]);
            });

        }catch(e){
            console.log('error', e);
        }
    }

    excelToJson(event: any): void{
        console.log('hola');
        try{
            //Version 1
            //obtener el archivo
            const fileName = event.target.files[0].name;
            import('xlsx').then(xlsx => {
                let workBook = null;
                let jsonData = null;
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = reader.result;
                    workBook = xlsx.read(data, { type: 'binary' });
                    jsonData = workBook.SheetNames.reduce((initial, name) => {
                        const sheet = workBook.Sheets[name];
                        /*initial[name] = xlsx.utils.sheet_to_json(sheet);
                        return initial;*/
                        let datos = xlsx.utils.sheet_to_json(sheet);

                        console.log(datos);

                        const jDatos = [];

                        for (let i = 0 ; i < datos.length; i++){

                            const dato: DatosFacturaCompraExcel  = datos[i];
                            console.log('dato', dato.fechaFactura );
                            jDatos.push({
                                codigoControl: dato.codigoControl,
                                fechaFactura:
                                    new Date((parseInt(dato.fechaFactura+1) - (25567 +2))*86400*1000).toLocaleString()
                            });
                        }
                        console.log('jDatos', jDatos);
                        this.dataSourceRegistroCompraFormatoExcel.data = jDatos[Object.keys(jsonData)[0]];
                        this.registrosCount = this.dataSourceRegistroCompraFormatoExcel.data.length;
                        console.log(this.dataSourceRegistroCompraFormatoExcel.data);
                    }, {});

                    /*this.dataSourceRegistroCompraFormatoExcel.data = jsonData[Object.keys(jsonData)[0]];
                    this.registrosCount = this.dataSourceRegistroCompraFormatoExcel.data.length;
                    console.log(this.dataSourceRegistroCompraFormatoExcel.data);*/

                };
                reader.readAsBinaryString(event.target.files[0]);
            });

        }catch(e){
            console.log('error', e);
        }

    }




    guardarOActualizar(): void{
        console.log(this.dataSourceRegistroCompraFormatoExcel.data);
        var date = new Date(1546108200 * 1000);
        console.log(date.toLocaleString());
        this.importacionLibroComprasService.guardar(this.dataSourceRegistroCompraFormatoExcel.data).subscribe(
            (response) => {
                console.log('OK');
            }
        );


    }


}
