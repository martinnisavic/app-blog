import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { startWith } from "rxjs";
import {
    AbstractControl,
    ReactiveFormsModule,
    Validators,
    FormBuilder,
    ValidationErrors
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { FieldErrors } from "../../../shared/field-errors/field-errors";

function passwordMatch(group: AbstractControl): ValidationErrors | null {
    const pass = group.get("password")?.value;
    const conf = group.get("confPassword")?.value;
    return pass === conf ? null : { passwordMismatch: true };
}

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, RouterLink, FieldErrors],
    templateUrl: './register.html',
    styleUrl: './register.scss'
})
export class Register {
    private auth = inject(AuthService);
    private fb = inject(FormBuilder);

    protected error = signal<string | null>(null);
    protected loading = signal(false);
    protected isRegistered = signal(false);

    protected form = this.buildForm();
    protected get f() { return this.form.controls; }

    private formEvents = toSignal(this.form.events.pipe(startWith(null)));
    protected formInvalid = computed(() => { this.formEvents(); return this.form.invalid; });
    protected mismatch = computed(() => {
        this.formEvents();
        return !!this.form.errors?.['passwordMismatch'] && this.f.confPassword.touched;
    });

    onSubmit() {
        if (this.form.invalid) return;
        this.loading.set(true);
        this.error.set(null);

        const { confPassword, ...data } = this.form.getRawValue();
        this.auth.register(data).subscribe({
            next: () => {
                this.loading.set(false);
                this.isRegistered.set(true);
            },
            error: (err) => {
                this.error.set(err.error?.[0]?.error ?? 'Registration failed');
                this.loading.set(false);
            }
        });
    }

    private buildForm() {
        return this.fb.nonNullable.group({
            name: ['', [Validators.required, Validators.minLength(3),
                Validators.pattern(/^[A-ZČĆŠĐ][a-zšđčć]+(\s[A-ZČĆŠĐ][a-zšđčć]+|-[A-ZČĆŠĐ][a-zšđčć]+)*$/)]],
            surname: ['', [Validators.required, Validators.minLength(3),
                Validators.pattern(/^[A-ZČĆŠĐ][a-zšđčć]+(\s[A-ZČĆŠĐ][a-zšđčć]+|-[A-ZČĆŠĐ][a-zšđčć]+)*$/)]],
            username: ['', [Validators.required, Validators.pattern(/^[A-Za-z\d\._]{3,30}$/)]],
            email: ['', [Validators.required,
                Validators.pattern(/^[a-z\d\.]{3,30}\@(gmail\.com|ict\.edu\.rs|yahoo\.com)$/)]],
            phone: ['', [Validators.required,
                Validators.pattern(/^(\+381[6][0-9]|\+381\s[6][0-9]|[0][6][0-9])(\s\d{2}\s\d{2}\s\d{3}|-\d{2}-\d{2}-\d{3}|\d{7})$/)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,64}$/)]],
            confPassword: ['', Validators.required],
        }, { validators: passwordMatch });
    }
}
