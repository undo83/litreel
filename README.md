# LitReel — Book Trailers (International)

> Sister project of CeCarte.ro, built by cloning its modular stack. English, worldwide audience.
> Identity: **"Movie trailers. For books."** — short video trailers → grow → affiliate.
> Domain: **litreel.com** (registered on Cloudflare).

---

## 1. Model
- Short video **book trailers** on TikTok/Reels (English, worldwide).
- Landing at **litreel.com** → affiliate links.
- **Monetization:**
  - **Bookshop.org** (US/UK/ES) — **10% commission** + supports indie bookstores (strong ethical hook).
  - **Amazon Associates** + **OneLink** — worldwide fallback (auto-redirects each visitor to their local Amazon).

## 2. Stack (cloned from CeCarte)
- Firebase Hosting + Firestore (books, leads), lazy modular init.
- `public/` served. Books from Firestore `books` (orderBy `order`) with static fallback in `books.js`.
- Covers via Open Library by ISBN. Each book has `isbn` (Bookshop) + optional `asin` (Amazon).
- Affiliate logic in `public/js/affiliate.js` (`AMAZON_TAG`, `BOOKSHOP_ID`).
- No Cloud Functions yet (Amazon PA-API is gated behind 3 sales; add later).

## 3. Setup checklist (to go live)
- [ ] **Firebase project** — create in console (id e.g. `litreel`). Update `.firebaserc` + `public/js/firebase-config.js` (web config). Enable Firestore + Hosting + Google sign-in.
- [ ] **Affiliate IDs** — fill in `public/js/affiliate.js`:
  - `BOOKSHOP_ID` — from Bookshop.org affiliate dashboard (after verification).
  - `AMAZON_TAG` — from Amazon Associates (apply once there's some traffic; 3-sales-in-180-days rule). Set up **OneLink** for worldwide.
- [ ] **Domain** — connect `litreel.com` in Firebase Hosting; add A record (DNS-only) in Cloudflare + email routing for `contact@litreel.com`.
- [ ] **GitHub repo** + auto-deploy workflow (like CeCarte).
- [ ] **Socials** — @litreel on TikTok + Instagram.
- [ ] **Legal pages** — `/privacy`, `/terms` (translate from CeCarte). *(TODO)*
- [ ] **Admin** — books CRUD page (translate/adapt from CeCarte `admin/carti.html`). *(TODO)*

## 4. Structure
```
litreel/
├── firebase.json · .firebaserc · firestore.rules
├── README.md
└── public/
    ├── index.html         # English landing (Amazon + Bookshop buttons)
    ├── css/legal.css
    └── js/
        ├── firebase-config.js   # TODO web config
        ├── firebase-init.js     # reusable lazy init
        ├── books.js             # Firestore + static fallback (English)
        └── affiliate.js         # Amazon (OneLink) + Bookshop.org
```

## 5. Next steps
1. Create Firebase project + fill config → first `firebase deploy`.
2. Fill Bookshop ID (Amazon later).
3. Connect litreel.com.
4. Translate legal + admin from CeCarte.
5. First English trailer scripts → @litreel TikTok.
