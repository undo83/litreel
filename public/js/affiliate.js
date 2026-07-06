// Affiliate wrapper for LitReel — Amazon (worldwide via OneLink) + Bookshop.org (US/UK/ES, 10%).
// Both IDs are PUBLIC (they appear in every affiliate link). Fill them after signup.

export const AMAZON_TAG = 'TODO';   // e.g. 'litreel-20' (from Amazon Associates)
export const BOOKSHOP_ID = 'TODO';  // numeric id (from Bookshop.org affiliate dashboard)

const has = v => v && !String(v).includes('TODO');

// Amazon — OneLink auto-redirects each visitor to their local Amazon, credit kept via tag.
export function amazonUrl(book) {
  const tag = has(AMAZON_TAG) ? AMAZON_TAG : '';
  if (book.asin) return `https://www.amazon.com/dp/${book.asin}${tag ? `?tag=${tag}` : ''}`;
  const q = encodeURIComponent(book.isbn || `${book.title || ''} ${book.author || ''}`.trim());
  return `https://www.amazon.com/s?k=${q}${tag ? `&tag=${tag}` : ''}`;
}

// Bookshop.org — 10% commission, supports independent bookstores (US / UK / Spain).
export function bookshopUrl(book) {
  if (!has(BOOKSHOP_ID) || !book.isbn) return null;
  return `https://bookshop.org/a/${BOOKSHOP_ID}/${book.isbn}`;
}

// Buttons to render for a book: Amazon worldwide (primary) + Bookshop where available.
export function buyLinks(book) {
  const links = [{ label: 'Get it on Amazon', url: amazonUrl(book), primary: true }];
  const bs = bookshopUrl(book);
  if (bs) links.push({ label: 'Indie · Bookshop', url: bs, primary: false });
  return links;
}
