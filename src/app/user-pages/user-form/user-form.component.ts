import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/sharedservices/authentication/authentication.service';
import { first } from 'rxjs/operators';
import { UserPagesService } from '../user-pages.service';
import { AlertService } from 'src/app/shared/sharedservices/alert/alert.service';
import { CommonService } from 'src/app/shared/sharedservices/commons/common.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userdetailForm: FormGroup;
  id: any;
  currentUser;
  submitted = false;
  requiredfirstname = 'First name is required';
  requiredemail = 'Email is required';
  requiredpassword = 'Password is required';
  errordisplay: string;
  readonly = '';


  constructor(private router: Router,
              private alertService: AlertService,
              private activatedroute: ActivatedRoute,
              private userservice: UserPagesService,
              private commonservice: CommonService,
              private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
      this.onFormControl(); // control of verify thing in the form
    }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.params['id'];
    if (localStorage.getItem('carpcurrentUser')) {
      // console.log('login... i am logged');
      this.currentUser = this.authenticationService.carpcurrentUserValue;
      //  console.log('login... ' + this.currentUser._id);
    }
    if (this.id) {
      this.readonly = 'readonly';
      console.log('user id... ' + this.id);
      this.commonservice.get_users_by_Id(this.id)
        .subscribe((user) => {
          // this.detail = user.user;
          this.onEdituser(user.user);
        });
    }
  }


  onSubmit($event) {
    this.submitted = true;
    const newuser = {
      userName: this.formuserdetail.username.value,
      firstName: this.formuserdetail.firstname.value,
      lastName: this.formuserdetail.lastname.value,
      email: this.formuserdetail.email.value,
      password: this.formuserdetail.password.value,
      usercreate: this.currentUser._id // user id of he who creates the user
    };

    this.userservice.registeruser(newuser)
            .pipe(first())
            .subscribe((data) => {
              // send success message to the user and redirect
              console.log('saving the user result... ' + data );
              this.router.navigate(['/user-pages/userlist']);
            },
            error => {
              console.log('error occured... ' + error.status );
              let message;
              if (error.status === 409) { // email already exist
                message = 'Email address already exists! Choose another email';
                this.requiredemail = 'Email address already exists! Choose another email';
              }
              if (error.status === 500) { // internal error
                message = 'An internal server error occured in the process';
              }
              this.alertService.error(message);
              this.errordisplay = message;
              // this.loading = false;
            });
  }

        /**
   * This function control the form regarding the required fields.
   * Currently, the form is having two fields that are required
   * @field productname: required
   * @field reference: not required
   * @field description: not required
   * The function doesn't have a return value, it just performs simple verrification operations
   */
  onFormControl() {
    this.userdetailForm = this.formBuilder.group({
    username: ['', ''],
    firstname: ['', Validators.required],
    lastname: ['', ''],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get formuserdetail() {
    return this.userdetailForm.controls;
  }


  onEdituser(user: any) {
    this.formuserdetail.username.setValue(user['userName']);
    this.formuserdetail.firstname.setValue(user['firstName']);
    this.formuserdetail.lastname.setValue(user['lastName']);
    this.formuserdetail.email.setValue(user['email']);
  }
}
