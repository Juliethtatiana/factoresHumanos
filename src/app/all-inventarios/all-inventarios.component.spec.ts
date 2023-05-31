import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInventariosComponent } from './all-inventarios.component';

describe('AllInventariosComponent', () => {
  let component: AllInventariosComponent;
  let fixture: ComponentFixture<AllInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInventariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
