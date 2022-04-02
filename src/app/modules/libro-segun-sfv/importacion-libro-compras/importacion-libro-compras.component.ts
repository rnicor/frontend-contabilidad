import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Excel} from './type/excel.type';
import * as XLSX from 'xlsx';
import {DatosFacturaCompra} from './type/datos-factura-compra';
import {ImportacionLibroComprasService} from './service/importacion-libro-compras.service';

@Component({
    selector: 'app-importacion-libro-compras',
    templateUrl: './importacion-libro-compras.component.html',
    styleUrls: ['./importacion-libro-compras.component.scss']
})
export class ImportacionLibroComprasComponent implements OnInit {

    listaRegistroCompraFormatoExcel: DatosFacturaCompra[];
    /*
        numero: number;
    nit: string;
    razonSocial: string;
    codigoAutorizacion: string;
    numeroFactura: string;
    numeroDui: string;
    fechaFactura: string;
    importeNeto: number;
    impIcei: number;
    impIehd: number;
    impIpj: number;
    tasa: number;
    otroNscf: number;
    impExentos: number;
    impcGravTasaCero: number;
    subtotal: number;
    desBonReb: number;
    impGiftCard: number;
    impBaseCf: number;
    creditoFiscal: number;
    tipoCompra: string;
    codigoControl: string;
    *
    * */

    displayedColumns: string[] = ['numero', 'nit', 'razonSocial', 'actions'];
    dataSourceRegistroCompraFormatoExcel = new MatTableDataSource<DatosFacturaCompra>([]);
    registrosCount: number = 0;

    //ejemplos
    dataSource = new MatTableDataSource<Excel>([]);
    resultadoExcel: string;
    products: any;


    constructor(
        private importacionLibroComprasService: ImportacionLibroComprasService,
    ) {
    }

    ngOnInit(): void {
    }

    onFileChange(evt: any): void {
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
                dateNF: "MM/DD/YYYY",
            });
            console.log('data excel', dataExcel);
            this.dataSource.data = dataExcel;
            this.resultadoExcel = this.dataSource.data.toString();
            /*this.configPaginator();
            this.lineasCount = dataExcel.length;*/
            console.log('this.dataSource.data', this.dataSource.data);
        };

        reader.readAsBinaryString(target.files[0]);


    }

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

    }


    cargarExcel(event: any): void{
        try{
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

    guardarOActualizar():void{

        this.importacionLibroComprasService.guardar(this.dataSourceRegistroCompraFormatoExcel.data).subscribe(
            (response) => {
                console.log('OK');
            }
        );


    }


}
