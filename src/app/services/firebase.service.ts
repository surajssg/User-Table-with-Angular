import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnInit {
  loadedPosts: any = [];
  postArray: any = [];
  getObservableValue: any;
  name = "suraj";
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
  }

  postUser(postData: any): Observable<any> {
    console.log(postData);
    const res = this.http.post(
      'https://usersdatabase-4f37c-default-rtdb.firebaseio.com/posts.json',
      postData
    );
    return res;
  }

  
  getUser(): Observable<any> {
    return this.http.get<any>(
      'https://usersdatabase-4f37c-default-rtdb.firebaseio.com/posts.json'
    );
  }

  deleteUser(hashKey: number) {
    const endPoint =
      'https://usersdatabase-4f37c-default-rtdb.firebaseio.com/posts/' +
      hashKey +
      '/.json';

    return this.http.delete<any>(endPoint);
  }

  putUser(data: any, id: any) {
    const url =
      'https://usersdatabase-4f37c-default-rtdb.firebaseio.com/posts/' +
      id +
      '.json';
    return this.http.put<any>(url, data);
  }
}
