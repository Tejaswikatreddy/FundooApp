import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule, MatToolbarModule, MatListModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { SignupComponent } from './components/signup/signup.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { httpService } from './core/services/http.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AddNoteComponent } from './components/AddNote/AddNote.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { IconsComponent } from './components/icons/icons.component';
import { RemindMeComponent } from './components/remind-me/remind-me.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { ChangeColorComponent } from './components/change-color/change-color.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { MoreComponent } from './components/more/more.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotelistComponent } from './components/note-list/note-list.component';
import { AllNoteComponent } from './components/all-note/all-note.component';
import { MainArchiveComponent } from './components/main-archive/main-archive.component';
import { MainTrashComponent } from './components/main-trash/main-trash.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { EditLabelComponent } from './components/edit-label/edit-label.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { SearchPipe } from './core/pipes/search.pipe';
import { SearchAllComponent } from './components/search-all/search-all.component';
import { LabelNotesComponent } from './components/label-notes/label-notes.component';
import { PinComponent } from './components/pin/pin.component';
import { LabelSearchPipe } from './core/pipes/label-search.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropImageComponent } from './components/crop-image/crop-image.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
      AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddNoteComponent,
    NavbarComponent,
    IconsComponent,
    RemindMeComponent,
    CollaboratorComponent,
    ChangeColorComponent,
    AddImageComponent,
    ArchiveComponent,
    MoreComponent,
    NotelistComponent,
    AllNoteComponent,
    MainArchiveComponent,
    MainTrashComponent,
    UpdateNoteComponent,
    EditLabelComponent,
    SearchPipe,
    SearchAllComponent,
    LabelNotesComponent,
    PinComponent,
    LabelSearchPipe,
    CropImageComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    ImageCropperModule,
    MatNativeDateModule

  ],
  entryComponents: [UpdateNoteComponent, EditLabelComponent, CropImageComponent],
  providers: [
    httpService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
