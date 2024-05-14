import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDuenyoComponent } from './home-duenyo.component';

describe('HomeDuenyoComponent', () => {
  let component: HomeDuenyoComponent;
  let fixture: ComponentFixture<HomeDuenyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeDuenyoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeDuenyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
