import { Component, inject, OnInit, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { PostService } from "../../core/services/post.service";
import { Post } from "../../core/types/post.types";

@Component({
    selector: 'app-profile',
    imports: [RouterLink],
    templateUrl: './profile.html',
    styleUrl: './profile.scss'
})
export class Profile implements OnInit {
    protected auth = inject(AuthService);
    private postService = inject(PostService);
    protected posts = signal<Post[]>([]);
    protected loading = signal(true);

    ngOnInit() {
        const id = this.auth.userId();
        this.postService.getPosts().subscribe({
            next: (res) => {
                this.posts.set(res.items.filter(p => p.authorId === id));
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
}
