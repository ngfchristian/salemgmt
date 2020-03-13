import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AlertService } from './sharedservices/alert/alert.service';
import { AuthenticationService } from './sharedservices/authentication/authentication.service';
import { AuthGuardGuard } from './sharedservices/auth-guard.guard';
import { CommonService } from './sharedservices/commons/common.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
   // All Components & pipes
  declarations: [
    FooterComponent,
  ],
   // All modules declare here
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  // All services
  providers: [
    AlertService,
    AuthenticationService,
    AuthGuardGuard,
    CommonService
  ],
    /** You export what you will like to expose and use outside. You export only what has been declared or imported*/
    exports: [
      FooterComponent,
      NgbModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
    ]
})
export class SharedModule { }
