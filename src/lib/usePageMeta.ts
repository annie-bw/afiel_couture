import { useEffect } from 'react';

const SITE = 'Afiel Couture';
const ORIGIN = 'https://afielcouture.com';
const CRUMB_ID = 'page-breadcrumb';

/** One step of the trail, as it reads on the page: Home / Products / Uniforms. */
export type Crumb = { name: string; path: string };

/**
 * Gives one page its own tab title and its own search snippet.
 *
 * The static tags in index.html remain the site-wide default, and they matter
 * more than this hook: WhatsApp, Facebook and X read the served HTML without
 * running any JavaScript, so a shared link always shows those. Google does
 * render the page, and picks these up per route.
 */
export default function usePageMeta(title: string, description: string, trail?: Crumb[]) {
  const trailKey = trail ? trail.map((c) => c.name + c.path).join('|') : '';

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

    // The trail as structured data. It is what lets a result read
    // "afielcouture.com > Products > School Uniforms" instead of a bare URL, and
    // it states the hierarchy Google uses when deciding whether to group a
    // site's pages under one result.
    document.getElementById(CRUMB_ID)?.remove();
    if (trail && trail.length > 1) {
      const tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = CRUMB_ID;
      tag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: ORIGIN + crumb.path,
        })),
      });
      document.head.appendChild(tag);
    }

    return () => document.getElementById(CRUMB_ID)?.remove();
  }, [title, description, trailKey]);
}
