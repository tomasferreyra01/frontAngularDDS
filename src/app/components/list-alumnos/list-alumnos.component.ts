import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/models/alumno.model';

@Component({
  selector: 'app-list-alumnos',
  templateUrl: './list-alumnos.component.html',
  styleUrls: ['./list-alumnos.component.css']
})
export class ListAlumnosComponent implements OnInit {
  alumnos?: Alumno[];
  currentElement: Alumno = {};
  currentIndex = -1;
  title = '';
  
  message = '';
  showEditForm = false;
  updateSuccessMessageVisible = false;
  
  constructor(private alumnoService: AlumnoService) { }
  ngOnInit(): void {
    this.retrieveAlumnos();
  }
  
  showAlumnoDetails: boolean = false;
  
  showDetails(alumno: Alumno, index: number): void {
  this.setActiveElement(alumno, index);
  this.showAlumnoDetails = true;
  this.showEditForm = false;  
}
  retrieveAlumnos(): void {
    this.alumnoService.getAll()
      .subscribe({
        next: (data) => {
          this.alumnos = data;
          console.log(this.alumnos);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveAlumnos();
    this.currentElement = {};
    this.currentIndex = -1;
  }
  setActiveElement(element: Alumno, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }
 
   deleteAlumno(id: any): void {
    this.alumnoService.delete(id)
      .subscribe({
        next: () => {
          console.log('Alumno eliminado correctamente.');
          this.retrieveAlumnos();
        },
        error: (e) => console.error('Error al eliminar el alumno:', e)
      });
  }
  
 updateElement(): void {
  this.alumnoService.update(this.currentElement.id, this.currentElement)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.showSuccessMessage();
        this.showEditForm = false;
      },
      error: (e) => console.error(e)
    });
}

showSuccessMessage(): void {
  this.updateSuccessMessageVisible = true;

  setTimeout(() => {
    this.updateSuccessMessageVisible = false;
  }, 3000); 
}


}
  
  

