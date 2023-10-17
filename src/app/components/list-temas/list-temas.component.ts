import { Component, OnInit } from '@angular/core';
import { TemaService } from 'src/app/services/tema.service';
import { Tema } from 'src/app/models/tema.model';

@Component({
  selector: 'app-list-temas',
  templateUrl: './list-temas.component.html',
  styleUrls: ['./list-temas.component.css']
})
export class ListTemasComponent implements OnInit {
  temas?: Tema[];
  currentElement: Tema = {};
  currentIndex = -1;
  title = '';
  errorMessage: string = '';
  showEditForm = false;
  updateSuccessMessageVisible = false;

  constructor(private temaService: TemaService) { }

  ngOnInit(): void {
	 this.retrieveTemas();
  }
  showTemasDetails: boolean = false;

  showDetails(tema: Tema, index: number): void {
	  this.setActiveElement(tema, index);
	  this.showTemasDetails = true; 
	}
	
  retrieveTemas(): void {
    this.temaService.getAll()
      .subscribe({
        next: (data) => {
          this.temas = data;
          console.log(this.temas);
        },
        error: (e) => console.error(e)
      });
  }
  
  refreshList(): void {
    this.retrieveTemas();
    this.currentElement = {};
    this.currentIndex = -1;
  }
  setActiveElement(element: Tema, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }
  
     deleteTema(id: any): void {
    this.temaService.delete(id)
      .subscribe({
        next: () => {
          console.log('Tema eliminado correctamente.');
          this.retrieveTemas();
          this.errorMessage = '';  // Limpiar el mensaje de error en caso de éxito
        },
        error: (e) => {
          console.error('Error al eliminar el tema:', e);
          if (e === 'No se puede eliminar el tema porque está siendo referenciado en otras tablas.') {
            this.errorMessage = 'No se puede eliminar el tema porque está siendo referenciado en otras tablas.';
          } else {
            this.errorMessage = 'No se puede eliminar este tema porque está siendo utilizado en otros registros.';
          }
        }
      });
  }
  
  updateElement(): void {
  this.temaService.update(this.currentElement.id, this.currentElement)
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

