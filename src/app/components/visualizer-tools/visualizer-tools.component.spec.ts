import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizerToolsComponent } from './visualizer-tools.component';

describe('VisualizerToolsComponent', () => {
  let component: VisualizerToolsComponent;
  let fixture: ComponentFixture<VisualizerToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizerToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
