// Books module — tries Firestore (`books`), falls back to cache/static.
// Each book carries `isbn` (Bookshop/cover) + optional `asin` (Amazon) + optional `slug`.
import { getDb, firestore } from './firebase-init.js';

const cover = isbn => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

export const STATIC_BOOKS = [
  { order: 1, title: 'The Housemaid', author: 'Freida McFadden', genre: 'Thriller', rating: 5, isbn: '9781538742570',
    blurb: "You think you know who the victim is in this house. You're wrong." },
  { order: 2, title: 'Fourth Wing', author: 'Rebecca Yarros', genre: 'Romantasy', rating: 5, isbn: '9781649374042',
    blurb: 'War college, dragons, and enemies-to-lovers tension that keeps you up all night.' },
  { order: 3, title: 'It Ends with Us', author: 'Colleen Hoover', genre: 'Romance', rating: 5, isbn: '9781501110368',
    blurb: 'The love story that wrecked BookTok — and the choice at its heart.' },
  { order: 4, title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', genre: 'Fiction', rating: 5, isbn: '9781501161933',
    blurb: 'Seven husbands. But none of them was the love of her life.' },
  { order: 5, title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas', genre: 'Romantasy', rating: 5, isbn: '9781619634442',
    blurb: 'Feyre, a land of faeries, and a forbidden love that started a phenomenon.' },
  { order: 6, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-help', rating: 5, isbn: '9780735211292',
    blurb: 'How 1% better every day compounds into a life you actually want.' }
].map(b => ({ ...b, cover: cover(b.isbn) }));

// Slug for dedicated pages (e.g. /the-housemaid).
export function slugify(s) {
  return (s || '').toString().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '');
}

// Find a book by slug: explicit `slug` field if present, else derived from title.
export function findBookBySlug(books, slug) {
  const s = slugify(slug);
  if (!s) return null;
  return (books || []).find(b => slugify(b.slug || b.title) === s) || null;
}

// Local cache for instant paint (stale-while-revalidate).
const CACHE_KEY = 'litreel_books_v1';

export function getCachedBooks() {
  try {
    const arr = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    return Array.isArray(arr) && arr.length ? arr : null;
  } catch { return null; }
}
function cacheBooks(books) { try { localStorage.setItem(CACHE_KEY, JSON.stringify(books)); } catch {} }

export async function loadBooks() {
  const db = await getDb();
  if (!db) return getCachedBooks() || STATIC_BOOKS;
  try {
    const { collection, getDocs, query, orderBy } = await firestore();
    const snap = await getDocs(query(collection(db, 'books'), orderBy('order')));
    const books = snap.docs.map(d => {
      const data = d.data();
      const ts = data.createdAt;
      const createdAt = ts && typeof ts.toMillis === 'function' ? ts.toMillis() : (typeof ts === 'number' ? ts : null);
      return { ...data, createdAt };
    });
    if (books.length) { cacheBooks(books); return books; }
    return STATIC_BOOKS;
  } catch (e) {
    console.warn('Firestore unavailable, using cache/static:', e);
    return getCachedBooks() || STATIC_BOOKS;
  }
}

export async function saveLead(email) {
  const db = await getDb();
  if (!db) { console.info('Lead (no Firebase):', email); return false; }
  try {
    const { collection, addDoc, serverTimestamp } = await firestore();
    await addDoc(collection(db, 'leads'), { email, createdAt: serverTimestamp(), source: 'landing' });
    return true;
  } catch (e) { console.warn('Could not save lead:', e); return false; }
}
