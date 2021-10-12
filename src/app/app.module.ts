import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { VisualizerToolsComponent } from './visualizer-tools/visualizer-tools.component';
import { MuteButtonComponent } from './mute-button/mute-button.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualizerComponent,
    SliderComponent,
    VisualizerToolsComponent,
    MuteButtonComponent
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
