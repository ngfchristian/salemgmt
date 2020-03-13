import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { UserPagesModule } from './user-pages/user-pages.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DataManagementModule } from './data-management/data-management.module';
import { DeliveryManagementModule } from './delivery-management/delivery-management.module';
import { SaleManagementModule } from './sale-management/sale-management.module';


@NgModule({
   // All Components & pipes that are link directly to the appmodule, according our app structure
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    // FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective
  ],
   // All modules declare here
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    // FormsModule,
    SharedModule,
    // ReactiveFormsModule,
    ChartsModule,
    UserPagesModule,
    DataManagementModule,
    DeliveryManagementModule,
    SaleManagementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
