import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  public list: any = [];
  public Name: string;
  public studentData: any;
  public studentId: number;
  constructor(private generalService: GeneralService,
              private router: Router) {
    generalService.getAllSubjects().subscribe(subList => {
      console.log(subList);
      this.list = subList;
    });
   }

  ngOnInit(): void {
    this.studentId = JSON.parse(localStorage.getItem('UserId'));
    this.generalService.getUserById(this.studentId).subscribe(data => {
      this.studentData = data;
      this.Name = this.studentData.Name;
    });

    //this.studentData = JSON.parse(localStorage.getItem('data'));
    // this.Name = this.studentData.Name;
  }

  getSubjectByDept() {
    // console.log('adfcdsaf')
    this.generalService.getSubByDept(this.studentData.Dept).subscribe(subByDept => {
      console.log(subByDept);
      this.list = subByDept;
    });
  }
  
  onEditClick() {
    this.router.navigate(['sign-up']);
  }

  onDelete(rowData) {
    console.log(rowData.SubjectId);
    this.generalService.deleteSubject(rowData.SubjectId).subscribe(res => {
      console.log(res);
    });
  }
}
