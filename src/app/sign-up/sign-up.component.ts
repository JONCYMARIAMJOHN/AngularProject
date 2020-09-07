import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '../../../node_modules/@angular/forms';
import { GeneralService } from '../services/general.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public SignUpFormGroup: FormGroup;
  public dataFlag;
  public userData: any;
  public userId = null;
  public pageHead: string;

  constructor(private router: Router,
              private SignUpFormBuilder: FormBuilder,
              private generalService: GeneralService) {


                this.userId = JSON.parse(localStorage.getItem('UserId'));
                this.generalService.getUserById(this.userId).subscribe((data: any) => {
                  this.userData = data;
                  console.log(this.userData);

                  if (!this.userData) {
                    this.pageHead = 'Add User';
                  } else {
                    console.log(this.userData.Name);
                    this.pageHead = 'Edit User';
                  }

                  this.SignUpFormGroup = SignUpFormBuilder.group({
                    Name: [this.userData ? this.userData.Name : '', [Validators.required]],
                    Department: [this.userData ? this.userData.Dept : '', [Validators.required]],
                    Username: [this.userData ? this.userData.Username : '', [Validators.required]],
                    Password: [this.userData ? this.userData.Password : '', [Validators.required]]
                  });
                  
                });
                console.log(this.userData);
                

                

               }

  ngOnInit(): void {
  }
  onSignUp() {
    if (this.SignUpFormGroup.valid) {
      const details = {
        Name: this.SignUpFormGroup.get('Name').value,
        Dept: this.SignUpFormGroup.get('Department').value,
        Username: this.SignUpFormGroup.get('Username').value,
        Password: this.SignUpFormGroup.get('Password').value
      };
      if (this.userData) {
        this.generalService.editUser(details, this.userData.UserId).subscribe();
        this.router.navigate(['listing']);
      } else {
        this.generalService.addNewUser(details).subscribe();
        this.router.navigate(['']);
      }
      
    }
  }


  onLogin() {
    this.router.navigate(['home']);
  }
}
