// Affiliate wrapper for LitReel — Amazon (worldwide via OneLink) + Bookshop.org (US/UK/ES, 10%).
// Both IDs are PUBLIC (they appear in every affiliate link). Fill them after signup.

export const AMAZON_TAG = 'TODO';   // e.g. 'litreel-20' (from Amazon Associates)
export const BOOKSHOP_ID = '125925';  // Bookshop.org affiliate id

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

// Buttons for a book. Bookshop is our configured earner (10%) → primary.
// Amazon only shows once we actually have a tag (otherwise it earns nothing).
export function buyLinks(book) {
  const links = [];
  const bs = bookshopUrl(book);
  if (bs) links.push({ label: 'Get it on Bookshop', url: bs, primary: true });
  if (has(AMAZON_TAG)) links.push({ label: bs ? 'Amazon' : 'Get it on Amazon', url: amazonUrl(book), primary: !bs });
  // Never leave a dead card: if nothing is configured, fall back to Amazon search.
  if (!links.length) links.push({ label: 'Get it on Amazon', url: amazonUrl(book), primary: true });
  return links;
}
