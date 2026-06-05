---
title:  Cross Origin Resource Sharing
articleSlug: cross-origin-resource-sharing
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: cors, browser-security, http

What is CORS and why does it exist?

<!-- ANSWER -->
CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls how web pages can access resources from different origins.

An origin consists of:

| Component | Example |
|---|---|
| Protocol | https |
| Domain | example.com |
| Port | 443 |

Example:

```text
https://app.example.com
```

is different from:

```text
https://api.example.com
```

Browsers enforce the:

```text
Same-Origin Policy (SOP)
```

which blocks JavaScript from accessing resources from another origin unless explicitly allowed.

CORS allows servers to define which origins may access resources.

Example response header:

```http
Access-Control-Allow-Origin: https://frontend.com
```

Without CORS:

* browsers block cross-origin API access
* frontend applications cannot safely call external APIs

CORS exists to:

* protect user data
* prevent unauthorized cross-site requests
* safely enable frontend-backend communication

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: cors, same-origin-policy, browser-security

What is the Same-Origin Policy (SOP)?

<!-- ANSWER -->
The Same-Origin Policy (SOP) is a browser security restriction that prevents JavaScript from accessing resources from a different origin.

Two URLs are considered same-origin only if all match:

| Component | Must Match |
|---|---|
| Protocol | Yes |
| Domain | Yes |
| Port | Yes |

Example comparison:

| URL A | URL B | Same Origin? |
|---|---|---|
| https://example.com | https://example.com | Yes |
| https://example.com | http://example.com | No |
| https://example.com | https://api.example.com | No |

Without SOP, malicious websites could:
- steal user data
- read authenticated responses
- access private sessions

Example blocked request:

```js
fetch('https://bank.com/account')
```

from:

```text
https://evil.com
```

Browsers enforce SOP by default.

CORS selectively relaxes SOP restrictions.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: cors, preflight-request, options-method

What is a CORS preflight request?

<!-- ANSWER -->
A preflight request is an automatic HTTP OPTIONS request sent by the browser before certain cross-origin requests.

Its purpose is to check whether the server allows the actual request.

Example preflight request:

```http
OPTIONS /api/data
Origin: https://frontend.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Authorization
```

Server response:

```http
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: Authorization
```

Browsers send preflight requests when:

* using methods like PUT, PATCH, DELETE
* sending custom headers
* using non-simple content types

Simple GET requests usually do not trigger preflight checks.

Preflight requests improve security by verifying permissions before sensitive requests are sent.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: cors, credentials, cookies

Why does Access-Control-Allow-Origin: * fail with credentials?

<!-- ANSWER -->
Browsers block credentialed cross-origin requests when:

```http
Access-Control-Allow-Origin: *
```

is used together with:

```http
Access-Control-Allow-Credentials: true
```

This is invalid because wildcard origins cannot be trusted with sensitive credentials.

Credentialed requests include:

* cookies
* authorization headers
* TLS client certificates

Incorrect configuration:

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```

Correct configuration:

```http
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Credentials: true
```

Why this restriction exists:

| Risk               | Explanation                              |
| ------------------ | ---------------------------------------- |
| Cookie leakage     | Any site could access authenticated data |
| Session abuse      | Sensitive responses exposed cross-origin |
| User impersonation | Credentials automatically attached       |

Browsers enforce this rule for security reasons.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: cors, response-headers, api-security

What are the most important CORS response headers?

<!-- ANSWER -->
CORS behavior is controlled using HTTP response headers.

Important headers:

| Header | Purpose |
|---|---|
| Access-Control-Allow-Origin | Allowed origins |
| Access-Control-Allow-Methods | Allowed HTTP methods |
| Access-Control-Allow-Headers | Allowed request headers |
| Access-Control-Allow-Credentials | Allow cookies/auth credentials |
| Access-Control-Expose-Headers | Headers accessible to JavaScript |
| Access-Control-Max-Age | Cache preflight results |

Example:

```http
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Authorization
Access-Control-Allow-Credentials: true
```

Explanation:

| Header            | Meaning                       |
| ----------------- | ----------------------------- |
| Allow-Origin      | Which frontend may access API |
| Allow-Methods     | Allowed request methods       |
| Allow-Headers     | Allowed custom headers        |
| Allow-Credentials | Allow cookies/auth            |

Without correct headers:

* browsers block frontend access
* JavaScript cannot read responses
* credentialed requests fail

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cors, security-misconfiguration, api-security

Why is reflecting arbitrary origins dangerous in CORS?

<!-- ANSWER -->
Some servers dynamically reflect the incoming Origin header:

```http
Origin: https://evil.com
```

Server response:

```http
Access-Control-Allow-Origin: https://evil.com
```

This is dangerous when combined with:

```http
Access-Control-Allow-Credentials: true
```

because attackers can:

* send authenticated requests
* read sensitive responses
* abuse user sessions

Example vulnerable logic:

```js
res.setHeader(
  'Access-Control-Allow-Origin',
  req.headers.origin
)
```

without validation.

Secure implementation:

| Practice                         | Purpose                    |
| -------------------------------- | -------------------------- |
| Whitelist origins                | Allow only trusted domains |
| Validate exact matches           | Prevent reflection abuse   |
| Avoid wildcards with credentials | Protect sessions           |

Correct example:

```js
const allowedOrigins = [
  'https://frontend.com'
]
```

Only trusted origins should receive CORS permissions.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cors, csrf, browser-security

What is the relationship between CORS and CSRF?

<!-- ANSWER -->
CORS and CSRF are different security mechanisms but are closely related.

Comparison:

| Feature | CORS | CSRF |
|---|---|---|
| Purpose | Control cross-origin resource access | Prevent forged authenticated requests |
| Enforced By | Browser | Server-side protections |
| Focus | Reading responses | Sending authenticated actions |
| Main Concern | Data exposure | Unauthorized actions |

Important distinction:

```text
CORS does NOT prevent requests.
```

It only prevents JavaScript from reading responses.

Even if CORS blocks response access:

* browsers may still send requests
* cookies may still be attached
* CSRF attacks may still succeed

Example:

```html
<form action="https://bank.com/transfer" method="POST">
</form>
```

This request can still execute even if CORS denies response access.

Therefore:

* CORS is NOT a CSRF defense
* CSRF tokens are still required
* SameSite cookies remain important

Modern applications should implement:

* proper CORS policies
* CSRF protections
* authentication validation

<!-- END -->