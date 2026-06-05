---
title:  JWT
articleSlug: jwt
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Hard
tags: jwt, authentication, distributed-systems

Why are JWTs commonly used in distributed authentication systems?

<!-- ANSWER -->
Distributed systems often contain:
- multiple services
- stateless APIs
- horizontally scaled servers

Traditional session storage creates:
- centralized state dependency
- scaling challenges

JWTs are self-contained authentication tokens.

Architecture:

```text
Client → JWT → Multiple Stateless Services
```

Benefits:

| Benefit                  | Explanation                    |
| ------------------------ | ------------------------------ |
| Stateless authentication | No centralized session storage |
| Horizontal scalability   | Any server can validate token  |
| Reduced database lookups | Claims embedded inside token   |

JWTs are highly suitable for microservices and distributed architectures.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: jwt-structure, authentication, security

Why is the JWT payload not considered secure for storing sensitive information?

<!-- ANSWER -->
JWT payloads are:

```text
Base64 encoded, not encrypted
```

Anyone possessing the token can decode payload contents.

Structure:

```text id="6m2xqc"
Header.Payload.Signature
```

Problem:

```text id="uoeaqr"
Sensitive information becomes visible to clients
```

Unsafe examples:

* passwords
* credit card details
* private secrets

Safe examples:

* user ID
* roles
* expiration timestamps

JWT signatures guarantee integrity, not confidentiality.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: stateless-authentication, scaling, microservices

Why does stateless JWT authentication improve horizontal scalability?

<!-- ANSWER -->
Traditional sessions require:
- centralized session stores
- sticky sessions
- shared state synchronization

JWT authentication stores state inside token itself.

Workflow:

```text id="6p1qxt"
Client sends JWT with every request
```

Benefits:

| Benefit                   | Explanation                    |
| ------------------------- | ------------------------------ |
| No shared session store   | Easier scaling                 |
| Stateless backend servers | Any node handles request       |
| Better fault tolerance    | Reduced centralized dependency |

Example:

```text id="n7z9qa"
Load balancer freely routes requests across servers
```

JWTs eliminate many scalability bottlenecks of server-side sessions.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: jwt-expiration, security, token-management

Why are short-lived JWT access tokens considered a security best practice?

<!-- ANSWER -->
JWTs are bearer tokens.

Meaning:

```text
Anyone possessing token may use it
```

Problem:

```text
Stolen long-lived tokens remain usable for extended periods
```

Short expiration reduces attack window.

Benefits:

| Benefit                       | Explanation             |
| ----------------------------- | ----------------------- |
| Reduced token abuse duration  | Faster expiration       |
| Better compromise containment | Lower security exposure |
| Improved session control      | Frequent revalidation   |

Example:

```text id="5m2xqc"
Access token valid for only 15 minutes
```

Short-lived access tokens combined with refresh tokens improve authentication security.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: refresh-token, authentication, jwt-security

Why are refresh tokens separated from access tokens in JWT-based systems?

<!-- ANSWER -->
Access tokens should:
- expire quickly
- minimize security exposure

Refresh tokens allow obtaining new access tokens without re-login.

Workflow:

```text id="clt6p5"
Expired Access Token → Refresh Token → New Access Token
```

Benefits:

| Benefit                  | Explanation               |
| ------------------------ | ------------------------- |
| Better security          | Short-lived access tokens |
| Improved user experience | Reduced frequent logins   |
| Session continuity       | Long-term authentication  |

Tradeoff:

| Tradeoff                          | Explanation            |
| --------------------------------- | ---------------------- |
| Additional complexity             | Token rotation logic   |
| Refresh token protection required | High-value credentials |

Refresh token architecture balances usability and security.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: jwt-revocation, distributed-systems, authentication

Why is JWT revocation difficult in distributed systems?

<!-- ANSWER -->
JWTs are stateless.

Once issued:

```text
Servers validate token locally without centralized lookup
```

Problem:

```text id="4q2xmc"
Revoked tokens may remain valid until expiration
```

Examples:

* compromised accounts
* forced logout
* permission changes

Solutions:

| Solution               | Purpose                      |
| ---------------------- | ---------------------------- |
| Short expiration times | Limit abuse window           |
| Blacklist storage      | Explicit revocation tracking |
| Token versioning       | Invalidate old tokens        |

Tradeoff:

```text id="uq86fi"
Revocation introduces centralized state again
```

JWT revocation fundamentally conflicts with pure statelessness.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: jwt-signature, cryptography, security

Why are JWT signatures critical for authentication integrity?

<!-- ANSWER -->
JWT signatures verify:

```text
Token contents were not modified
```

Workflow:

| Step                       | Purpose                |
| -------------------------- | ---------------------- |
| Token signed by server     | Create integrity proof |
| Client sends token         | Stateless verification |
| Server validates signature | Detect tampering       |

Problem without signature:

```text id="4v8qpd"
Attacker could modify user roles manually
```

Example:

```text id="81cds1"
Change role=user to role=admin
```

Signatures protect JWT integrity but not confidentiality.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: jwt-vs-session, authentication, scalability

Why are JWTs often preferred over traditional server-side sessions in microservices?

<!-- ANSWER -->
Traditional sessions require:
- centralized session stores
- sticky routing
- shared state synchronization

Problems in microservices:
- scaling complexity
- cross-service session sharing
- distributed coordination

JWT benefits:

| Benefit | Explanation |
|---|---|
| Stateless verification | Independent service validation |
| Easier scaling | No session replication |
| Better service autonomy | Decentralized authentication |

Architecture:

```text id="6m3qpd"
Client → JWT → Multiple Independent Services
```

Tradeoff:

| Tradeoff            | Explanation                  |
| ------------------- | ---------------------------- |
| Harder revocation   | Stateless nature             |
| Larger request size | Token transmitted repeatedly |

JWTs fit naturally into distributed service architectures.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: jwt-security, xss, csrf

Why does storing JWTs in browsers introduce XSS and CSRF trade-offs?

<!-- ANSWER -->
JWT storage options affect security posture.

Storage comparison:

| Storage | Main Risk |
|---|---|
| LocalStorage | XSS token theft |
| Cookies | CSRF attacks |

Problem:

```text
No browser storage mechanism is completely risk-free
```

Mitigations:

| Threat | Mitigation             |
| ------ | ---------------------- |
| XSS    | HttpOnly cookies       |
| CSRF   | SameSite + CSRF tokens |

Example:

```text id="1q8vza"
Malicious script stealing JWT from LocalStorage
```

JWT browser storage requires balancing multiple web security concerns.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: jwt, authentication, trade-offs

What are the major trade-offs when using JWT-based authentication systems?

<!-- ANSWER -->
JWTs improve scalability but introduce operational challenges.

Advantages:

| Advantage | Explanation |
|---|---|
| Stateless authentication | Easier horizontal scaling |
| Reduced database dependency | Local token validation |
| Better microservice compatibility | Distributed verification |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Difficult revocation | Stateless nature |
| Token leakage risk | Bearer token exposure |
| Larger request payloads | Token transmitted repeatedly |
| Security complexity | Expiration and refresh handling |

Example:

```text id="7v2xpd"
Compromised JWT remains valid until expiration
```

JWT systems fundamentally balance:

* scalability
* usability
* security
* operational complexity

<!-- END -->