import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoDetailsComponent } from './components/curso-details/curso-details.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { ListAlumnosComponent } from './components/list-alumnos/list-alumnos.component';
import { TemaAddComponent } from './components/tema-add/tema-add.component';
import { ListTemasComponent } from './components/list-temas/list-temas.component';
import { AlumnosAddComponent } from './components/alumnos-add/alumnos-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  { path: 'cursos', component: CursoListComponent },
  { path: 'cursos/:id', component: CursoDetailsComponent },
  { path: 'add', component: CursoAddComponent },
  { path: 'alumnos', component: ListAlumnosComponent },
  { path: 'temasadd', component: TemaAddComponent},
  { path: 'temas', component: ListTemasComponent},
  { path: 'alumnosadd', component : AlumnosAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
