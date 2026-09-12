import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../types/enviroment";
import { Observable } from "rxjs";
import { AddComment, Comment } from "../types/comment.types";

@Injectable({providedIn:"root"})
export class CommentService{
    private http=inject(HttpClient);
    private URL=`${environment.apiUrl}/api/comment`;

    getComments(postId:number):Observable<Comment[]>{
      return this.http.get<Comment[]>(`${this.URL}/${postId}`)
    }

    addComment(comment:AddComment): Observable<void>{
        return this.http.post<void>(this.URL, comment)    
    }

    deleteComment(id:number):Observable<void>{
        return this.http.delete<void>(`${this.URL}/${id}`)
    }
}