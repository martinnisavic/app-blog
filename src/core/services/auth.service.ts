import { HttpClient } from "@angular/common/http";
import { inject, signal, Injectable, computed } from "@angular/core";
import { LoginData, LoginResponseDTO, RegisterData } from "../types/auth.types";
import { Observable, tap } from "rxjs";
import { environment } from "../types/enviroment";


@Injectable({ providedIn: 'root' })
export class AuthService {
    http = inject(HttpClient);
    BaseURL = `${environment.apiUrl}/api`
    private _isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

    private roleFromToken(): string | null {
        const token = this.getToken();
        if (!token) {
            return null;
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.Role ?? null
        }
        catch {
            return null;
        }
    }

    private userIdFromToken(): number | null {
        const token = this.getToken();
        if (!token) return null;
        try { return Number(JSON.parse(atob(token.split('.')[1])).Id) || null; }
        catch { return null; }
    }

    private claimFromToken(key: string): string | null {
        const token = this.getToken();
        if (!token) return null;
        try { return JSON.parse(atob(token.split('.')[1]))[key] ?? null; }
        catch { return null; }
    }


    private _userId = signal<number | null>(this.userIdFromToken());
    userId = this._userId.asReadonly();
    private _role = signal<string | null>(this.roleFromToken())
    role = this._role.asReadonly();
    private _username = signal<string | null>(this.claimFromToken('Username'));
    username = this._username.asReadonly();
    private _email = signal<string | null>(this.claimFromToken('Email'));
    email = this._email.asReadonly();
    isAdmin = computed(() => this._role() === 'Admin');
    isUser = computed(() => this._role() === 'User');



    isLoggedIn = this._isLoggedIn.asReadonly();

    register(data: RegisterData): Observable<void> {
        return this.http.post<void>(this.BaseURL + "/register", data)
    }
    login(data: LoginData): Observable<LoginResponseDTO> {
        return this.http.post<LoginResponseDTO>(`${this.BaseURL}/auth`, data)
            .pipe(tap(res => {
                localStorage.setItem('token', res.token);
                this._isLoggedIn.set(true);
                this._userId.set(this.userIdFromToken());
                this._role.set(this.roleFromToken());
                this._username.set(this.claimFromToken('Username'));
                this._email.set(this.claimFromToken('Email'));
            }));
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }
    logout(): void {
        localStorage.removeItem('token');
        this._isLoggedIn.set(false);
        this._role.set(null);
        this._userId.set(null);
        this._username.set(null);
        this._email.set(null);
    }

    activate(code: string): Observable<string> {
        return this.http.get(`${this.BaseURL}/activateaccount/${code}`, { responseType: 'text' });
    }
}