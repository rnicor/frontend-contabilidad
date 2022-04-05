import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDetalleComponent } from './gestion-detalle.component';

describe('GestionDetalleComponent', () => {
  let component: GestionDetalleComponent;
  let fixture: ComponentFixture<GestionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
