---
title:  What is HTTP
articleSlug: what-is-http
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: http, networking, web

What is HTTP?

<!-- ANSWER -->
HTTP (HyperText Transfer Protocol) is the communication protocol used between clients and servers on the web.

It defines how:
- requests are sent
- responses are returned
- resources are transferred

Example flow:

```text
Browser → HTTP Request → Server
Server → HTTP Response → Browser
```

Example request:

```http
GET /index.html HTTP/1.1
Host: example.com
```

Example response:

```http id="q8hmdr"
HTTP/1.1 200 OK
Content-Type: text/html
```

HTTP is:

* stateless
* request-response based
* application-layer protocol

Common uses:

* loading webpages
* API communication
* file downloads
* authentication systems

HTTP is the foundation of modern web communication.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: http, request-response, networking

What is the HTTP request-response cycle?

<!-- ANSWER -->
The HTTP request-response cycle describes how clients and servers communicate.

Flow:

1. client sends request
2. server processes request
3. server sends response

Architecture:

```text
Client → Request → Server
Client ← Response ← Server
```

Example request:

```http
GET /users HTTP/1.1
Host: api.example.com
```

Example response:

```http id="2g5fzb"
HTTP/1.1 200 OK
Content-Type: application/json
```

Components of an HTTP request:

| Component | Purpose         |
| --------- | --------------- |
| Method    | Action type     |
| URL       | Target resource |
| Headers   | Metadata        |
| Body      | Request data    |

Components of an HTTP response:

| Component   | Purpose        |
| ----------- | -------------- |
| Status Code | Request result |
| Headers     | Metadata       |
| Body        | Response data  |

Every web interaction follows this cycle.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: http-methods, rest, api

What are HTTP methods?

<!-- ANSWER -->
HTTP methods define the type of action a client wants to perform on a resource.

Common methods:

| Method | Purpose |
|---|---|
| GET | Retrieve data |
| POST | Create data |
| PUT | Replace data |
| PATCH | Update partial data |
| DELETE | Remove data |

Examples:

```http
GET /users
```

```http id="8n3ztw"
POST /users
```

```http id="6k2wfr"
DELETE /users/1
```

Method characteristics:

| Method | Safe | Idempotent |
| ------ | ---- | ---------- |
| GET    | Yes  | Yes        |
| POST   | No   | No         |
| PUT    | No   | Yes        |
| DELETE | No   | Yes        |

REST APIs heavily rely on proper HTTP method usage.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: status-codes, http, api

What are HTTP status codes?

<!-- ANSWER -->
HTTP status codes indicate the result of an HTTP request.

Categories:

| Range | Meaning |
|---|---|
| 1xx | Informational |
| 2xx | Success |
| 3xx | Redirection |
| 4xx | Client Errors |
| 5xx | Server Errors |

Common status codes:

| Status Code | Meaning |
|---|---|
| 200 OK | Request successful |
| 201 Created | Resource created |
| 301 Moved Permanently | Redirect |
| 400 Bad Request | Invalid request |
| 401 Unauthorized | Authentication required |
| 403 Forbidden | Access denied |
| 404 Not Found | Resource missing |
| 500 Internal Server Error | Server failure |

Example response:

```http
HTTP/1.1 404 Not Found
```

Status codes help clients understand:

* request success
* failures
* redirections
* authentication problems

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: headers, http, networking

What are HTTP headers?

<!-- ANSWER -->
HTTP headers provide metadata about requests and responses.

Example request headers:

```http
GET /api/users HTTP/1.1
Host: example.com
Authorization: Bearer token
Content-Type: application/json
```

Common request headers:

| Header        | Purpose                    |
| ------------- | -------------------------- |
| Authorization | Authentication             |
| Content-Type  | Body format                |
| User-Agent    | Client information         |
| Accept        | Supported response formats |

Common response headers:

| Header         | Purpose          |
| -------------- | ---------------- |
| Content-Type   | Response format  |
| Cache-Control  | Caching behavior |
| Set-Cookie     | Store cookies    |
| Content-Length | Body size        |

Example response:

```http id="k1f5ae"
Content-Type: application/json
```

Headers are essential for:

* authentication
* caching
* security
* content negotiation

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: stateless, http, backend

Why is HTTP called a stateless protocol?

