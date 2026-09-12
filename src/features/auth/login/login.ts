import { AuthService } from "../../../core/services/auth.service";
import { Component, inject, signal, Signal } from "@angular/core";
import { LoginData } from "../../../core/types/auth.types";
import { Router } from "@angular/router";
import { ReactiveFormsModule, Validators, FormBuilder } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    imports: [ReactiveFormsModule],
    styleUrl: './login.scss'
})
export class Login {

    private auth = inject(AuthService);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder);

    protected loading = signal(false);
    protected error = signal<string | null>(null);

    protected form = this.formBuilder.nonNullable.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(3)]]
    })

    onSubmit() {
        if (this.form.invalid) return;
        this.loading.set(true);
        this.error.set(null);
        this.auth.login(this.form.getRawValue())
            .subscribe({
                next: () => { this.router.navigate(['/']) },
                error: (err) => {
                    this.loading.set(false);
                    this.error.set(typeof err.error === 'string' ? err.error : 'Wrong credentials')
                }
            })

    }
}