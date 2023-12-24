import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../blog.model';


@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {

  blogs: any;
  p: any;
  message: string = '';



  constructor(private blogService: BlogService, private router: Router) { }
  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(){
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data.blogs;
      console.log(data);
    })
  }

  userTags: String[] = [];



  deleteBlog(_id: string){
    this.blogService.deleteBlog(_id).subscribe(res => {
         console.log('Пост успешно удален!');
         this.router.navigate(['/my-blogs']);
    }, (err) => {
      console.log(err);
    })
    }

}


