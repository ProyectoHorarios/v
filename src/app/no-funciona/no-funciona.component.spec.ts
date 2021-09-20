import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFuncionaComponent } from './no-funciona.component';

describe('NoFuncionaComponent', () => {
  let component: NoFuncionaComponent;
  let fixture: ComponentFixture<NoFuncionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFuncionaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFuncionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
