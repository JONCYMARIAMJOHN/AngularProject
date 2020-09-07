import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public data: any;

  constructor(private httpClient: HttpClient) { }

  getUserDetails(logDetails: any) {
    // return this.httpClient.get<any>('/api/Customer/GetSignUpDiscount?')
    return this.httpClient.post<any>('/api/login/userlogin', {Username: logDetails.Username, Password: logDetails.Password});
  }

  getAllSubjects() {
    return this.httpClient.post<any>('/api/listing/subjectlist',{});
  }

  getSubByDept(Department) {
    return this.httpClient.post<any>('/api/listing/subjectlist/dept', {Dept: Department});
  }

  addNewUser(userDetails) {
    return this.httpClient.post<any>('/api/add/user', {
      Name: userDetails.Name,
      Dept: userDetails.Dept,
      Username: userDetails.Username,
      Password: userDetails.Password
    });
  }

  editUser(userDetails, userId) {
    return this.httpClient.put(`/api/edituser?id=${userId}`, {
      Name: userDetails.Name,
      Dept: userDetails.Dept,
      Username: userDetails.Username,
      Password: userDetails.Password
    });
  }

  getUserById(userId) {
    return this.httpClient.post('/api/userdetails', {UserId: userId});
  }

  deleteSubject(id) {
    return this.httpClient.delete(`/api/listing/subject/delete?id=${id}`);
  }
}
