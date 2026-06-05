---
title:  Sitemap, Robot.txt, Webmanifest
articleSlug: sitemap-robots-web-manifest
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: sitemap, seo, search-engines

What is a sitemap.xml file and why is it important?

<!-- ANSWER -->
A sitemap is an XML file that lists important URLs of a website so search engines can discover and crawl them efficiently.

Typical location:

```text
https://example.com/sitemap.xml
```

Basic structure:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
  </url>
</urlset>
```

Important sitemap tags:

| Tag            | Purpose                |
| -------------- | ---------------------- |
| `<urlset>`     | Root container         |
| `<url>`        | Represents a page      |
| `<loc>`        | Page URL               |
| `<lastmod>`    | Last modification date |
| `<changefreq>` | Update frequency hint  |
| `<priority>`   | Relative importance    |

Benefits:

* faster page discovery
* improved crawl efficiency
* better indexing for deep pages
* helps search engines understand site structure

Sitemaps are especially important for:

* large websites
* news websites
* ecommerce platforms
* dynamically generated pages

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: robots-txt, crawlers, seo

What is robots.txt and how does it work?

<!-- ANSWER -->
The `robots.txt` file tells search engine crawlers which parts of a website they are allowed or not allowed to crawl.

Location:

```text
https://example.com/robots.txt
```

Example:

```txt
User-agent: *
Disallow: /admin/
Disallow: /private/
```

Important directives:

| Directive   | Purpose                    |
| ----------- | -------------------------- |
| User-agent  | Specifies target crawler   |
| Disallow    | Blocks crawling            |
| Allow       | Explicitly allows crawling |
| Sitemap     | Points to sitemap URL      |
| Crawl-delay | Requests slower crawling   |

Example with sitemap:

```txt
User-agent: *
Disallow: /tmp/

Sitemap: https://example.com/sitemap.xml
```

Important limitation:

```text id="7pc9ey"
robots.txt is NOT a security mechanism.
```

It only instructs well-behaved crawlers.

Sensitive content should still be protected using:

* authentication
* authorization
* server-side access controls

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: web-manifest, pwa, frontend

What is a site.webmanifest file?

<!-- ANSWER -->
A `site.webmanifest` file provides metadata that allows a website to behave like an installable Progressive Web App (PWA).

Typical location:

```text
/site.webmanifest
```

Linked inside HTML:

```html
<link rel="manifest" href="/site.webmanifest">
```

Example manifest:

```json
{
  "name": "Vision App",
  "short_name": "Vision",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000"
}
```

Important fields:

| Field       | Purpose               |
| ----------- | --------------------- |
| name        | Full application name |
| short_name  | App icon label        |
| start_url   | Launch page           |
| display     | App display mode      |
| icons       | App icons             |
| theme_color | Browser theme color   |

The manifest enables:

* Add to Home Screen
* splash screens
* standalone app mode
* mobile app-like behavior

Without a manifest, browsers cannot fully install the website as a PWA.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: sitemap, crawl-budget, seo

What is crawl budget and how do sitemaps help optimize it?

<!-- ANSWER -->
Crawl budget refers to how many pages a search engine bot is willing to crawl within a certain period.

Large websites may contain:
- thousands of pages
- dynamically generated routes
- archived content

Without optimization:
- important pages may be missed
- indexing becomes slower
- crawl resources are wasted

Sitemaps help search engines prioritize important pages.

Example sitemap entry:

```xml
<url>
  <loc>https://example.com/blog</loc>
  <lastmod>2026-01-09</lastmod>
  <priority>0.8</priority>
</url>
```

Important sitemap metadata:

| Field      | Benefit                       |
| ---------- | ----------------------------- |
| lastmod    | Detect recently updated pages |
| priority   | Relative importance           |
| changefreq | Update frequency hint         |

Search engines use sitemaps to:

* discover new content faster
* avoid orphan pages
* optimize crawl efficiency

Sitemaps are especially useful for:

* large blogs
* ecommerce stores
* enterprise applications

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: robots-txt, seo, crawler-control

What are common mistakes when configuring robots.txt?

<!-- ANSWER -->
Incorrect `robots.txt` configuration can accidentally block important website resources.

Dangerous example:

```txt
User-agent: *
Disallow: /
```

This blocks the entire website from crawling.

Another common mistake:

```txt
Disallow: /css/
Disallow: /js/
```

Why this is bad:

| Problem         | Impact                                       |
| --------------- | -------------------------------------------- |
| CSS blocked     | Search engines cannot render pages correctly |
| JS blocked      | Dynamic content may not load                 |
| SEO degradation | Lower indexing quality                       |

Correct usage focuses on blocking:

* admin panels
* temporary files
* internal APIs
* private content

Example:

```txt
User-agent: *
Disallow: /admin/
Disallow: /internal/
Disallow: /api/private/
```

Important rule:

```text id="9t5vdc"
robots.txt controls crawling, not indexing or security.
```

Sensitive pages may still appear in search results if linked externally.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: pwa, web-manifest, mobile-web

What are the different display modes in a web manifest?

<!-- ANSWER -->
The `display` field controls how the installed web application appears to users.

Example:

```json
{
  "display": "standalone"
}
```

Available display modes:

| Mode       | Behavior                 |
| ---------- | ------------------------ |
| browser    | Normal browser tab       |
| standalone | Native app-like window   |
| fullscreen | Full screen experience   |
| minimal-ui | Minimal browser controls |

Commonly used mode:

```text id="5v4qwe"
standalone
```

because it:

* hides the browser URL bar
* looks like a native application
* improves mobile UX

Example:

```json
{
  "display": "fullscreen"
}
```

This removes almost all browser UI elements.

Display modes are an important part of Progressive Web App behavior.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: pwa, manifest, service-worker

What is required for a website to become a Progressive Web App (PWA)?

<!-- ANSWER -->
A website becomes a Progressive Web App when it includes:

| Requirement | Purpose |
|---|---|
| Web Manifest | App metadata |
| Service Worker | Offline functionality |
| HTTPS | Secure communication |

Example manifest:

```json
{
  "name": "Vision App",
  "start_url": "/",
  "display": "standalone"
}
```

Example service worker registration:

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

Service workers enable:

* offline support
* request caching
* push notifications
* background sync

HTTPS is mandatory because service workers require secure contexts.

Without these components:

* install prompts may not appear
* offline functionality fails
* the site is not considered a true PWA

Modern PWAs combine:

* manifest files
* service workers
* responsive design
* secure delivery

<!-- END -->