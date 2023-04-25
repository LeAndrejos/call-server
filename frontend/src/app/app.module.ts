import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MeetingComponent} from './_components/meeting/meeting.component';

@NgModule({
  imports: [
    BrowserModule,
     MatButtonModule
  ],
  declarations: [
    AppComponent,
    MeetingComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
