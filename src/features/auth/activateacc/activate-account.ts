import { Component, inject, OnInit, signal } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
    selector: "acc-activate",
    imports: [RouterLink],
    templateUrl: "./activate-acc.html",
})
export class Activate implements OnInit {
    private route = inject(ActivatedRoute);
    private auth = inject(AuthService);
    protected message = signal('Activating account...');
    protected success = signal(false);

    ngOnInit() {
        const code = this.route.snapshot.paramMap.get('code')!;
        this.auth.activate(code).subscribe({
            next: () => { this.message.set('Account activated! You can log in now.'); this.success.set(true); },
            error: () => this.message.set('Activation failed — the code is invalid or expired.'),
        });
    }
}