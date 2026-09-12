import { Component, DestroyRef, OnInit, computed, inject, input, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AbstractControl } from "@angular/forms";
import { startWith } from "rxjs";

@Component({
    selector: 'app-field-errors',
    template: `
        @if (show()) {
            @for (key of errorKeys(); track key) {
                <small class="field-error">{{ messages()[key] ?? 'Invalid field' }}</small>
            }
        }
    `,
    styles: `
        .field-error {
            display: block;
            color: #f87171;
            font-size: 0.78rem;
            margin: -0.4rem 0 0.2rem;
        }
    `
})
export class FieldErrors implements OnInit {
    control = input.required<AbstractControl>();
    messages = input<Record<string, string>>({});

    private destroyRef = inject(DestroyRef);
    private version = signal(0);

    ngOnInit() {
        this.control().events
            .pipe(startWith(null), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.version.update(v => v + 1));
    }

    protected show = computed(() => {
        this.version();
        const c = this.control();
        return c.touched && c.invalid;
    });

    protected errorKeys = computed(() => {
        this.version();
        return Object.keys(this.control().errors ?? {});
    });
}
