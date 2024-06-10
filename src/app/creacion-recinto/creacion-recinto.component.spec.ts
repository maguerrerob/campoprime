import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionRecintoComponent } from './creacion-recinto.component';

describe('CreacionRecintoComponent', () => {
  let component: CreacionRecintoComponent;
  let fixture: ComponentFixture<CreacionRecintoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreacionRecintoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreacionRecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