<!-- ANSWER -->
HTTP is called stateless because the server does not automatically remember previous requests.

Each request is independent.

Example:

```text
Request 1 ≠ Request 2
```

The server processes every request separately.

Without additional mechanisms:

* login state is lost
* user identity is forgotten
* sessions do not persist

To maintain state, applications use:

| Mechanism | Purpose                   |
| --------- | ------------------------- |
| Cookies   | Store session identifiers |
| Sessions  | Maintain user state       |
| JWT       | Stateless authentication  |

Example cookie:

```http
Cookie: session=abc123
```

Benefits of statelessness:

* simpler scaling
* easier load balancing
* independent requests

Modern web systems add state management on top of HTTP.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: https, tls, security

What is the difference between HTTP and HTTPS?

<!-- ANSWER -->
HTTPS is the secure version of HTTP.

HTTPS uses:

```text id="8c5ywu"
TLS (Transport Layer Security)
```

to encrypt communication.

Comparison:

| HTTP                       | HTTPS                    |
| -------------------------- | ------------------------ |
| Unencrypted                | Encrypted                |
| Port 80                    | Port 443                 |
| Vulnerable to interception | Secure communication     |
| No certificate             | Uses SSL/TLS certificate |

Example:

```text
http://example.com
```

```text id="4m7bqe"
https://example.com
```

Benefits of HTTPS:

* encrypted traffic
* protection against MITM attacks
* secure authentication
* data integrity

Modern browsers mark HTTP websites as:

* insecure
* unsafe for sensitive data

HTTPS is mandatory for:

* PWAs
* secure cookies
* modern authentication systems

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: http2, performance, networking

What improvements does HTTP/2 provide over HTTP/1.1?

<!-- ANSWER -->
HTTP/2 improves performance and efficiency compared to HTTP/1.1.

Major improvements:

| Feature | HTTP/2 Benefit |
|---|---|
| Multiplexing | Multiple requests over one connection |
| Header Compression | Reduced bandwidth usage |
| Binary Protocol | Faster parsing |
| Server Push | Send resources proactively |

HTTP/1.1 problem:

```text id="z1v7ks"
Head-of-line blocking
```

Multiple requests often required multiple TCP connections.

HTTP/2 solution:

```text id="5r3xbt"
Single connection multiplexing
```

Example:

```text
HTTP/1.1:
Many TCP Connections

HTTP/2:
Single TCP Connection
```

Benefits:

* lower latency
* faster page loads
* fewer connections
* better mobile performance

Most modern websites use HTTP/2.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cookies, sessions, http

How do cookies work in HTTP?

<!-- ANSWER -->
Cookies are small pieces of data stored by the browser and automatically attached to future requests.

Server sends cookie:

```http
Set-Cookie: session=abc123
```

Browser stores it.

Future requests include:

```http id="v5k8qm"
Cookie: session=abc123
```

Common cookie uses:

* authentication
* session tracking
* personalization
* analytics

Important cookie attributes:

| Attribute | Purpose                   |
| --------- | ------------------------- |
| HttpOnly  | Prevent JavaScript access |
| Secure    | HTTPS only                |
| SameSite  | CSRF protection           |
| Expires   | Expiration time           |

Example:

```http id="n7w2lp"
Set-Cookie: session=abc123; HttpOnly; Secure
```

Cookies are essential for maintaining user sessions in stateless HTTP systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: caching, http, performance

How does HTTP caching improve performance?

<!-- ANSWER -->
HTTP caching stores responses temporarily to reduce repeated server requests.

Architecture:

```text
Client → Cache → Server
```

If cached data exists:

```text id="3m8vyt"
Cache Hit
```

Otherwise:

```text id="8k2wqd"
Cache Miss
```

Important caching headers:

| Header        | Purpose                     |
| ------------- | --------------------------- |
| Cache-Control | Defines caching rules       |
| ETag          | Resource version validation |
| Expires       | Expiration timestamp        |
| Last-Modified | Last update time            |

Example:

```http
Cache-Control: max-age=3600
```

This means:

```text id="1x7pva"
Cache response for 1 hour
```

Benefits:

* reduced server load
* faster responses
* lower bandwidth usage
* improved scalability

Caching is critical for high-performance web applications.

<!-- END -->