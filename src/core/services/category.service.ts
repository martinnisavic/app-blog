import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../types/enviroment";
import { Observable } from "rxjs";
import { Category } from "../types/post.types";
import { LocalCategory } from "../types/local-category.types";

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private http = inject(HttpClient);
    private URL = `${environment.apiUrl}/api/category`;

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.URL);
    }

    getLocalCategories(): Observable<LocalCategory[]> {
        return this.http.get<LocalCategory[]>('/categories.json');
    }
}
