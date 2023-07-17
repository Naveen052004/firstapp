import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Student } from "./student.model";

const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});

const options = {
    headers: headers,
};
@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor(private http: HttpClient) {

    }
    getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>("student/all", options);
    }

    deleteStudentbyId(id: number | undefined| null) {
        return this.http.delete("student/delete/" + id, { responseType: 'text' });
    }

    postStudent(student: Student): Observable<Student> {
        return this.http.post<Student>("createStudent", student, options);
      }
}