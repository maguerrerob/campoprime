import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecintosComponent } from './lista-recintos.component';

describe('ListaRecintosComponent', () => {
  let component: ListaRecintosComponent;
  let fixture: ComponentFixture<ListaRecintosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaRecintosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaRecintosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
