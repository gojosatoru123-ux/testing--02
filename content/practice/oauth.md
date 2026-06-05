---
title: OAuth
articleSlug: oauth
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Hard
tags: oauth, authorization, distributed-systems

Why was OAuth introduced instead of sharing user passwords with third-party applications?

<!-- ANSWER -->
Direct password sharing creates severe security risks.

Problems:
- credential exposure
- unlimited account access
- password reuse vulnerabilities

OAuth introduces delegated authorization.

Workflow:

```text
User → Authorization Server → Access Token → Third-Party App
```

Benefits:

| Benefit            | Explanation                     |
| ------------------ | ------------------------------- |
| Password isolation | Third-party never sees password |
| Scoped permissions | Limited access granted          |
| Revocable access   | Tokens can be invalidated       |

Example:

```text id="4m8qza"
Login with Google without sharing Google password
```

OAuth fundamentally separates:

* authentication
* authorization
* credential ownership

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: oauth-access-token, api-security, authorization

Why are OAuth access tokens preferred over long-lived credentials in API systems?

<!-- ANSWER -->
Long-lived credentials increase attack exposure.

OAuth access tokens are:
- temporary
- scoped
- revocable

Benefits:

| Benefit | Explanation |
|---|---|
| Reduced compromise window | Short expiration |
| Fine-grained permissions | Limited access scope |
| Better auditability | Token-level tracking |

Example:

```text id="6m2xqc"
Calendar app receives only calendar-read permission
```

Problem solved:

```text id="uoeaqr"
Compromised token causes less damage than compromised password
```

Access tokens improve security isolation in distributed APIs.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: oauth-scopes, authorization, api-design

Why are OAuth scopes important in secure API design?

<!-- ANSWER -->
OAuth scopes restrict token permissions.

Without scopes:

```text
Tokens may gain excessive privileges
```

Example scopes:

* read:profile
* write:payments
* read:contacts

Benefits:

| Benefit                      | Explanation                 |
| ---------------------------- | --------------------------- |
| Least privilege access       | Minimal permissions granted |
| Reduced attack impact        | Smaller compromise surface  |
| Better authorization control | Granular API access         |

Example:

```text id="6p1qxt"
Photo editing app cannot access payment APIs
```

Scopes are fundamental for secure delegated authorization.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: oauth-refresh-token, token-management, security

Why are refresh tokens separated from OAuth access tokens?

<!-- ANSWER -->
Access tokens should expire quickly for security reasons.

Problem:

```text
Frequent logins reduce user experience
```

Refresh tokens solve this by issuing new access tokens.

Workflow:

```text id="5m2xqc"
Expired Access Token → Refresh Token → New Access Token
```

Benefits:

| Benefit                     | Explanation                      |
| --------------------------- | -------------------------------- |
| Short-lived access tokens   | Better security                  |
| Long-lived sessions         | Better usability                 |
| Reduced credential exposure | Password entered less frequently |

Tradeoff:

| Tradeoff                             | Explanation                    |
| ------------------------------------ | ------------------------------ |
| Refresh token protection required    | High-value target              |
| Additional infrastructure complexity | Rotation and revocation needed |

Refresh tokens balance security and usability.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: oauth-authorization-code-flow, backend-security, authentication

Why is the Authorization Code Flow considered more secure than the Implicit Flow?

<!-- ANSWER -->
Implicit Flow exposes access tokens directly in browser URLs.

Problems:
- token leakage
- browser history exposure
- interception risk

Authorization Code Flow introduces backend token exchange.

Workflow:

```text id="clt6p5"
Client → Authorization Code → Backend → Access Token
```

Benefits:

| Benefit                         | Explanation             |
| ------------------------------- | ----------------------- |
| Tokens hidden from browser URLs | Reduced exposure        |
| Backend secret validation       | Stronger authentication |
| Better token protection         | Safer token exchange    |

Modern OAuth systems strongly prefer Authorization Code Flow with PKCE.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: pkce, oauth-security, mobile-apps

Why is PKCE important for OAuth flows in mobile and public clients?

<!-- ANSWER -->
Public clients cannot securely store client secrets.

Examples:
- mobile apps
- SPAs
- desktop applications

Problem:

```text
Authorization codes may be intercepted
```

PKCE introduces:

* code verifier
* code challenge

Workflow:

```text id="4q2xmc"
Authorization request tied cryptographically to original client
```

Benefits:

| Benefit                               | Explanation              |
| ------------------------------------- | ------------------------ |
| Prevents code interception attacks    | Safer public clients     |
| Stronger authorization flow           | Improved OAuth security  |
| Eliminates reliance on client secrets | Suitable for mobile apps |

PKCE is now a recommended OAuth security standard.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: oauth, microservices, distributed-authentication

Why is OAuth widely adopted in microservices and distributed architectures?

<!-- ANSWER -->
Microservices require:
- decentralized authorization
- scalable identity delegation
- service interoperability

OAuth enables token-based authorization across services.

Architecture:

```text id="4v8qpd"
User → Authorization Server → Access Token → APIs
```

Benefits:

| Benefit                         | Explanation            |
| ------------------------------- | ---------------------- |
| Stateless authorization         | Easier scaling         |
| Centralized identity management | Unified authentication |
| Fine-grained access control     | Scoped permissions     |

Examples:

* Google APIs
* GitHub APIs
* Microsoft identity systems

OAuth is foundational for secure distributed API ecosystems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: oauth-vs-jwt, authentication, authorization

Why is OAuth not the same thing as JWT authentication?

<!-- ANSWER -->
OAuth is an:

```text
Authorization framework
```

JWT is a:

```text
Token format
```

Relationship:

| Technology | Purpose                 |
| ---------- | ----------------------- |
| OAuth      | Delegated authorization |
| JWT        | Token representation    |

OAuth may use:

* JWT tokens
* opaque tokens
* other token formats

Example:

```text id="6m3qpd"
OAuth access token encoded as JWT
```

Misconception:

```text id="d03yyt"
OAuth does not require JWT specifically
```

OAuth and JWT solve different authentication and authorization concerns.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: oauth-revocation, distributed-systems, token-management

Why is OAuth token revocation difficult in distributed systems?

<!-- ANSWER -->
Distributed services often validate tokens locally.

Problem:

```text
Revoked tokens may remain temporarily usable
```

Challenges:

* decentralized validation
* caching
* stateless architectures

Solutions:

| Solution            | Purpose                        |
| ------------------- | ------------------------------ |
| Short-lived tokens  | Reduce exposure window         |
| Token introspection | Centralized validation         |
| Revocation lists    | Explicit invalidation tracking |

Tradeoff:

| Tradeoff               | Explanation         |
| ---------------------- | ------------------- |
| Centralized validation | Reduced scalability |
| Stateless validation   | Harder revocation   |

Token revocation fundamentally conflicts with pure stateless scalability.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: oauth, security, trade-offs

What are the major trade-offs when designing OAuth-based authentication systems?

<!-- ANSWER -->
OAuth improves delegated authorization but introduces architectural complexity.

Advantages:

| Advantage | Explanation |
|---|---|
| Secure delegated access | Password isolation |
| Fine-grained permissions | Scoped authorization |
| Scalable API authorization | Distributed access control |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Token management complexity | Expiration and refresh handling |
| Revocation challenges | Stateless validation difficulty |
| Additional infrastructure | Authorization servers required |
| Security configuration risk | Misconfigured scopes or flows |

Example:

```text id="7v2xpd"
Improperly scoped tokens may expose excessive permissions
```

OAuth systems fundamentally balance:

* security
* scalability
* usability
* operational complexity

<!-- END -->