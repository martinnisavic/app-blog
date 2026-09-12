import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { PostService } from "../../core/services/post.service";
import { Signal, Component, OnInit, signal, inject } from "@angular/core";
import { Post } from "../../core/types/post.types";
import { Location } from "@angular/common";
import { CommentService } from "../../core/services/comment.service";
import { Comment } from "../../core/types/comment.types";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { RatingService } from "../../core/services/rating.service";

@Component({
    selector: "app-post-component",
    imports: [FormsModule, RouterLink],
    templateUrl: "post-detail.html",
    styleUrl: "post-detail.scss"
})
export class PostDetail implements OnInit {
    protected loading = signal(true);
    protected error = signal<null | string>(null);
    protected route = inject(ActivatedRoute)
    protected post = signal<null | Post>(null);
    private location = inject(Location);
    protected router=inject(Router);

    protected comments = signal<Comment[]>([]);
    protected newComment = '';

    protected postService = inject(PostService);
    protected auth = inject(AuthService);
    protected commentService = inject(CommentService);
    protected ratingService = inject(RatingService);

    protected stars = [1, 2, 3, 4, 5];

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.postService.getPost(id).subscribe({
            next: (p) => {
                this.post.set(p);
                this.loadComments(id);
                this.loading.set(false);
            },
            error: () => this.error.set("There was a problem with loading post")
        })
    }

    goBack() {
        this.location.back();
    }

    loadComments(id: number) {
        return this.commentService.getComments(id)
            .subscribe(c => this.comments.set(c));
    }

    addComment() {
        const postId = this.post()!.id;
        if (!this.newComment.trim()) return
        this.commentService.addComment({ text: this.newComment, postId })
            .subscribe(() => {
                this.newComment = '';
                this.loadComments(postId)
            });
    }

    deleteComment(commentId: number) {
        const postId = this.post()!.id;
        this.commentService.deleteComment(commentId)
            .subscribe(() => this.loadComments(postId))
    }

    deletePost(id: number) {
        this.postService.deletePost(id).subscribe(() => this.router.navigate(['/']));
    }


    displayRating(): number {
        const p = this.post();
        if (!p) return 0;
        return p.myRating > 0 ? p.myRating : Math.round(p.averageRating);
    }

    rate(value: number) {
        const id = this.post()!.id;
        this.ratingService.ratePost(id, value)
            .subscribe(() => this.postService.getPost(id).subscribe(p => this.post.set(p)));
    }

}