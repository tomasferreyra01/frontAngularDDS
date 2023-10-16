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
  
	
}

