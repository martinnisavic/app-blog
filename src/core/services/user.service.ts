import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../types/enviroment";
import { Observable } from "rxjs";
import { PagedResponse } from "../types/post.types";
import { User } from "../types/user.types";

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);
    private URL = `${environment.apiUrl}/api/user`;

    getUsers(keyword = ''): Observable<PagedResponse<User>> {
        let params = new HttpParams();
        if (keyword) params = params.set('keyword', keyword);
        return this.http.get<PagedResponse<User>>(this.URL, { params });
    }
}
