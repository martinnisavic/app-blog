import { Component, inject, OnInit, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CategoryService } from "../../core/services/category.service";
import { LocalCategory } from "../../core/types/local-category.types";

@Component({
    selector: 'app-categories',
    imports: [RouterLink],
    templateUrl: './categories.html',
    styleUrl: './categories.scss'
})
export class Categories implements OnInit {
    private categoryService = inject(CategoryService);
    protected categories = signal<LocalCategory[]>([]);
    protected loading = signal(true);

    ngOnInit() {
        this.categoryService.getLocalCategories().subscribe({
            next: (res) => {
                this.categories.set(res);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
}
