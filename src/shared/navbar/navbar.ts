import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-navbar',
    imports: [RouterLink],
    templateUrl:'./navbar.html',
    styleUrl:'./navbar.scss'
})
export class NavBar {
    protected router = inject(Router);
    protected authService = inject(AuthService);
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}