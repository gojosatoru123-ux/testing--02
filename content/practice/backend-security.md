---
title:  Security
articleSlug: backend-security
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: backend-security, web-security, backend

What is backend security?

<!-- ANSWER -->
Backend security protects server-side systems, APIs, databases, and infrastructure from unauthorized access and attacks.

Protected assets include:
- user data
- authentication systems
- databases
- internal APIs

Example threats:
- SQL injection
- authentication bypass
- DDoS attacks
- credential theft

Goals of backend security:

| Goal | Purpose |
|---|---|
| Confidentiality | Protect sensitive data |
| Integrity | Prevent unauthorized modification |
| Availability | Keep services operational |

Backend security is critical for modern web applications and SaaS platforms.
<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: authentication, authorization, backend-security

What is the difference between authentication and authorization?

<!-- ANSWER -->
Authentication verifies identity.

Authorization determines permissions after identity is verified.

Comparison:

| Authentication | Authorization |
|---|---|
| "Who are you?" | "What can you access?" |
| Login verification | Permission checking |
| Happens first | Happens after authentication |

Example flow:

```text id="6m2xqc"
Login → Identity Verified → Access Checked
```

Example:

```text id="uoeaqr"
User logged in but cannot access admin panel
```

Both authentication and authorization are fundamental backend security concepts.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: hashing, passwords, backend-security

Why should passwords be hashed before storing them?

<!-- ANSWER -->
Hashing converts passwords into irreversible fixed-length values before storage.

Instead of storing:

```text
mypassword123
```

servers store:

```text id="6p1qxt"
hashed_password
```

Benefits:

| Benefit                  | Explanation                |
| ------------------------ | -------------------------- |
| Protect user credentials | Prevent plaintext exposure |
| Reduce breach impact     | Harder password recovery   |
| Improve compliance       | Security best practice     |

Common password hashing algorithms:

| Algorithm | Usage                 |
| --------- | --------------------- |
| bcrypt    | Widely used           |
| Argon2    | Modern secure hashing |
| scrypt    | Memory-hard hashing   |

Passwords should never be stored in plaintext.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: sql-injection, backend-security, database-security

What is SQL Injection?

<!-- ANSWER -->
SQL Injection occurs when attackers inject malicious SQL code into application queries.

Dangerous example:

```sql
SELECT * FROM users
WHERE email = '$input'
```

Malicious input:

```text id="5m2xqc"
' OR 1=1 --
```

Potential impact:

* data theft
* authentication bypass
* database deletion

Prevention techniques:

| Technique             | Purpose                |
| --------------------- | ---------------------- |
| Parameterized queries | Safe query handling    |
| ORM frameworks        | Query abstraction      |
| Input validation      | Reject malicious input |

Safe example:

```text id="8w4qza"
Prepared Statements
```

SQL Injection is one of the most dangerous backend vulnerabilities.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: https, tls, encryption

Why is HTTPS important for backend security?

<!-- ANSWER -->
HTTPS encrypts communication between clients and servers using TLS.

Without HTTPS:

```text id="clt6p5"
Traffic readable by attackers
```

With HTTPS:

```text id="2v7qwr"
Encrypted Client ↔ Server Communication
```

Benefits:

| Benefit         | Explanation               |
| --------------- | ------------------------- |
| Confidentiality | Prevent data interception |
| Integrity       | Detect tampering          |
| Authentication  | Verify server identity    |

Sensitive data protected:

* passwords
* tokens
* payment details

HTTPS is mandatory for secure modern web applications.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: rate-limiting, ddos-protection, backend-security

Why is rate limiting important in backend systems?

<!-- ANSWER -->
Rate limiting restricts how many requests clients can make within a time window.

Example:

```text id="4q2xmc"
100 requests per minute
```

Benefits:

| Benefit         | Explanation                 |
| --------------- | --------------------------- |
| Prevent abuse   | Reduce spam requests        |
| DDoS mitigation | Protect infrastructure      |
| Fair usage      | Prevent resource exhaustion |

Example response:

```http
429 Too Many Requests
```

Rate limiting is commonly implemented using:

* API gateways
* Redis counters
* reverse proxies

It is a critical backend security mechanism.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: csrf, backend-security, web-security

What is Cross-Site Request Forgery (CSRF)?

<!-- ANSWER -->
CSRF tricks authenticated users into unintentionally performing actions on trusted websites.

Attack example:

```text id="4v8qpd"
Victim logged into bank
↓
Malicious site sends transfer request
```

Because cookies are automatically included:

```text id="5w2qwc"
Server may treat request as legitimate
```

Prevention techniques:

| Technique         | Purpose                       |
| ----------------- | ----------------------------- |
| CSRF tokens       | Verify request origin         |
| SameSite cookies  | Restrict cross-site cookies   |
| Re-authentication | Sensitive action verification |

CSRF primarily affects cookie-based authentication systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: xss, web-security, backend-security

What is Cross-Site Scripting (XSS)?

<!-- ANSWER -->
XSS occurs when attackers inject malicious JavaScript into web applications viewed by other users.

Example dangerous input:

```html
<script>alert('hacked')</script>
```

Potential impact:

* session theft
* account takeover
* malicious redirects

Common XSS types:

| Type          | Description              |
| ------------- | ------------------------ |
| Stored XSS    | Saved in database        |
| Reflected XSS | Returned immediately     |
| DOM-based XSS | Client-side manipulation |

Prevention methods:

| Method                  | Purpose                  |
| ----------------------- | ------------------------ |
| Output escaping         | Prevent script execution |
| Content Security Policy | Restrict scripts         |
| Input sanitization      | Remove dangerous content |

XSS is one of the most common web security vulnerabilities.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: jwt, session-security, backend-authentication

What security risks exist with JWT authentication?

<!-- ANSWER -->
JWTs are self-contained authentication tokens widely used in backend systems.

Potential risks:

| Risk | Explanation |
|---|---|
| Token theft | Stolen tokens grant access |
| Long expiration | Extended attack window |
| Weak signing secrets | Token forgery |
| No revocation | Harder logout handling |

Example JWT header:

```text id="1q8vza"
Authorization: Bearer <jwt>
```

Security best practices:

* short expiration times
* HTTPS-only transmission
* strong signing secrets
* token rotation

JWT security depends heavily on proper implementation.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: defense-in-depth, backend-security, system-design

What is Defense in Depth in backend security?

<!-- ANSWER -->
Defense in Depth uses multiple security layers so that failure of one layer does not fully compromise the system.

Example layered security:

```text id="7v2xpd"
Firewall
↓
Authentication
↓
Authorization
↓
Input Validation
↓
Database Security
```

Benefits:

| Benefit                          | Explanation             |
| -------------------------------- | ----------------------- |
| Improved resilience              | Multiple protections    |
| Reduced single points of failure | Layered defenses        |
| Better breach containment        | Limit attacker movement |

Examples:

* HTTPS
* WAFs
* rate limiting
* MFA
* encryption

Modern backend security relies heavily on layered defensive strategies.

<!-- END -->