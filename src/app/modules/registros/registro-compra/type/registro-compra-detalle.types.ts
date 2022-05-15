export interface RegistroCompraDetalle{
    id: number;
    tipoComprobante: string;
    nro: number;
    especificacion: number;
    nitProveedor: string;
    razonSocial: string;
    codigoAutorizacion: string;
    numeroFactura: number;
    numeroDui: number;
    fechaFactura: string;
    importeTotalCompra: number;
    importeIce: number;
    importeIehd: number;
    importeIpj: number;
    tasas: number;
    otroNoSujetoIva: number;
    importesExentos: number;
    comprasGravadasTasaCero: number;
    subtotal: number;
    descuentosBonificacionesRebajasSujetasIva: number;
    importeGiftCard: number;
    importeBaseCreditoFiscal: number;
    creditoFiscal: number;
    estadoCompra: string;
    codigoControl: string;
    tipoCompra: number;
}
