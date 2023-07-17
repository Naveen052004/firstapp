import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Student } from './student.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'firstapp';
  studentsList : Student[] =[]
  constructor(
    private appService: AppService,
  ) { }
  ngOnInit(): void {
    this.getStudentsData();
  }
  async getStudentsData(){
    const awaitResponse = this.appService.getStudents();
    this.studentsList=await lastValueFrom(awaitResponse);
    console.log(this.studentsList);
  }

  async clickMe(id: number | undefined |null) {
    const awaitResponse = this.appService.deleteStudentbyId(id);
    let deleteStatus = await lastValueFrom(awaitResponse);
    // this.getStudentsData();
    if(deleteStatus) {
      this.getStudentsData();
    } else {
      alert("Not deleted");
    }
  }
  async createStud(temp:Student){
    const awaitResponse=this.appService.postStudent(temp);
    let postStatus = await lastValueFrom(awaitResponse);
    if(postStatus){
      this.getStudentsData();
    }
    else{
      alert("Failed");
    }
  }
  async disp(){
    const temp=new Student();
    temp.name=(<HTMLInputElement>document.getElementById("name")).value;; 
    temp.gender=(<HTMLInputElement>document.querySelector('input[name="gender"]:checked')).value;
    temp.rollNumber=(<HTMLInputElement>document.getElementById("roll")).value;
    temp.classInfo=(<HTMLInputElement>document.getElementById("info")).value;
    this.createStud(temp);
  }
}
