import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteVentasComponent } from './comprobante-ventas.component';

describe('ComprobanteVentasComponent', () => {
  let component: ComprobanteVentasComponent;
  let fixture: ComponentFixture<ComprobanteVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprobanteVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobanteVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
