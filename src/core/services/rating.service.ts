import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../types/enviroment";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RatingService {
    private http = inject(HttpClient);
    private URL = `${environment.apiUrl}/api/rating`;

    ratePost(postId: number, value: number): Observable<void> {
        return this.http.post<void>(this.URL, { postId, value });
    }
}
