---
title: Sitemap, Robots.txt, and Web Manifest
description: A deep technical guide to sitemap.xml, robots.txt, and site.webmanifest — how search engines crawl your site, how bots are controlled, and how websites become installable PWAs.
category: SEO
order: 1
---

# Sitemap, Robots.txt, and Web Manifest

Modern websites are not designed only for users. They must also communicate clearly with:

- search engine crawlers
- indexing bots
- AI scrapers
- mobile operating systems
- browsers acting as application containers

Three critical infrastructure files help with this:

| File | Purpose |
|-----|-----|
| sitemap.xml | Helps search engines discover pages |
| robots.txt | Controls which bots can crawl what |
| site.webmanifest | Enables installable Progressive Web Apps |

These files live in the **root of your website** and are part of a well-structured production system.

Example:

```

[https://example.com/sitemap.xml](https://example.com/sitemap.xml)
[https://example.com/robots.txt](https://example.com/robots.txt)
[https://example.com/site.webmanifest](https://example.com/site.webmanifest)

```

---

# 1. Sitemap Files (sitemap.xml)

A **sitemap** is a structured XML file that lists important pages on your website so search engines can discover and crawl them efficiently.

Search engines such as Google, Bing, and DuckDuckGo use sitemaps to understand your site's structure.

Even though bots can follow links automatically, a sitemap ensures:

- newly published pages are discovered faster
- deep pages are not missed
- crawl resources are used efficiently

---

# Why Sitemaps Exist

Search engines allocate a **crawl budget** to each website.

Crawl budget means:

```

How many pages a search engine bot is willing to crawl
during a given time period.

```

If your website contains thousands of pages, bots might miss some of them.

A sitemap helps by explicitly listing the URLs that matter.

---

# Basic Sitemap Structure

A sitemap follows an XML schema.

Main structure:

```

urlset
└── url
├── loc
├── lastmod
├── changefreq
└── priority

```

Each `<url>` entry describes a single page.

---

# Important Sitemap Tags

### urlset

Root container for all URLs.

```

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
```

The **xmlns attribute defines the sitemap specification version**.

---

### url

Represents a single webpage.

```
<url>
</url>
```

---

### loc

The page URL.

```
<loc>https://example.com/blog</loc>
```

Must be **absolute URLs**.

---

### lastmod

Indicates the last modification date.

```
<lastmod>2026-01-09</lastmod>
```

Search engines may prioritize recently updated pages.

---

### changefreq

Tells bots how often the page changes.

```
<changefreq>daily</changefreq>
```

Possible values:

| Value   | Meaning             |
| ------- | ------------------- |
| always  | constantly changing |
| hourly  | every hour          |
| daily   | daily updates       |
| weekly  | weekly updates      |
| monthly | monthly             |
| yearly  | rarely updated      |

This is only a **hint**, not a strict instruction.

---

### priority

Relative importance.

```
<priority>1.0</priority>
```

Range:

```
0.0 → lowest priority
1.0 → highest priority
```

Example:

| Page          | Priority |
| ------------- | -------- |
| Homepage      | 1.0      |
| Blog posts    | 0.8      |
| Archive pages | 0.4      |

---

# Full Sitemap Example

```xml
<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-01-09T14:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://example.com/blog</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
```

---

# Advanced Sitemap Types

Sitemaps can include specialized namespaces.

Examples:

| Type                 | Purpose               |
| -------------------- | --------------------- |
| image sitemap        | image indexing        |
| video sitemap        | video discovery       |
| news sitemap         | Google News           |
| multilingual sitemap | hreflang localization |

Example with images:

```xml
<image:image>
  <image:loc>https://example.com/image.png</image:loc>
</image:image>
```

---

# Sitemap Limits

Search engines enforce limits:

| Limit                | Value  |
| -------------------- | ------ |
| Max URLs per sitemap | 50,000 |
| Max file size        | 50MB   |

Large sites must use **sitemap indexes**.

Example:

```
sitemap_index.xml
 ├── sitemap1.xml
 ├── sitemap2.xml
 └── sitemap3.xml
```

---

# 2. Robots Exclusion Protocol (robots.txt)

The **robots.txt file** tells bots how they are allowed to crawl your website.

It is the **first file crawlers request** when visiting a domain.

Example request:

```
GET /robots.txt
```

Location must be:

```
https://example.com/robots.txt
```

If the file does not exist, bots assume:

```
Everything is allowed.
```

---

# Robots.txt Syntax

A robots file consists of directives.

Structure:

```
User-agent
Allow
Disallow
Crawl-delay
Sitemap
```

---

# User-agent

Specifies which crawler the rule applies to.

Examples:

```
User-agent: *
```

Applies to all bots.

```
User-agent: Googlebot
```

Applies only to Google.

---

# Disallow

Blocks a path from crawling.

Example:

```
Disallow: /admin/
```

Bots cannot crawl anything under:

```
/admin/
```

---

# Allow

Overrides a disallow rule.

Example:

```
Disallow: /assets/
Allow: /assets/logo.png
```

