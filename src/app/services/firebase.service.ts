import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  OnInit } from '@angular/core';
import { post } from '../post.model';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit{
  loadedPosts : any = [];
  postArray: any  =[];


  constructor(
    private http:HttpClient){}

    ngOnInit(): void {
      //this.getUser();
    }

postUser(postData: {userName:post}){
  console.log(postData)
          this.http.post("https://assignment-992d2-default-rtdb.firebaseio.com/posts.json", postData)
          .subscribe(userdata =>{
            // window. location. reload();
          })
};


// onFetchPosts(){
//   this.getUser();
// }


getUser():any{
    this.postArray =[]
    return this.http.get<{[ key:string ] : post}>("https://assignment-992d2-default-rtdb.firebaseio.com/posts.json")
    // .pipe(map((responsedata:any) =>{
    //   for (const key in responsedata){
    //   if(responsedata.hasOwnProperty(key))
    //    this.postArray.push({...responsedata[key], id: key})
    //   }
    //   console.log(this.postArray)
    //   console.log(typeof this.postArray)
    //   return this.postArray
    // }))
    // .subscribe(posts =>{
    //   console.log(posts);
    //   return posts
    //   });    
    }


 deleteUser(hashKey:number){
  const endPoint = 'https://assignment-992d2-default-rtdb.firebaseio.com/posts/'+ hashKey+'.json';
  console.log(hashKey);
  return this.http.delete<any>(endPoint);
}

putUser(data:any,id:any){
  const url = "https://assignment-992d2-default-rtdb.firebaseio.com/posts/"+id+'.json';
  return this.http.put<any>(url, data);
}
  
} 

