import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prev-blogs',
  templateUrl: './prev-blogs.component.html',
  styleUrls: ['./prev-blogs.component.scss']
})
export class PrevBlogsComponent implements OnInit {
  @Input("blog") prevBlog:any;
  constructor() { }

  ngOnInit(): void {
  }

}
