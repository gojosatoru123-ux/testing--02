---
title: Cross-Origin Resource Sharing (CORS)
articleSlug: cross-origin-resource-sharing
---

# Cross-Origin Resource Sharing (CORS)

## Overview
- HTTP-header-based mechanism for controlled cross-origin requests
- Allows servers to explicitly permit requests from other origins
- Relaxes browser Same-Origin Policy (SOP) safely
- Used in modern distributed web architectures

### Communicating Systems
- Search engine crawlers
- Indexing bots
- Frontend applications
- Backend APIs
- CDNs and authentication services

---

## Security Problem

### Scenario
- User logged into facebook.com
- Browser stores session cookies
- Malicious site evil-site.com executes JavaScript

### Malicious Request Example
- fetch request to facebook.com API
- Browser automatically includes cookies
- Facebook believes user made the request
- Sensitive data could be leaked

### Potential Attacks
- Reading private API responses
- Triggering actions like password resets
- Accessing user account data

### Result
- Massive security breach
- Cross-site data exposure

---

## Same-Origin Policy (SOP)

### Purpose
- Browser security mechanism
- Prevents websites from accessing resources from different origins
- Protects sensitive information from malicious sites

### Default Rule
- Web pages can only access resources from the same origin

---

## Origin Definition

### Formula
- Origin = Scheme + Host + Port

### Example
- https://zerobitz.com:443

### Components
#### Scheme
- https

#### Host
- zerobitz.com

#### Port
- 443

---

## Same Origin Examples
- https://zerobitz.com/a
- https://zerobitz.com/b
- Same scheme
- Same host
- Same port

---

## Different Origin Examples
- https://zerobitz.com
- https://api.zerobitz.com

### Reason
- Subdomains are considered different hosts
- Different host equals different origin

---

## CORS Enforcement

### Browser Only
- Enforced by browsers
- Servers do not enforce CORS

### Tools Ignoring CORS
- curl
- Postman
- Backend servers
- Mobile applications
- CLI scripts

### Example
- curl https://facebook.com/api/posts
- Works because curl ignores browser security rules

### Browser Role
- Browser acts as security guard
- Blocks unauthorized cross-origin responses

---

## Why CORS Exists

### Modern Web Architecture
#### Frontend
- https://app.company.com

#### Backend API
- https://api.company.com

#### Authentication
- https://auth.company.com

#### CDN
- https://cdn.company.com

### Problem Without CORS
- app.company.com cannot access api.company.com
- Browser blocks request due to SOP

### Solution
- Server explicitly trusts allowed origins
- Cross-origin communication becomes possible

---

## CORS Mechanism

### Communication Method
- Uses HTTP headers
- Browser and server exchange permission metadata

### Request Types
#### Simple Request
- No preflight required

#### Preflight Request
- Browser checks permissions before sending request

---

## Simple Requests

### Allowed HTTP Methods
- GET
- POST
- HEAD

### Allowed Headers
- Accept
- Accept-Language
- Content-Language
- Content-Type (limited)

### Example
- fetch("https://api.zerobitz.com/data")

### Server Requirement
- Must include Access-Control-Allow-Origin header

### Example Header
- Access-Control-Allow-Origin: https://zerobitz.com

### Missing Header Result
- Browser blocks response

---

## Non-Simple Requests

### Examples
- PUT
- DELETE
- PATCH
- Custom headers
- Authorization headers

### Example Request
- PUT request with Authorization header

### Browser Behavior
- Sends preflight OPTIONS request first

---

## Preflight Request

### Purpose
- Ask server if request is allowed

### Example Request
- OPTIONS /user
- Origin header
- Access-Control-Request-Method
- Access-Control-Request-Headers

### Server Response
- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers

### Flow
- Browser sends OPTIONS request
- Server returns permissions
- Browser sends actual request if allowed

---

## Important CORS Headers

### Access-Control-Allow-Origin
- Defines allowed origins
- Example specific origin
- https://zerobitz.com

### Wildcard Origin
- *
- Allows any origin
- Should be used carefully

---

### Access-Control-Allow-Methods
- Specifies allowed HTTP methods
- Example
- GET
- POST
- PUT
- DELETE

---

### Access-Control-Allow-Headers
- Specifies allowed request headers
- Example
- Content-Type
- Authorization

---

### Access-Control-Allow-Credentials
- Allows credentials in cross-origin requests
- Cookies
- Authorization headers
- TLS client certificates

### Example
- Access-Control-Allow-Credentials: true

---

### Credential Rule
- Cannot use wildcard origin with credentials
- Must specify exact origin

### Example
- Access-Control-Allow-Origin: https://zerobitz.com

---

### Access-Control-Max-Age
- Caches preflight responses

### Example
- 3600 seconds

### Benefit
- Reduces repeated preflight requests
- Improves performance

---

## Example Server Implementation

### Environment
- Node.js
- Express framework

### Middleware Configuration
- Set Access-Control-Allow-Origin
- Set Access-Control-Allow-Methods
- Set Access-Control-Allow-Headers
- Set Access-Control-Allow-Credentials

### Example Endpoint
- GET /data
- Returns JSON response

---

## Real World Architecture

### Browser
- zerobitz.com

### API Server
- api.zerobitz.com

### Database
- Stores application data

### Authentication Service
- Handles user authentication

### Request Flow
- Browser sends Origin header
- Server validates origin
- Server responds with CORS headers

---

## Common Use Cases

### Third-Party APIs
- Weather APIs
- Map services
- Payment gateways

### CDN Resources
- Fonts
- Images
- Static assets

### Frontend and Backend Separation
- app.company.com
- api.company.com

---

## Security Considerations

### Risk
- Misconfigured CORS can expose sensitive data

---

### Dangerous Configuration
- Access-Control-Allow-Origin: *
- Access-Control-Allow-Credentials: true

### Risk Explanation
- Any website can send authenticated requests

---

### Secure Origin Validation

#### Allowed Origins List
- https://zerobitz.com
- https://admin.zerobitz.com

#### Validation Logic
- Compare request origin
- Allow only trusted origins

---

## CSRF Protection

### CORS Limitation
- Does not fully prevent CSRF

### Additional Protections
- CSRF tokens
- SameSite cookies
- Authorization headers
- Anti-forgery tokens

---

## Common Developer Mistakes

### Mistake 1
- Thinking CORS is a server-only problem

### Reality
- CORS enforced by browsers

---

### Mistake 2
- Trying to disable CORS

### Reality
- Cannot disable browser security
- Must configure server headers

---

### Mistake 3
- Allowing wildcard origins in production

### Example
- Access-Control-Allow-Origin: *

### Risk
- Security vulnerabilities

---

## Key Takeaways
- CORS is a browser security mechanism
- Relaxes Same-Origin Policy safely
- Servers must explicitly allow origins
- Preflight requests validate permissions
- Credentials require explicit origin
- Misconfiguration can cause severe vulnerabilities
- Essential for modern distributed web applications