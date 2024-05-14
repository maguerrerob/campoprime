import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDuenyoComponent } from './registro-duenyo.component';

describe('RegistroDuenyoComponent', () => {
  let component: RegistroDuenyoComponent;
  let fixture: ComponentFixture<RegistroDuenyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroDuenyoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroDuenyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
