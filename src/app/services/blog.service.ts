import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../pages/blogs/blog.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // http Header Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private httpClient: HttpClient) { }

  getBlogs(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/blogs/all_blogs')
  }

  createBlog(title: string, body: string, tags: String[]): Observable<any>{
    return this.httpClient.post('http://localhost:3000/blogs/create_blog',
    {title,body, tags},
    this.httpOptions)
  }

  find(_id: string): Observable<any>{
    return this.httpClient.get<Blog[]>('http://localhost:3000/blogs/find/' + _id)
  }

  editBlog(_id: string, title: string, body: string): Observable<any>{
    return this.httpClient.put('http://localhost:3000/blogs/update_blog/' + _id, {title,body}, this.httpOptions)
  }

  deleteBlog(_id: string): Observable<any>{
    return this.httpClient.delete('http://localhost:3000/blogs/delete_blog/' + _id, this.httpOptions)
  }

  myBlogs(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/blogs/your_blogs/')
  }

  addComment(_id: string, comment: String){
    return this.httpClient.put('http://localhost:3000/blogs/add_comment', {_id, comment})
  }


}
