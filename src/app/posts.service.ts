import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Post} from './post.model';
import {map} from 'rxjs/operators'

@Injectable({providedIn:'root'})
export class PostsService{

    constructor(private http:HttpClient) { }
    createAndStorePosts(title:string, content:string){
        const postData :Post = {title: title, content:content}
        this.http.post<{name:string}>('https://ng-complete-guide-mohan.firebaseio.com/posts.json',
        postData).subscribe();
    }

    fetchPosts(){
        return this.http.get< { [key:string] : Post}>('https://ng-complete-guide-mohan.firebaseio.com/posts.json'
        ).pipe( map( (responseData ) =>{
          const postArray: Post[] = [];
          for (const key in responseData){
            if(responseData.hasOwnProperty(key)) {
            postArray.push({... responseData[key], id: key });
          }
        }
        return postArray
        }))
    }
    deletePosts() {
       return  this.http.delete('https://ng-complete-guide-mohan.firebaseio.com/posts.json')
    }
}
