export interface RegistroVentaDetalle{
    id: number;
    tipoComprobante: string;
    nro: number;
    especificacion: number;
    fechaFactura?: string;
    numeroFactura: number;
    codigoAutorizacion: string;
    nitCiCliente: string;
    complemento: string;
    nombreRazonSocial: string;
    importeTotalVenta: number;
    importeIce: number;
    importeIehd: number;
    importeIpj: number;
    tasas: number;
    otrosSujetosIva: number;
    exportacionesOperacionesExentas: number;
    ventasGravadasTasaCero: number;
    subtotal: number;
    descuetosBonificacionesRebajasSujetasIva: number;
    importeGiftCard: number;
    importeBaseDebitoFiscal: number;
    debitoFiscal: number;
    estadoVenta: string;
    codigoControl: string;
    tipoVenta: number;
}
