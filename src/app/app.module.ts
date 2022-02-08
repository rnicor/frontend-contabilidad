import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './components/login/login.module';
import { AuthorizationService } from './services/authorization.service';
import { WebService } from './services/web.service';
import { SucursalService } from './components/sucursal/sucursal.service';
// import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { SucursalModule } from './components/sucursal/sucursal.module';
import { InicioComponent } from './components/sucursal/inicio/inicio.component'
import { NavbarComponent } from './components/sucursal/navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SucursalComponent,
    InicioComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    SucursalModule 
  ],
  providers: [
  ],
  entryComponents: [
    WebService,
    AuthorizationService,
    SucursalService
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
