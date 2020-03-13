import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/shared/sharedservices/authentication/authentication.service';
import { AlertService } from 'src/app/shared/sharedservices/alert/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errordisplay: string;
  requiredemail = 'email is required';
  requiredpassword = 'Password is required';


  constructor(
    private formBuilder: FormBuilder,
    // private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
      // redirect to dashboard if already logged in instead of login
      if (this.authenticationService.carpcurrentUserValue) {
          this.router.navigate(['/dashboard']);
      }
    }

  ngOnInit() {
    this.onFormControl(); // control or verify the form
  }

  // convenience getter for easy access to form fields
  get formLogin() {
    return this.loginForm.controls;
  }


  onSubmit() {
    /** if login success:
    * - set the token to the local storage of the browser computer :: done in the service side in getuserinfo
    * - with the token, get the user role and user information
    * - redirect to another page : profile [ that is representing the courses list here]
    */

    this.submitted = true;
    console.log('je suis ici.....');

      /** stop here if form is invalid */
    if (this.loginForm.invalid) {
        console.log('je suis la.....');
        return;
      }

    this.loading = true;
    const usermode = new UserModel(1, '', '', '', '', 11, '', '', '', '');
    usermode.email = this.formLogin.email.value;
    usermode.password = this.formLogin.password.value;
        // console.log(`usermodel.email: ${usermodel.email},   usermodel.password : ${usermodel.password}`);
    this.authenticationService.login('auth/login', usermode)
            .pipe(first())
            .subscribe((data) => {
              // Console.log('login successfull:>>>>>>', data ['token']);
              /** We have also to find out the list of courses that the user has enrolled to  */
              console.log(`send the token >> ${data['token']}`);
              this.authenticationService.getcurrentUserInfo('auth/userinfo', data['token'])
              .subscribe((loginres) => {
                //location.reload();
                this.validateUser(loginres); /* ['role'] */
              });
            }/* {
                  console.log('je suis data.....');
                    this.router.navigate([this.returnUrl]);
                } */,
                error => {
                  console.log('je suis error... ' + error.status );
                  let message;
                  if (error.status === 404) { // No user found
                    message = 'No user with the email found';
                  }
                  if (error.status === 401) { // Password invalid --> should write: email or password invalid
                    message = 'Email or password invalid';
                  }
                  if (error.status === 500) { // Error on the server
                    message = 'Unable to connect to the server';
                  }
                  this.alertService.error(message);
                  this.errordisplay = message;
                  this.loading = false;
                });

    }



    /**
   * This function control the form regarding the required fields.
   * Currently, the form is having two fields that are required
   * @field email: required
   * @field password: required
   * The function doesn't have a return value, it just performs simple verrification operations
   */
  onFormControl() {
    this.loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    stayconnected: ['', '']
  });
  }

   /**
   * This function validate the user and get him access to what he has the right to see,
   * set the user infos in the local storage and navigate to the profile page which is the list of all yii's courses.
   * @param user: the user with the token
   * The function doesn't have a return value, it performs structural operations
   */
  validateUser(user) {
    // console.log(user);
    // console.log(JSON.stringify(user));
    localStorage.setItem('carpcurrentUser', JSON.stringify(user));
    // localStorage.setItem('ROLE_TYPE', typeOfUser); // save the user type in the localstorage also
    // navigate to the profile page
    this.router.navigate(['/dashboard']); // nagivate to the dashboard component
  }

}
