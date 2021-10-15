import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HporprofesorComponent } from './hporprofesor.component';

describe('HporprofesorComponent', () => {
  let component: HporprofesorComponent;
  let fixture: ComponentFixture<HporprofesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HporprofesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HporprofesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
