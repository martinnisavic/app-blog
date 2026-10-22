import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PostService } from "../../core/services/post.service";
import { Post } from "../../core/types/post.types";

@Component({
    selector: 'app-category-posts',
    imports: [RouterLink],
    templateUrl: './category-posts.html',
    styleUrl: './category-posts.scss'
})
export class CategoryPosts implements OnInit {
    private route = inject(ActivatedRoute);
    private postService = inject(PostService);
    protected posts = signal<Post[]>([]);
    protected loading = signal(true);
    protected categoryName = signal('');

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.categoryName.set(this.route.snapshot.queryParamMap.get('name') ?? 'Kategorija');
        this.postService.getPosts().subscribe({
            next: (res) => {
                this.posts.set(res.items.filter(p => p.categoryId === id));
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
}
