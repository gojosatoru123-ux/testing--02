---
title: Sitemap, Robots.txt, and Web Manifest
articleSlug: sitemap-robots-web-manifest
---

# Sitemap, Robots.txt, and Web Manifest

## Website Infrastructure
- Modern websites communicate with automated systems
- Infrastructure files help bots and browsers understand a site

### Systems interacting with websites
- Search engine crawlers
- Indexing bots
- AI scrapers
- Mobile operating systems
- Browsers acting as application containers

### Core infrastructure files
- sitemap.xml → search engine page discovery
- robots.txt → crawler behavior control
- site.webmanifest → Progressive Web App metadata

### File locations
- /sitemap.xml
- /robots.txt
- /site.webmanifest

---

## Sitemap.xml

### Purpose
- XML file listing important website URLs
- Helps search engines discover content efficiently
- Used by Google, Bing, DuckDuckGo

### Benefits
- Faster discovery of new pages
- Deep pages are indexed
- Efficient crawler resource usage

### Crawl Budget
- Search engines allocate crawl budgets
- Defines number of pages bots crawl per period
- Large websites risk missed pages
- Sitemap explicitly lists important URLs

### XML Structure

#### urlset
- Root container
- Defines sitemap protocol namespace

#### url
- Represents a single page entry
- Contains page metadata

#### loc
- Absolute page URL
- Example https://example.com/blog

#### lastmod
- Last modification timestamp
- Helps search engines prioritize updated content

#### changefreq
- Indicates update frequency
- always
- hourly
- daily
- weekly
- monthly
- yearly
- Only a hint for crawlers

#### priority
- Relative page importance
- Range 0.0 to 1.0
- Homepage often 1.0
- Blog posts often 0.8
- Archive pages often 0.4

### Advanced Sitemap Types
- Image sitemap for indexing images
- Video sitemap for discovering videos
- News sitemap for Google News
- Multilingual sitemap for hreflang localization

### Limits
- Maximum 50,000 URLs per sitemap
- Maximum file size 50MB

### Sitemap Index
- Used when site exceeds sitemap limits
- Allows multiple sitemap files

#### Structure
- sitemap_index.xml
- sitemap1.xml
- sitemap2.xml
- sitemap3.xml

---

## Robots.txt

### Purpose
- Controls how bots crawl a website
- Defines allowed and disallowed paths

### Access Behavior
- First file crawlers request
- Request path /robots.txt
- Must be located at domain root
- Missing file means all crawling allowed

### Robots Directives

#### User-agent
- Specifies crawler targeted by rule
- * applies to all bots
- Specific bots like Googlebot can be targeted

#### Disallow
- Blocks crawler access to path
- Example /admin/
- Prevents crawling of that directory

#### Allow
- Overrides disallow rules
- Allows specific files inside blocked directories

#### Crawl-delay
- Requests delay between crawler requests
- Example value 10 seconds
- Not respected by all crawlers

#### Sitemap
- Provides sitemap location to crawlers
- Helps bots find sitemaps quickly

### Example Blocked Paths
- /admin/
- /tmp/
- /search?q=
- /api/private/

### AI Crawler Blocking
- Specific AI crawlers can be blocked
- Example GPTBot

### Security Limitations
- Robots.txt is not a security system
- Only advisory for compliant crawlers
- Malicious bots can ignore it
- Use authentication or server access controls for protection

---

## Web Manifest

### Purpose
- Enables Progressive Web App functionality
- Allows website to behave like native mobile app

### Used By
- Browsers
- Mobile operating systems

### Capabilities Enabled
- Add to Home Screen
- Standalone app launch
- Native-like user experience

### File Location
- /site.webmanifest

### HTML Integration
- Linked using manifest link tag

### File Format
- JSON configuration file

### Core Fields

#### name
- Full application name

#### short_name
- Short label used under app icon

#### start_url
- Entry page when app launches

#### display
- Defines UI mode

#### icons
- List of application icons

#### theme_color
- Defines browser theme color

### Display Modes
- browser → normal tab
- standalone → native app appearance
- fullscreen → full screen interface
- minimal-ui → minimal navigation controls

### Recommended Mode
- standalone most commonly used for PWAs

### Icon Sizes
- 192x192 Android home screen icon
- 512x512 splash screen icon
- maskable icons adaptive shapes

### Maskable Icons
- Allow safe cropping
- Prevent logo clipping
- Required for Android adaptive icons

### PWA Requirements
- Web Manifest
- Service Worker
- HTTPS

### Service Worker Capabilities
- Offline support
- Resource caching
- Push notifications

---

## HTML Integration

### Head Metadata
- robots meta tag index follow
- manifest link reference
- theme color metadata
- sitemap link reference

### iOS Support
- apple-mobile-web-app-capable
- apple-mobile-web-app-status-bar-style
- apple-mobile-web-app-title

---

## Best Practices

### Sitemap
- Automatically generate during build
- Use sitemap generation tools
- Submit to search engine webmaster dashboards

### Robots.txt
- Block only non-public content
- Example admin tmp internal private API paths
- Never block CSS JS or images resources

### Web Manifest
- Provide multiple icon sizes
- Include maskable icons
- Maintain proper icons folder structure

---

## Testing

### Robots.txt Testing
- Access robots.txt directly in browser
- Use search engine robots testing tools

### Sitemap Testing
- Upload sitemap to webmaster dashboards
- Validate using sitemap validators

### Manifest Testing
- Open browser developer tools
- Inspect Application → Manifest
- Verify icons and installability

---

## Key Takeaways

### Sitemap
- Improves search engine discovery
- Lists important website URLs

### Robots.txt
- Controls crawler behavior
- Defines crawl permissions

### Web Manifest
- Enables installable web apps
- Provides Progressive Web App metadata

### Combined Role
- Websites become searchable
- Websites become crawlable
- Websites become installable