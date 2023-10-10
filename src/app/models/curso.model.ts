import { Tema } from '../models/tema.model';
import { Material } from '../models/material.model';

export class Curso {
	id?: number;
	nombre?: string;	
	tema?: Tema;
	fechaInicio?: Date;
	idDocente?: number;
	materiales?: Material[];
}

