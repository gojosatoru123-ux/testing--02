---
title: JWT Authentication
description: A comprehensive guide to JSON Web Token (JWT) authentication — how stateless authentication works, JWT structure, signing algorithms, token lifecycle, security considerations, refresh tokens, and real-world architecture patterns used in distributed systems.
category: High Level Design
order: 21
---

# JWT Authentication

## Introduction: The Hotel Key Card Analogy

Imagine checking into a hotel.

At the reception desk:

1. You verify your identity.
2. The receptionist gives you a **key card**.
3. That key card allows you to:
   - Enter your room
   - Access elevators
   - Use certain hotel services

Important observations:

- The hotel staff **doesn't verify your identity every time**.
- The **key card itself proves your authorization**.
- The hotel trusts the **encoded information inside the card**.

This is exactly how **JWT authentication works**.

Instead of repeatedly verifying credentials with the server, the system issues a **token that proves the user's identity**.

---

# What is JWT?

**JWT (JSON Web Token)** is a compact, URL-safe token used for securely transmitting information between parties.

JWTs are commonly used for:

| Use Case | Description |
|---|---|
| Authentication | Verifying user identity |
| Authorization | Granting access to resources |
| API security | Securing microservice communication |
| Stateless sessions | Replacing server-side sessions |

JWTs are **stateless**, meaning the server does not need to store session data.

All required information is inside the token.

---

# Stateless vs Stateful Authentication

Before JWTs, systems used **session-based authentication**.

## Session-Based Authentication

```mermaid
sequenceDiagram

participant Client
participant Server
participant SessionStore

Client->>Server: Login (username/password)
Server->>SessionStore: Create session
SessionStore-->>Server: session_id
Server-->>Client: session_id cookie

Client->>Server: Request with session_id
Server->>SessionStore: Validate session
````

Problems:

| Problem            | Explanation                            |
| ------------------ | -------------------------------------- |
| Session storage    | Requires database or cache             |
| Scaling difficulty | Sessions must be shared across servers |
| Extra lookups      | Every request hits session store       |

---

## JWT Authentication (Stateless)

```mermaid
sequenceDiagram

participant Client
participant AuthServer
participant API

Client->>AuthServer: Login
AuthServer-->>Client: JWT Token

Client->>API: Request + JWT
API->>API: Validate JWT locally
API-->>Client: Response
```

Benefits:

| Benefit   | Explanation                       |
| --------- | --------------------------------- |
| Stateless | No session storage                |
| Fast      | No DB lookup                      |
| Scalable  | Works well with microservices     |
| Portable  | Token can travel between services |

---

# JWT Structure

A JWT has **three parts** separated by dots:

```text
HEADER.PAYLOAD.SIGNATURE
```

Example JWT:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJ1c2VySWQiOjEyMywicm9sZSI6ImFkbWluIn0
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

---

# JWT Components

## 1 Header

Contains metadata about the token.

Example:

```json
{
 "alg": "HS256",
 "typ": "JWT"
}
```

Fields:

| Field | Meaning           |
| ----- | ----------------- |
| alg   | Signing algorithm |
| typ   | Token type        |

Common algorithms:

| Algorithm | Type           |
| --------- | -------------- |
| HS256     | HMAC SHA256    |
| RS256     | RSA signature  |
| ES256     | Elliptic curve |

---

## 2 Payload

Contains **claims (data)** about the user.

Example:

```json
{
 "userId": 123,
 "role": "admin",
 "exp": 1716239022
}
```

Claims fall into three categories.

### Registered Claims

Standard fields defined by JWT specification.

| Claim | Meaning         |
| ----- | --------------- |
| iss   | Issuer          |
| sub   | Subject         |
| aud   | Audience        |
| exp   | Expiration time |
| iat   | Issued at       |
| nbf   | Not before      |

---

### Public Claims

Custom claims defined by developers.

Example:

```json
{
 "userId": "abc123",
 "plan": "premium"
}
```

---

### Private Claims

Used internally between services.

Example:

```json
{
 "permissions": ["read", "write"]
}
```

---

## 3 Signature

The signature ensures the token **has not been tampered with**.

Signature generation:

```text
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

Example:

```mermaid
flowchart LR

Header --> Encode1
Payload --> Encode2

Encode1 --> Combine
Encode2 --> Combine

Combine --> Sign

SecretKey --> Sign

Sign --> JWT
```

If the payload changes, the signature becomes invalid.

---

# JWT Authentication Flow

Complete login flow:

```mermaid
sequenceDiagram

participant User
participant Client
participant AuthServer
participant API

User->>Client: Enter credentials
Client->>AuthServer: Login request

AuthServer->>AuthServer: Validate user
AuthServer-->>Client: JWT token

Client->>API: Request + Authorization header
API->>API: Verify JWT signature
API-->>Client: Response
```

---

# Authorization Header

JWTs are typically sent using the **Authorization header**.

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

# Example JWT Authentication (JavaScript)

