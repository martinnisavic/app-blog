import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Category, PostEditDTO } from "../../core/types/post.types";
import { Component, signal, inject, OnInit } from "@angular/core";
import { PostService } from "../../core/services/post.service";
import { CategoryService } from "../../core/services/category.service";
import { ActivatedRoute, Router } from "@angular/router";



@Component({
    imports: [ReactiveFormsModule],
    templateUrl: './edit-post.html',
    styleUrl: 'edit-post.scss'
})
export class EditPost implements OnInit {
    private postService = inject(PostService);
    private categoryService = inject(CategoryService);
    private formBuilder = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    protected id!: number;
    protected loading = signal(false);
    protected error = signal<null | string>(null);
    protected categories = signal<Category[]>([]);
    protected form = this.formBuilder.nonNullable.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        categoryId: [0, [Validators.min(1)]]
    });

    onSubmit() {
        if (this.form.invalid) return;
        const data: PostEditDTO = {
            id: this.id,
            ...this.form.getRawValue()
        };
        this.postService.editPost(data)
            .subscribe({
                next: () => {
                    this.error.set(null);
                    this.router.navigate(['/post', this.id]);
                },
                error: (err) => {
                    this.error.set('Failed to update post');
                    this.loading.set(false);
                }
            })
    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(c => this.categories.set(c));
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.postService.getPost(this.id).subscribe(p => {
            this.form.patchValue({ title: p.title, description: p.description, categoryId: p.categoryId });
        })
    }
}