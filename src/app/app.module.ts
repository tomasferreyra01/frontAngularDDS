import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoDetailsComponent } from './components/curso-details/curso-details.component';
import { TemaAddComponent } from './components/tema-add/tema-add.component';
import { ListAlumnosComponent } from './components/list-alumnos/list-alumnos.component';
import { ListTemasComponent } from './components/list-temas/list-temas.component';
import { AlumnosAddComponent } from './components/alumnos-add/alumnos-add.component';






@NgModule({
  declarations: [
    AppComponent,
    CursoAddComponent,
    CursoListComponent,
    CursoDetailsComponent,
    TemaAddComponent,
    ListAlumnosComponent,
    ListTemasComponent,
    AlumnosAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

