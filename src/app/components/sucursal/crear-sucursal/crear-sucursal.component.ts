import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SucursalService } from '../sucursal.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-sucursal',
  templateUrl: './crear-sucursal.component.html',
  styleUrls: ['./crear-sucursal.component.css']
})
export class CrearSucursalComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sucursalService: SucursalService,
    private _snackBar: MatSnackBar,
    private router : Router
  ) { 

    this.form = this.fb.group({
      logtrans_id: ['', Validators.required],
      codigo: ['', Validators.required],
      tipo: ['', Validators.required],
      numero: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      celular: ['', Validators.required],
      fax: ['', Validators.required],
      ciudad: ['', Validators.required],
      departamento: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  crearSucursal() {
    console.log(this.form);
    const est = this.form.value.estado?'AC':'NA';
    const sucursal = this.form.value;
    sucursal.estado = est;
    this.sucursalService.adicionar(sucursal).subscribe(data=>{
      console.log('data', data);
      this.router.navigate(['sucursal']);
      this.sucursalService.exito(data.mensaje);
    }, error => {
        this.sucursalService.error("error al crear la sucursal")
    });
    
  }


}
