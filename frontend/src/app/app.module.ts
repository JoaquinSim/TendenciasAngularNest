import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BikeComponent } from './pages/bike/bike.component';
import { BikelistComponent } from './pages/bikelist/bikelist.component';
//
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { SliderModule } from 'primeng/slider';
import {TableModule} from "primeng/table";
import { HttpClientModule } from '@angular/common/http';
import { ListsComponent } from './lists/lists/lists.component';
import { ListsListComponent } from './lists/lists-list/lists-list.component';
//

@NgModule({
  declarations: [
    AppComponent,
    BikeComponent,
    BikelistComponent,
    ListsComponent,
    ListsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    PanelModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    InputSwitchModule,
    KnobModule,
    SliderModule,
    TableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
