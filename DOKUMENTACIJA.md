# 📝 App Blog — Dokumentacija

Angular blog sajt koji čita podatke iz JSON fajla. Projekat za ocenjivanje.

- **Tehnologije:** Angular 22, TypeScript, SCSS, RxJS, Signali
- **Rok za predaju:** 25.06.2026. do 15h
- **Repo:** https://github.com/martinnisavic/app-blog (privatan)

---

## 📂 Struktura projekta

```
app-blog/
├── public/
│   └── posts.json              # Izvor podataka (svi blog postovi)
├── src/
│   ├── app/
│   │   ├── post-list/          # Komponenta: lista svih postova (početna)
│   │   │   ├── post-list.ts
│   │   │   ├── post-list.html
│   │   │   └── post-list.scss
│   │   ├── post-detail/        # Komponenta: prikaz jednog posta
│   │   │   ├── post-detail.ts
│   │   │   ├── post-detail.html
│   │   │   └── post-detail.scss
│   │   ├── app.ts              # Korenska (root) komponenta
│   │   ├── app.html            # Glavni okvir + <router-outlet>
│   │   ├── app.config.ts       # Provideri (router, http, input binding)
│   │   └── app.routes.ts       # Definicije ruta
│   ├── services/
│   │   └── post.service.ts     # Servis koji dohvata postove (HttpClient)
│   ├── types/
│   │   └── posts.ts            # Post interfejs (tip podataka)
│   └── styles.scss             # Globalni stilovi
```

---

## 🧩 Šta je urađeno (po fajlovima)

### `types/posts.ts` — model podataka
Interfejs `Post` koji opisuje oblik jednog posta (`id`, `title`, `author`, `date`, `tags`, `excerpt`, `image`, `content`). Služi za proveru tipova i autocomplete.

### `public/posts.json` — podaci
Niz `Post` objekata. Sadrži više postova sa svim poljima, uključujući niz `tags`.

### `services/post.service.ts` — servis
- `@Injectable({ providedIn: 'root' })` — jedna instanca dostupna celoj aplikaciji
- `getPosts()` — preko `HttpClient`-a čita `posts.json`, vraća `Observable<Post[]>`
- `getPost(id)` — vraća jedan post po id-u (filtrira rezultat `getPosts`)

### `post-list/` — lista postova (početna strana)
- Ubacuje `PostService` preko `inject()`
- `posts` signal napravljen sa `toSignal(...)` iz Observable-a
- HTML: `@if`/`@for` control flow, kartice, property binding (`[src]`, `[routerLink]`), interpolacija

### `post-detail/` — prikaz jednog posta
- `id = input.required<string>()` — route parametar stiže preko input signala
- `idNum`, `post`, `paragraphs` — `computed` signali (izvedene vrednosti)
- `paragraphs` deli `content` na pasuse po `\n\n`
- HTML: `@if (post(); as p)`, `@for` za tagove i pasuse

### `app.config.ts` — konfiguracija
- `provideRouter(routes, withComponentInputBinding())` — rute + vezivanje route parametra na input
- `provideHttpClient()` — omogućava `HttpClient` u servisu

### `app.routes.ts` — rute
- `''` → `PostList` (početna)
- `post/:id` → `PostDetail` (detalj posta)

### Stilovi (SCSS)
- `styles.scss` — globalni reset, font, pozadina
- `app.scss` — zaglavlje i glavni kontejner
- `post-list.scss` — grid kartica, hover efekti, tagovi
- `post-detail.scss` — hero slika, naslov, tagovi, pasusi

---

## ✅ Status po rubrici za ocenjivanje

| # | Stavka | Bodovi | Status |
|---|--------|:------:|:------:|
| 1 | Struktura projekta | 4 | ✅ Ispunjeno |
| 2 | Komponente (svaka funkcionalnost zasebno) | 6 | ✅ Ispunjeno |
| 3 | Data binding i direktive | 6 | 🟡 Fali event binding (dolazi sa login formom) |
| 4 | Rutiranje i navigacija | 6 | ✅ Ispunjeno |
| 5 | Servisi i interfejsi | 8 | ✅ Ispunjeno |
| 6 | Podaci (kompleksnost JSON-a) | 5 | 🟡 Dodati ugnježdene podatke za pun broj |

---

## 🔑 Ključni Angular koncepti korišćeni u projektu

- **Standalone komponente** — bez `NgModule`, svaka komponenta sama uvozi zavisnosti
- **Signali** — `toSignal()`, `computed()`, `input.required()`
- **Dependency Injection** — `inject()` + `@Injectable`
- **HttpClient** — čitanje podataka (`GET`)
- **Novi control flow** — `@if`, `@for`, `@else` u templejtima
- **Rutiranje** — `provideRouter`, `routerLink`, route parametri, `withComponentInputBinding`

---

## ▶️ Pokretanje projekta

```bash
npm install        # samo prvi put (instalira zavisnosti)
npx ng serve       # pokreće dev server
```

Otvoriti **http://localhost:4200** u browseru.

---

## 🔜 Sledeći koraci

- [ ] **Login funkcionalnost** (20.06.2026) — pokriva event binding (stavka 3)
- [ ] Obogatiti `posts.json` ugnježdenim podacima (stavka 6)
- [ ] (Bonus) Route guard za zaštićene rute
