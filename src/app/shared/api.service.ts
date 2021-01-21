import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPostRequest, IPostResponse} from './interfaces/post.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public getPosts(): Observable<IPostResponse[]> {
    return this.http.get<IPostResponse[]>(`${environment.api}/posts`);
  }

  public addPost(post: FormData): Observable<IPostResponse> {
    return this.http.post<IPostRequest>(`${environment.api}/posts`, {
        title: post.get('title'),
        author: post.get('author'),
        image: post.get('image'),
      });
  }
}
