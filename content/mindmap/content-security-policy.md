---
title: Content Security Policy (CSP)
articleSlug: content-security-policy
---

# Content Security Policy (CSP)

## Overview
- Browser security mechanism
- Prevents script injection attacks
- Enforced by modern browsers
- Uses whitelist security model

## Threats Prevented
- Cross Site Scripting attacks
- Data injection attacks
- Malicious third party scripts
- Clickjacking attempts
- Unauthorized resource loading

## Core Concept
- Server defines allowed resources
- Browser enforces loading rules
- Unapproved resources automatically blocked
- Security through strict whitelisting

## Problem CSP Solves

### Modern Web Resource Loading
- Websites load many resources
- Scripts styles images fonts APIs
- Third party analytics scripts
- External advertisement scripts

### Injection Risk
- Attackers inject malicious scripts
- Browser executes injected JavaScript
- Cookies and data can leak

### CSP Protection
- Browser checks resource policy
- Only approved sources execute
- Malicious scripts blocked instantly

## Security Analogy
- Similar to airport security
- Only approved sources allowed
- Unknown sources denied access

## Resource Trust Model

### Allowed Sources
- Same domain resources
- Trusted CDN providers
- Approved external services

### Blocked Sources
- Unknown attacker domains
- Untrusted third party scripts
- Suspicious external resources

## How CSP Works

### Policy Delivery
- Sent through HTTP headers
- Delivered with server response

### Browser Enforcement
- Browser evaluates security policy
- Checks every resource request
- Allows or blocks resource

### Execution Flow
- Browser requests webpage
- Server returns CSP policy
- Browser validates resource sources
- Allowed resources loaded
- Violating resources blocked

## CSP Directives

### default-src
- Default fallback policy
- Applies to all resources
- Usually restricts to same origin

### script-src
- Controls JavaScript loading
- Defines allowed script domains
- Prevents malicious script execution

### style-src
- Controls stylesheet sources
- Limits external CSS loading

### img-src
- Controls image loading sources
- Allows trusted image providers

### font-src
- Controls font resource loading
- Restricts external font providers

### connect-src
- Controls API network requests
- Applies to fetch and WebSocket

### frame-src
- Controls iframe embedding
- Restricts external website frames

### object-src
- Controls plugin based content
- Usually disabled for security

## CSP Source Types

### Self Source
- Allows same origin resources
- Common default configuration

### Wildcard Source
- Allows resources from anywhere
- Weakens overall security

### Specific Domains
- Allow trusted CDN providers
- Allow specific service domains

### Data Sources
- Allows base64 encoded resources
- Mostly used for images

## Nonce Based Scripts
- Unique token per request
- Allows specific inline scripts
- Prevents arbitrary inline scripts

## Hash Based Scripts
- Script content hash validation
- Only matching scripts allowed
- Useful for static inline code

## Inline Script Risks
- Inline scripts run automatically
- Attackers exploit injection points
- Strict CSP blocks inline execution

## CSP and XSS Defense
- Blocks external malicious scripts
- Reduces impact of XSS attacks
- Prevents unauthorized script loading

## CSP Violation Handling

### Violation Blocking
- Browser blocks violating resources
- Console error generated

### Violation Reporting
- Browser sends violation reports
- Helps detect attack attempts
- Useful for security monitoring

## Report Only Mode
- Violations reported only
- Resources not blocked
- Used for testing policies

## Production CSP Deployment

### Step One
- Enable report only policy

### Step Two
- Monitor violation reports

### Step Three
- Whitelist required domains

### Step Four
- Enable strict enforcement

## Implementation Example
- CSP headers in server responses
- Middleware libraries simplify setup
- Common in modern web frameworks

## CSP Compared With Others

### CSP
- Prevents malicious script execution

### CORS
- Controls cross origin data access

### CSRF Protection
- Prevents forged user requests

## Common Configuration Mistakes

### Unsafe Inline Scripts
- Allows dangerous inline execution
- Weakens XSS protection

### Wildcard Source Usage
- Allows scripts from anywhere
- Removes security restrictions

### Too Many Trusted Domains
- Expands possible attack surface
- Harder to maintain policies

## Security Best Practices
- Default source same origin
- Disable plugin based content
- Restrict embedding via frames
- Prefer nonce based scripts
- Avoid unsafe inline policies

## Browser Support
- Supported by modern browsers
- Chrome Firefox Safari Edge
- Standard web security feature

## Key Takeaways
- Strong defense against XSS
- Enforces strict resource policies
- Browser enforced security layer
- Important for modern web apps