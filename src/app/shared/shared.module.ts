import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ApiService} from './api.service';
import {AddNewPostModalComponent} from './components/add-new-post-modal/add-new-post-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NotificationInterceptor} from './interceptors/notification.interceptor';

const MATERIAL_MODULES: any[] = [
  MatTableModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [AddNewPostModalComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    ...MATERIAL_MODULES
  ],
  providers: [ApiService, NotificationInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
    }
  ]
})
export class SharedModule {
}