## Generating JWT

```javascript
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: 123, role: "admin" },
  "secret_key",
  { expiresIn: "1h" }
);

console.log(token);
```

---

## Verifying JWT

```javascript
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {

 const authHeader = req.headers.authorization;

 if (!authHeader) {
   return res.status(401).send("No token");
 }

 const token = authHeader.split(" ")[1];

 try {
   const decoded = jwt.verify(token, "secret_key");
   req.user = decoded;
   next();
 } catch (err) {
   res.status(401).send("Invalid token");
 }

}
```

---

# Access Token vs Refresh Token

JWT authentication often uses **two tokens**.

| Token         | Purpose                          |
| ------------- | -------------------------------- |
| Access Token  | Used for API calls               |
| Refresh Token | Used to obtain new access tokens |

---

## Token Lifecycle

```mermaid
sequenceDiagram

participant Client
participant AuthServer
participant API

Client->>AuthServer: Login
AuthServer-->>Client: Access Token + Refresh Token

Client->>API: Request with Access Token

Note over Client: Access token expires

Client->>AuthServer: Refresh token
AuthServer-->>Client: New Access Token
```

---

# Why Refresh Tokens Exist

Access tokens should be **short-lived**.

Example:

| Token         | Expiration |
| ------------- | ---------- |
| Access Token  | 15 minutes |
| Refresh Token | 7 days     |

Benefits:

| Benefit   | Explanation                   |
| --------- | ----------------------------- |
| Security  | Limits stolen token damage    |
| Usability | Users don't log in repeatedly |

---

# Token Storage Options

Where should JWTs be stored?

---

## Local Storage

```javascript
localStorage.setItem("token", jwt);
```

Advantages:

* Easy to use

Disadvantages:

* Vulnerable to **XSS attacks**

---

## HTTP-only Cookies

Safer option.

```http
Set-Cookie: token=jwt; HttpOnly
```

Advantages:

| Benefit                   | Explanation              |
| ------------------------- | ------------------------ |
| Protected from JavaScript | Prevents XSS access      |
| Automatic sending         | Browser attaches cookies |

---

# JWT in Microservices

JWT works well in distributed systems.

Instead of each service querying a database, services verify tokens independently.

```mermaid
flowchart LR

Client --> APIGateway

APIGateway --> UserService
APIGateway --> OrderService
APIGateway --> PaymentService
```

Each service:

* Verifies JWT signature
* Extracts user identity
* Applies authorization rules

No central session store required.

---

# JWT Security Considerations

JWT misuse can lead to serious security vulnerabilities.

---

## 1 Never Store Sensitive Data

JWT payload is **not encrypted**.

Anyone can decode it.

Bad example:

```json
{
 "password": "123456"
}
```

---

## 2 Use Short Expiration

Example:

```text
Access token = 15 minutes
```

---

## 3 Use HTTPS

Tokens must always travel via **HTTPS**.

Otherwise they can be intercepted.

---

## 4 Rotate Secrets

Secret keys must be rotated periodically.

---

## 5 Blacklist Compromised Tokens

For logout functionality:

* Maintain **token blacklist**
* Or reduce expiration time

---

# JWT vs Session Authentication

| Feature     | JWT    | Sessions |
| ----------- | ------ | -------- |
| Stateless   | Yes    | No       |
| Scalability | High   | Medium   |
| DB lookup   | No     | Yes      |
| Token size  | Larger | Small    |
| Revocation  | Hard   | Easy     |

---

# When to Use JWT

JWT is ideal for:

| Scenario            | Reason                   |
| ------------------- | ------------------------ |
| Microservices       | Stateless authentication |
| Mobile apps         | Token-based access       |
| Distributed systems | No session store         |
| API authentication  | Lightweight verification |

Avoid JWT when:

* Frequent logout needed
* Token revocation required
* Sensitive data involved

---

# Real World Example Architecture

Example: Large-scale application.

```mermaid
flowchart TB

User --> CDN
CDN --> APIGateway

APIGateway --> AuthService
APIGateway --> OrderService
APIGateway --> PaymentService
APIGateway --> ProductService

AuthService --> Database
```

Authentication steps:

1. User logs in
2. AuthService issues JWT
3. API Gateway validates token
4. Requests forwarded to services

---

# JWT Best Practices

| Practice                | Reason               |
| ----------------------- | -------------------- |
| Short token expiry      | Limits attack window |
| Use refresh tokens      | Improves UX          |
| Store tokens securely   | Prevent XSS          |
| Validate signature      | Prevent tampering    |
| Avoid sensitive payload | Tokens are readable  |

---

# Key Takeaways

JWT is one of the most widely used authentication mechanisms in modern systems.

It enables:

* Stateless authentication
* Scalable microservices
* Efficient API security
* Reduced database lookups

However, proper implementation is crucial to avoid security vulnerabilities.

Understanding JWT deeply is essential for designing secure **large-scale distributed systems**.