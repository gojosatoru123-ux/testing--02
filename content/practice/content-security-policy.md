---
title:  Content Security Policy
articleSlug: content-security-policy
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: csp, web-security, xss

What is Content Security Policy (CSP) and why is it important?

<!-- ANSWER -->
Content Security Policy (CSP) is a browser security mechanism that helps prevent attacks such as:

- Cross-Site Scripting (XSS)
- data injection attacks
- malicious third-party script execution

CSP works by defining which resources the browser is allowed to load.

Example CSP header:

```http
Content-Security-Policy: default-src 'self';
```

This means:

```text id="2vbm4f"
Only resources from the same origin are allowed.
```

CSP can restrict:

* JavaScript sources
* stylesheets
* images
* fonts
* iframes
* API connections

Without CSP:

* injected scripts may execute freely
* attackers can steal session data
* malicious external scripts can run

CSP adds an additional browser-enforced security layer against client-side attacks.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: csp, xss, browser-security

How does CSP help prevent Cross-Site Scripting (XSS)?

<!-- ANSWER -->
CSP helps prevent XSS by restricting which scripts the browser is allowed to execute.

Example policy:

```http
Content-Security-Policy: script-src 'self';
```

This allows JavaScript only from:

```text id="v1ak9p"
the same origin
```

Blocked example:

```html
<script src="https://evil.com/malware.js"></script>
```

Inline scripts may also be blocked:

```html
<script>
alert('XSS')
</script>
```

unless explicitly allowed.

How CSP prevents XSS:

| Protection              | Effect                            |
| ----------------------- | --------------------------------- |
| Restrict script sources | Blocks malicious external scripts |
| Block inline scripts    | Prevents injected JavaScript      |
| Restrict eval()         | Prevents dynamic code execution   |

Even if user input is injected into the page, CSP may stop the browser from executing the malicious payload.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: csp, directives, http-headers

What are the most important CSP directives?

<!-- ANSWER -->
CSP policies are configured using directives.

Common directives:

| Directive | Purpose |
|---|---|
| default-src | Fallback policy for all resources |
| script-src | Allowed JavaScript sources |
| style-src | Allowed stylesheet sources |
| img-src | Allowed image sources |
| connect-src | Allowed API/fetch destinations |
| frame-src | Allowed iframe sources |
| font-src | Allowed font sources |

Example:

```http
Content-Security-Policy:
default-src 'self';
script-src 'self' https://cdn.example.com;
img-src 'self' data:;
```

Explanation:

| Directive          | Meaning                            |
| ------------------ | ---------------------------------- |
| default-src 'self' | Only same-origin resources allowed |
| script-src         | Allow scripts from trusted CDN     |
| img-src data:      | Allow base64 images                |

CSP directives allow fine-grained browser security control over resource loading.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: csp, nonce, inline-scripts

What is a CSP nonce and why is it used?

<!-- ANSWER -->
A CSP nonce is a random one-time value used to allow trusted inline scripts.

Example policy:

```http
Content-Security-Policy: script-src 'self' 'nonce-a1b2c3';
```

HTML:

```html
<script nonce="a1b2c3">
  console.log('trusted script')
</script>
```

The browser executes the script only if:

* the nonce matches
* the policy allows it

Why nonces are useful:

| Benefit                   | Explanation                            |
| ------------------------- | -------------------------------------- |
| Allow safe inline scripts | Without enabling all inline JavaScript |
| Prevent injected scripts  | Attackers cannot guess nonce values    |
| Strong XSS defense        | Browser validates trusted scripts      |

Important requirement:

```text id="8qey7f"
Nonce values must be random and unique per request.
```

Reusing predictable nonces weakens security.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: csp, unsafe-inline, security-misconfiguration

Why is 'unsafe-inline' dangerous in CSP?

<!-- ANSWER -->
The following CSP directive is dangerous:

```http
script-src 'unsafe-inline';
```

It allows inline JavaScript execution:

```html
<script>
alert('XSS')
</script>
```

This weakens CSP protection because many XSS attacks rely on injected inline scripts.

Risks of `unsafe-inline`:

| Risk                      | Explanation                |
| ------------------------- | -------------------------- |
| XSS execution             | Injected scripts may run   |
| Event handler abuse       | onclick= payloads work     |
| Reduced CSP effectiveness | Browser allows unsafe code |

Example dangerous payload:

```html
<img src=x onerror="alert(document.cookie)">
```

Without `unsafe-inline`:

* browsers block inline execution
* many XSS payloads fail

Best practice:

* avoid `unsafe-inline`
* use nonces or hashes instead
* keep CSP policies restrictive

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: csp, report-uri, monitoring

What is CSP reporting and why is it useful?

<!-- ANSWER -->
CSP supports reporting mechanisms that notify servers when policy violations occur.

Example policy:

```http
Content-Security-Policy:
default-src 'self';
report-uri /csp-report;
```

If the browser blocks a resource, it sends a violation report:

```json
{
  "violated-directive": "script-src",
  "blocked-uri": "https://evil.com/malware.js"
}
```

Benefits of CSP reporting:

| Benefit            | Purpose                  |
| ------------------ | ------------------------ |
| Detect attacks     | Identify XSS attempts    |
| Monitor violations | Find unsafe resources    |
| Debug CSP policies | Improve configurations   |
| Improve visibility | Track malicious behavior |

Modern CSP often uses:

```http id="j2r7wp"
report-to
```

instead of:

```http id="2g5syr"
report-uri
```

because it integrates with newer browser reporting APIs.

CSP reporting helps security teams detect and analyze client-side attack attempts.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: csp, strict-dynamic, advanced-security

What is 'strict-dynamic' in CSP and how does it work?

<!-- ANSWER -->
`strict-dynamic` is an advanced CSP keyword that allows trusted scripts to load additional scripts dynamically.

Example policy:

```http
Content-Security-Policy:
script-src 'nonce-a1b2c3' 'strict-dynamic';
```

Behavior:

1. browser trusts scripts with valid nonce
2. trusted scripts may dynamically load other scripts
3. dynamically loaded scripts are also trusted

Example:

```html
<script nonce="a1b2c3">
  const s = document.createElement('script');
  s.src = 'https://cdn.example.com/app.js';
  document.body.appendChild(s);
</script>
```

Advantages:

| Benefit             | Explanation                       |
| ------------------- | --------------------------------- |
| Better scalability  | No need to whitelist every script |
| Stronger security   | Trust based on nonce              |
| Reduced maintenance | Fewer static allowlists           |

Without `strict-dynamic`:

* dynamically loaded scripts may be blocked
* large applications become harder to manage

`strict-dynamic` is commonly used in modern high-security CSP deployments.

<!-- END -->