import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosAddComponent } from './alumnos-add.component';

describe('AlumnosAddComponent', () => {
  let component: AlumnosAddComponent;
  let fixture: ComponentFixture<AlumnosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnosAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
