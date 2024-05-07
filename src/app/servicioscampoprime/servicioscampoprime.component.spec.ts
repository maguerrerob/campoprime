import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioscampoprimeComponent } from './servicioscampoprime.component';

describe('ServicioscampoprimeComponent', () => {
  let component: ServicioscampoprimeComponent;
  let fixture: ComponentFixture<ServicioscampoprimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicioscampoprimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicioscampoprimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
