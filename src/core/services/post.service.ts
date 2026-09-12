import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../types/enviroment";
import { Observable } from "rxjs";
import { CreatePostType, PagedResponse, Post, PostEditDTO } from "../types/post.types";

@Injectable({ providedIn: 'root' })
export class PostService {
    private URL = `${environment.apiUrl}/api/post`;
    private http = inject(HttpClient);

    uploadImage(file: File): Observable<{ path: string }> {
        const form = new FormData();
        form.append('file', file);
        return this.http.post<{ path: string }>(`${environment.apiUrl}/api/upload`, form);
    }

    createPost(data: CreatePostType): Observable<void> {
        return this.http.post<void>(this.URL, data)
    }

    getPosts(keyword = ''): Observable<PagedResponse<Post>> {
        let params = new HttpParams();
        if (keyword) params = params.set('keyword', keyword);
        return this.http.get<PagedResponse<Post>>(this.URL, { params });
    }

    getPost(postId: number): Observable<Post> {
        return this.http.get<Post>(`${this.URL}/${postId}`);
    }

    deletePost(postId: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/${postId}`);
    }

    editPost(data:PostEditDTO):Observable<void>{
        return this.http.put<void>(`${this.URL}`, data);
    }
}