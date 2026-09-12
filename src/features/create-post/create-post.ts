import { Router } from "@angular/router";
import { PostService } from "../../core/services/post.service";
import { CategoryService } from "../../core/services/category.service";
import { signal, inject, Component } from "@angular/core";
import { Validators } from "@angular/forms";
import { Category, CreatePostType } from "../../core/types/post.types";
import { switchMap } from "rxjs";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.html',
    styleUrl: './create-post.scss',
    imports: [ReactiveFormsModule]
})
export class CreatePost {
    private postService = inject(PostService);
    private categoryService = inject(CategoryService);
    private router = inject(Router)
    private formBuilder=inject(FormBuilder)

    protected form=this.formBuilder.nonNullable.group({
        title:['', [Validators.minLength(5), Validators.required]],
        description:['',[Validators.minLength(15), Validators.required]],
        categoryId:[0, [Validators.min(1)]]
    })
    protected loading = signal(false);
    protected error = signal<null | string>(null);
    protected categories = signal<Category[]>([]);

    protected file: File | null = null;

    constructor() {
        this.categoryService.getCategories().subscribe(c => this.categories.set(c));
    }

    onFile(event: Event) {
        const input = event.target as HTMLInputElement
        this.file = input.files?.[0] ?? null;
    }

    onSubmit() {
        this.loading.set(true);
        if (!this.file || this.form.invalid) {
            this.error.set("You have to upload a picture");
            return;
        }
        this.loading.set(true);
        this.postService.uploadImage(this.file).pipe(
            switchMap(res => this.postService.createPost({
                ...this.form.getRawValue(),
                image: res.path
            }))
        ).subscribe({
            next: () => { this.router.navigate(['/']) },
            error: () => {
                this.loading.set(false);
                this.error.set('There was an error with attepmting to publish new post')
            }
        });

    }



}