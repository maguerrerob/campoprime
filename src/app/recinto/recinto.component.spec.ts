import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecintoComponent } from './recinto.component';

describe('RecintoComponent', () => {
  let component: RecintoComponent;
  let fixture: ComponentFixture<RecintoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecintoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecintoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
