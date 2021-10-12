import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualsSelectorComponent } from './visuals-selector.component';

describe('VisualsSelectorComponent', () => {
  let component: VisualsSelectorComponent;
  let fixture: ComponentFixture<VisualsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualsSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
