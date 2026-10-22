import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PostService } from "../../core/services/post.service";
import { Post } from "../../core/types/post.types";

@Component({
    selector: 'app-user-posts',
    imports: [RouterLink],
    templateUrl: './user-posts.html',
    styleUrl: './user-posts.scss'
})
export class UserPosts implements OnInit {
    private route = inject(ActivatedRoute);
    private postService = inject(PostService);
    protected posts = signal<Post[]>([]);
    protected loading = signal(true);
    protected author = signal('');

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.postService.getPosts().subscribe({
            next: (res) => {
                const mine = res.items.filter(p => p.authorId === id);
                this.posts.set(mine);
                this.author.set(mine[0]?.author ?? '');
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
}
