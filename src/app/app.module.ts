import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualizerComponent } from './components/visualizer/visualizer.component';
import { SliderComponent } from './components/slider/slider.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { VisualizerToolsComponent } from './components/visualizer-tools/visualizer-tools.component';
import { MuteButtonComponent } from './components/mute-button/mute-button.component';
import { VisualsSelectorComponent } from './components/visuals-selector/visuals-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualizerComponent,
    SliderComponent,
    VisualizerToolsComponent,
    MuteButtonComponent,
    VisualsSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
