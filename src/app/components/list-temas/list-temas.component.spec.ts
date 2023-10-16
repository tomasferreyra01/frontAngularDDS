import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTemasComponent } from './list-temas.component';

describe('ListTemasComponent', () => {
  let component: ListTemasComponent;
  let fixture: ComponentFixture<ListTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTemasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
