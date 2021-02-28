import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { blog } from '../../models/blog';
import { HttpService } from '../../services/http.service';
import { NotificationService } from '../../services/notification.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {


  previousBlogs:blog[]=[];
  isLoading:boolean = false;
  currBlog:blog;
  toggleSort:Boolean =false;
  editBlogData:any;
  editBlogIndex:number;
  constructor(private _httpService:HttpService, private _notification:NotificationService) { }

  ngOnInit(): void {
   this.getPreviousBlogs();
  }

  getPreviousBlogs() {


    console.log("------",localStorage.getItem('blogData'));
    if(localStorage.getItem('user') != undefined) {
     let blogInfo= JSON.parse(localStorage.getItem('blogData'));
     this.previousBlogs = blogInfo?.blog;
     console.log("----hello--", this.previousBlogs);
    }


  }

  findCurrDate() {
    var today = new Date();
    return today.getTime();
  }

  onSubmit(form:NgForm){

    if(!form.valid) {
        return;
    }
    console.log("--------------form is", form.value.textBlog);


    this.isLoading=true;
    this.currBlog =  new blog(this.findCurrDate(), form.value.textBlog);
    this.previousBlogs.push(this.currBlog);

    console.log("-------updated prev array blog-------", this.previousBlogs);

    let blogInfo= JSON.parse(localStorage.getItem('blogData'));
    blogInfo.blog = this.previousBlogs;
    localStorage.setItem('blogData', JSON.stringify(blogInfo));
    this.isLoading=false;
    this._notification.showSuccess("Blog added successfully", "SUCCESS");
    form.reset();
  }

  deleteBlog(index:number) {
    console.log("-----------------", index);
    this.previousBlogs.splice(index, 1);
    let blogInfo= JSON.parse(localStorage.getItem('blogData'));
    blogInfo.blog = this.previousBlogs;
    localStorage.setItem('blogData', JSON.stringify(blogInfo));
    this._notification.showSuccess("Blog deleted successfully", "SUCCESS");
  }

 sortMe() {
   if(this.toggleSort==true) {
    this.previousBlogs.sort((a, b) => (a['date'] > b['date']) ? 1 : -1)
   }
   else {
    this.previousBlogs.sort((a, b) => (a['date'] < b['date']) ? 1 : -1)
   }
   this.toggleSort = !this.toggleSort;

 }
 editBlog(index:number) {
  $('#editBlogButton').click();
  this.editBlogData = this.previousBlogs[index]['paragraph'];
  this.editBlogIndex = index;
  console.log("edit is ", this.editBlogData);
}
saveEditedBlog() {
this.previousBlogs[this.editBlogIndex]['paragraph'] = this.editBlogData;
let blogInfo= JSON.parse(localStorage.getItem('blogData'));
blogInfo.blog = this.previousBlogs;
localStorage.setItem('blogData', JSON.stringify(blogInfo));
this._notification.showSuccess("Blog edtied successfully", "SUCCESS");
$('#closeModal').click();
}

}
