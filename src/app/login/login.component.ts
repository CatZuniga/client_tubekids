import { Component, OnInit } from '@angular/core';
import { User } from '../lib/user';
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../lib/profile';
import { FormBuilder, FormGroup, Validators, AbstractControl, NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  profile: Profile;

  logFormAdmin: FormGroup;
  logFormKid: FormGroup;

  msg : string;


  constructor(
    private userService: UserService,  
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  createForms() {
    this.logFormAdmin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  
    this.logFormKid = this.formBuilder.group({
      username: ['', [Validators.required]],
      pin: ['', Validators.required]
    });

  }
 
  ngOnInit() {
    this.createForms();
  }

//LOGIN AS Admin
 logAdmin(): void {
    let pass = this.logFormAdmin.get("password").value;
    let email = this.logFormAdmin.get("email").value;

    this.userService.login(email, pass)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(["/videos"]);
        }, (err) => {
          console.log(err);
          this.msg = "EMAIL OR PASS INVALID";
          this.router.navigate(["/login"]);
        });
  }

//LOGIN AS Kid
logKid(form: NgForm): void {
  let username =  this.logFormKid.get("username").value;
  let pin = this.logFormKid.get("pin").value;

  this.profileService.login(username, pin)
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(["/videoskid"]);
      }, (err) => {
        console.log(err);
        this.msg = "USERNAME OR PIN INVALID";
        this.router.navigate(["/login"]);
      });
      
}

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
  }


}
