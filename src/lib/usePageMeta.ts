import { useEffect } from 'react';

const SITE = 'Afiel Couture';

/**
 * Gives one page its own tab title and its own search snippet.
 *
 * The static tags in index.html remain the site-wide default, and they matter
 * more than this hook: WhatsApp, Facebook and X read the served HTML without
 * running any JavaScript, so a shared link always shows those. Google does
 * render the page, and picks these up per route.
 */
export default function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const full = title === SITE ? title : `${title} | ${SITE}`;
    document.title = full;

    const set = (selector: string, value: string) => {
      const tag = document.head.querySelector(selector);
      if (tag) tag.setAttribute('content', value);
    };
    set('meta[name="description"]', description);
    set('meta[property="og:description"]', description);
    set('meta[name="twitter:description"]', description);
    set('meta[property="og:title"]', full);
    set('meta[name="twitter:title"]', full);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + window.location.pathname);
    }
  }, [title, description]);
}