Everything inside `/assets` is blocked except `logo.png`.

---

# Crawl-delay

Requests bots to slow down crawling.

Example:

```
Crawl-delay: 10
```

Meaning:

```
Wait 10 seconds between requests.
```

Not all bots respect this directive.

---

# Complete Robots Example

```
# Instructions for all bots
User-agent: *
Disallow: /admin/
Disallow: /tmp/
Disallow: /search?q=
Disallow: /api/private/

# Block AI crawlers
User-agent: GPTBot
Disallow: /

# Link to sitemap
Sitemap: https://example.com/sitemap.xml
```

---

# Important Robots.txt Rules

Robots.txt **does NOT enforce security**.

It only tells **polite bots** what they should avoid.

Malicious crawlers can ignore it.

Therefore:

```
Never rely on robots.txt to protect sensitive data.
```

Use authentication or server access controls instead.

---

# 3. Web Manifest (site.webmanifest)

The **Web Manifest** is part of the Progressive Web App standard.

It allows a website to behave like a **native mobile application**.

Browsers use this file to determine:

* application name
* icon set
* start page
* theme colors
* display mode

Without a manifest, browsers cannot show:

```
"Add to Home Screen"
```

---

# Manifest File Location

Typically stored as:

```
/site.webmanifest
```

Linked in HTML:

```
<link rel="manifest" href="/site.webmanifest">
```

---

# Manifest Structure

The file uses **JSON format**.

Main fields:

| Field       | Purpose       |
| ----------- | ------------- |
| name        | full app name |
| short_name  | icon label    |
| start_url   | entry page    |
| display     | UI style      |
| icons       | app icons     |
| theme_color | browser theme |

---

# Example Manifest

```json
{
  "name": "Vision Management System",
  "short_name": "VisionOS",
  "description": "Glassmorphism task manager",
  "start_url": "/dashboard",
  "scope": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#ffbf00",
  "orientation": "any",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

# Display Modes

Manifest supports several UI modes.

### browser

Normal browser tab.

### standalone

Looks like a native app.

No URL bar.

### fullscreen

Completely full screen.

### minimal-ui

Small navigation controls.

Most PWAs use:

```
"display": "standalone"
```

---

# Icon System

PWAs require multiple icon sizes.

Common sizes:

| Size           | Purpose             |
| -------------- | ------------------- |
| 192x192        | Android home screen |
| 512x512        | splash screens      |
| maskable icons | adaptive shapes     |

Maskable icons allow Android to crop icons without cutting logos.

Example:

```
"purpose": "any maskable"
```

---

# Manifest + Service Worker

To become a true PWA you need:

```
Manifest
+
Service Worker
+
HTTPS
```

Service workers enable:

* offline functionality
* caching
* push notifications

---

# Comparison Checklist

| Feature          | Sitemap       | Robots.txt    | Manifest             |
| ---------------- | ------------- | ------------- | -------------------- |
| Purpose          | SEO discovery | crawl control | PWA metadata         |
| Visible to users | No            | No            | Yes (install prompt) |
| File format      | XML           | Plain text    | JSON                 |
| Location         | root          | root          | root                 |
| SEO importance   | High          | Medium        | Low                  |

---

# HTML Integration

Inside the `<head>` section:

```html
<meta name="robots" content="index, follow">

<link rel="manifest" href="/site.webmanifest">

<meta name="theme-color" content="#ffbf00">

<link rel="sitemap" type="application/xml" href="/sitemap.xml">
```

For iOS support:

```html
<meta name="apple-mobile-web-app-capable" content="yes">

<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<meta name="apple-mobile-web-app-title" content="VisionOS">
```

---

# Implementation Best Practices

## Sitemap

Best practice:

Automatically generate it during build.

Example tools:

```
next-sitemap
astro-sitemap
gatsby-plugin-sitemap
```

Submit it to search engines via their webmaster tools.

---

## Robots.txt

Best practice:

Block only non-public content.

Examples:

```
/admin/
/tmp/
/internal/
/api/private/
```

Never block:

```
/css/
/js/
/images/
```

Otherwise search engines cannot render your pages properly.

---

## Web Manifest

Best practice:

Provide multiple icon sizes.

Ensure:

```
icons/
 ├── icon-192.png
 ├── icon-512.png
 └── maskable-icon.png
```

---

# Testing Your Setup

### Test Robots.txt

Visit:

```
https://example.com/robots.txt
```

Search engines also provide testing tools.

---

### Test Sitemap

Upload it to search engine webmaster dashboards.

Also validate using sitemap validators.

---

### Test Manifest

In Chrome:

```
Right Click → Inspect
Application Tab → Manifest
```

The panel will show:

* icons
* theme colors
* installability status

---

# Key Takeaways

* **Sitemap.xml** improves search engine discovery
* **Robots.txt** controls crawler behavior
* **site.webmanifest** enables installable web apps
* All three files belong to the **core infrastructure of modern web applications**

Together they ensure your site is:

* Searchable
* Crawlable
* Installable

