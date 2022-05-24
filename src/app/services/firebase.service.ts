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


onFetchPosts(){
  this.getUser();
}


getUser():any{
  let retunAray:any  =[];
    return this.http.get<{[ key:string ] : post}>("https://assignment-992d2-default-rtdb.firebaseio.com/posts.json")
    .pipe(map((responseData) =>{
      const postArray: post[] =[];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          postArray.push({ ...responseData[key] ,id: key}) 
        }
      }
      console.log(postArray)   
      return postArray;
    }))
    // .subscribe(posts =>{
    //   console.log(posts)
    //   retunAray = posts;
    //   return posts;
    // });
    // console.log(retunAray)

}

 deleteUser(hashKey:number){
  const endPoint = 'https://assignment-992d2-default-rtdb.firebaseio.com/posts/'+ hashKey+'.json';
  console.log(hashKey);
  return this.http.delete<any>(endPoint);

}

putUser(data:any,id:any){
  console.log(data)
  console.log(id)
  const url = "https://assignment-992d2-default-rtdb.firebaseio.com/posts/"+id+'.json';
  return this.http.put<any>(url, data);
}
  
} 

