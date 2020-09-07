import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '../../../node_modules/@angular/forms';
import { GeneralService } from '../services/general.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  public LoginFormGroup: FormGroup;

  constructor(private router: Router,
              private LoginFormBuilder: FormBuilder,
              private generalService: GeneralService) {
                localStorage.setItem('UserId', null);
                this.LoginFormGroup = LoginFormBuilder.group({
                  Login : LoginFormBuilder.group({
                    Username: ['', [Validators.required]],
                    Password: ['', [Validators.required]]
                  })
                });
               }

  ngOnInit(): void {
  }

  goToSignUp() {
    this.router.navigate(['sign-up']);
  }

  onLogin() {
    var logDetails = {
      Username : this.LoginFormGroup.get('Login').get('Username').value,
      Password : this.LoginFormGroup.get('Login').get('Password').value
    };
   

    this.generalService.getUserDetails(logDetails).subscribe(data => {
      console.log(data);
      if (data.Name) {
        localStorage.setItem('UserId', JSON.stringify(data.UserId));
        this.generalService.data = data;
        this.router.navigate(['listing']);
      } else {
        console.log('Invalid Username or Password');
      }
    }, (err) => {
      console.log(err);
    });
    // this.router.navigate(['listing']);
  }

}
