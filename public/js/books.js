// Books module — loads from Firestore `books` (with static fallback).
// Covers use Open Library by ISBN. Each book carries `isbn` (Bookshop) and optional `asin` (Amazon).
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

export async function loadBooks() {
  const db = await getDb();
  if (!db) return STATIC_BOOKS;
  try {
    const { collection, getDocs, query, orderBy } = await firestore();
    const snap = await getDocs(query(collection(db, 'books'), orderBy('order')));
    const books = snap.docs.map(d => d.data());
    return books.length ? books : STATIC_BOOKS;
  } catch (e) {
    console.warn('Firestore unavailable, using static books:', e);
    return STATIC_BOOKS;
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
