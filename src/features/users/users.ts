import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { UserService } from "../../core/services/user.service";
import { User } from "../../core/types/user.types";

@Component({
    selector: 'app-users',
    imports: [FormsModule, RouterLink],
    templateUrl: './users.html',
    styleUrl: './users.scss'
})
export class Users implements OnInit {
    private userService = inject(UserService);
    protected users = signal<User[]>([]);
    protected loading = signal(true);
    protected keyword = '';

    ngOnInit() {
        this.load();
    }

    load() {
        this.loading.set(true);
        this.userService.getUsers(this.keyword).subscribe({
            next: (res) => {
                this.users.set(res.items);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
}
