export interface DatosFacturaCompraExcel{
//     id: number;
//    usuarioId: number;
    numero?: number;
    nit?: string;
    razonSocial?: string;
    codigoAutorizacion?: string;
    numeroFactura?: string;
    numeroDui?: string;
    fechaFactura?: string;
    importeTotalCompra?: number;
    importeIcei?: number;
    importeIehd?: number;
    importeIpj?: number;
    tasa?: number;
    otroNscf?: number;
    importeExentos?: number;
    importeComprasGravadasTasaCero?: number;
    subtotal?: number;
    descuentoBonificacionRebajaIva?: number;
    importeGiftCard?: number;
    importeBaseCf?: number;
    creditoFiscal?: number;
    tipoCompra?: string;
    codigoControl?: string;
}
