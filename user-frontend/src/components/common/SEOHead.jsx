/**
 * @file SEOHead.jsx
 * @description React Helmet Async SEO component for Treno (Karnal).
 * Sets page title, meta description, Open Graph tags, Twitter Card tags,
 * canonical URL, robots directive, and keywords.
 *
 * Requires `react-helmet-async`'s <HelmetProvider> to wrap your app root.
 *
 * @example
 * <SEOHead
 *   title="Manali Trek – 7 Days"
 *   description="Join our guided 7-day Manali trek with accommodation, meals & expert guides."
 *   image="https://cdn.Treno.in/trips/manali-trek.jpg"
 *   url="https://Treno.in/trips/manali-trek"
 *   keywords={['travel agency karnal', 'domestic tour packages', 'international holidays']}
 * />
 */

import { Helmet } from 'react-helmet-async';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SITE_NAME        = 'Treno';
const TITLE_SUFFIX     = `| ${SITE_NAME} Karnal`;
const DEFAULT_TITLE    = `Treno — Best Travel Agency in Karnal | Domestic & International Tours`;
const DEFAULT_DESC     =
  'Treno is Karnal’s premier travel agency offering end-to-end domestic and international travel services, ' +
  'curated group tours, holiday packages, flight bookings, and customized itineraries worldwide.';
const DEFAULT_IMAGE    = 'https://cdn.Treno.in/og/default-og-image.jpg';
const DEFAULT_URL      = 'https://Treno.in';
const TWITTER_HANDLE   = '@TrenoIn';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * SEO head tags component powered by react-helmet-async.
 *
 * @param {{
 *   title?:       string,
 *   description?: string,
 *   image?:       string,
 *   url?:         string,
 *   type?:        string,
 *   keywords?:    string[],
 *   noIndex?:     boolean,
 *   children?:    import('react').ReactNode,
 * }} props
 *
 * @param {string}   [props.title]                    - Page title (suffix "| Treno Karnal" appended automatically).
 * @param {string}   [props.description=DEFAULT_DESC] - Meta description (max ~160 chars recommended).
 * @param {string}   [props.image=DEFAULT_IMAGE]      - Absolute URL for OG / Twitter card image (1200×630 px ideal).
 * @param {string}   [props.url=DEFAULT_URL]          - Canonical URL for the current page.
 * @param {string}   [props.type='website']           - OG type: 'website' | 'article' | 'product'.
 * @param {string[]} [props.keywords=[]]              - Array of keyword strings joined into meta keywords.
 * @param {boolean}  [props.noIndex=false]            - Very restrictive robots directive when true.
 * @param {import('react').ReactNode} [props.children] - Optional extra <meta> / <link> tags passed directly.
 */
export default function SEOHead({
  title,
  description = DEFAULT_DESC,
  image       = DEFAULT_IMAGE,
  url         = DEFAULT_URL,
  type        = 'website',
  keywords    = [
    'travel agency in Karnal',
    'tour operators Karnal',
    'domestic travel packages Karnal',
    'international holiday packages',
    'best travel company Karnal',
  ],
  noIndex     = false,
  children,
}) {
  // Build final title string
  const fullTitle = title ? `${title} ${TITLE_SUFFIX}` : DEFAULT_TITLE;

  // Ensure image and URL are absolute
  const absoluteImage = image.startsWith('http') ? image : `${DEFAULT_URL}${image}`;
  const canonicalUrl  = url.startsWith('http')   ? url   : `${DEFAULT_URL}${url}`;

  return (
    <Helmet>
      {/* ── Basic ─────────────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow'}
      />

      {/* ── Canonical ─────────────────────────────────────────────── */}
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph ────────────────────────────────────────────── */}
      <meta property="og:type"        content={type}          />
      <meta property="og:site_name"   content={SITE_NAME}     />
      <meta property="og:title"       content={fullTitle}     />
      <meta property="og:description" content={description}   />
      <meta property="og:image"       content={absoluteImage} />
      <meta property="og:image:width"  content="1200"         />
      <meta property="og:image:height" content="630"          />
      <meta property="og:url"         content={canonicalUrl}  />
      <meta property="og:locale"      content="en_IN"         />

      {/* ── Twitter Card ──────────────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER_HANDLE}      />
      <meta name="twitter:creator"     content={TWITTER_HANDLE}      />
      <meta name="twitter:title"       content={fullTitle}            />
      <meta name="twitter:description" content={description}          />
      <meta name="twitter:image"       content={absoluteImage}        />

      {/* ── Theme color (mobile browsers) ─────────────────────────── */}
      <meta name="theme-color" content="#f59e0b" />

      {/* ── Caller-supplied extras ────────────────────────────────── */}
      {children}
    </Helmet>
  );
}