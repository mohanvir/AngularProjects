import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { post } from 'selenium-webdriver/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isFetching = false;
  loadedPosts = [];

  constructor(private http: HttpClient, private postService:PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts =>{
      this.isFetching  = false;
      this.loadedPosts = posts;
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.createAndStorePosts(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts =>{
      this.isFetching  = false;
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe( ()=> {
      this.loadedPosts =[]
    })
  }
}
