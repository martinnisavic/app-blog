import { PostService } from "../../core/services/post.service";
import { Component, inject, OnInit, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Post } from "../../core/types/post.types";

@Component({
    selector: 'app-post-list',
    imports: [RouterLink, FormsModule],
    templateUrl: './post-list.html',
    styleUrl: './post-list.scss'
})
export class PostList implements OnInit {
    private postService = inject(PostService);
    protected posts = signal<Post[]>([]);
    protected loading = signal(true);
    protected keyword = '';

    ngOnInit() {
        this.load();
    }

    load() {
        this.loading.set(true);
        this.postService.getPosts(this.keyword).subscribe({
            next: (res) => {
                this.posts.set(res.items);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
}
