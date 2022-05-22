import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  OnInit } from '@angular/core';
import { post } from '../post.model';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit{
  loadedPosts : post[] = [];

  constructor(
    private http:HttpClient){}

    ngOnInit(): void {
      this.getUser();
    }

postUser(postData: {userName:post}){
          this.http.post("https://assignment-992d2-default-rtdb.firebaseio.com/posts.json", postData)
          .subscribe(userdata =>{
          })
};


onFetchPosts(){
  this.getUser();
}


getUser(){
    this.http.get<{[ key:string ] : post}>("https://assignment-992d2-default-rtdb.firebaseio.com/posts.json")
    .pipe(map((responseData) =>{
      const postArray: post[] =[];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          postArray.push({ ...responseData[key] ,id: key}) 
        }
      }
      return postArray;
    }))
    .subscribe(posts =>{
      this.loadedPosts = posts;
      console.log(this.loadedPosts)
    });
    return this.loadedPosts;
}

 deleteUser(hashKey:number){
  const endPoint = 'https://assignment-992d2-default-rtdb.firebaseio.com/posts.json/'+ hashKey;
  console.log(hashKey);
  this.http.delete<any>(endPoint).subscribe()
  
}

putUser(data:any,id:any){
  console.log(data)
  console.log(id)
  const url = "https://assignment-992d2-default-rtdb.firebaseio.com/posts.json/"+id;
  return this.http.put<any>(url, data)
}
  
} 

