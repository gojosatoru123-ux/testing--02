---
title: JWT Authentication
articleSlug: jwt
---

# JWT Authentication

## Introduction

* Hotel key card analogy
* Identity verified once
* Token proves authorization
* No repeated verification
* Encoded trust information

## JWT Definition

* JSON Web Token
* Compact URL-safe token
* Secure data transmission
* Stateless authentication

### Common Uses

* User authentication
* Resource authorization
* API security
* Stateless sessions

## Stateless vs Stateful

### Session-Based Authentication

* Server session storage
* Session ID cookie
* Database validation
* Shared session store

#### Problems

* Storage requirement
* Scaling difficulty
* Extra database lookup

### JWT Authentication

* Token issued at login
* Client stores token
* Token sent each request
* Local validation

#### Benefits

* Stateless system
* Faster validation
* Horizontal scalability
* Microservice friendly

## JWT Structure

* Three token parts
* Header payload signature
* Dot separated sections

### Header

* Token metadata
* Algorithm definition
* Token type

#### Fields

* alg field
* typ field

#### Algorithms

* HS256 HMAC SHA256
* RS256 RSA signature
* ES256 elliptic curve

### Payload

* User claims data
* Authorization details
* Metadata fields

#### Registered Claims

* iss issuer
* sub subject
* aud audience
* exp expiration time
* iat issued time
* nbf not before

#### Public Claims

* Custom application claims
* User identifiers
* Subscription plan

#### Private Claims

* Internal service data
* Permission lists
* Role definitions

### Signature

* Tamper protection
* Cryptographic signing
* Header payload hashing
* Secret key verification

## Authentication Flow

* User enters credentials
* Client sends login
* Auth server validates
* Token returned
* Client stores token
* Token sent requests
* API verifies signature
* API returns response

## Authorization Header

* Bearer token format
* Authorization header usage
* Token attached requests

## Access vs Refresh Tokens

### Access Token

* API request authorization
* Short lived token
* Frequent validation

### Refresh Token

* Generate new access
* Longer expiration
* Secure storage required

### Token Lifecycle

* Login generates tokens
* Access token used
* Token expiration occurs
* Refresh token used
* New access issued

## Token Storage

### Local Storage

* Easy implementation
* Browser accessible storage

#### Risk

* XSS vulnerability

### HTTP Only Cookies

* Secure browser cookie
* JavaScript inaccessible
* Automatic request attach

## JWT in Microservices

* Stateless identity sharing
* Independent service validation
* No central session store

### Architecture

* Client request gateway
* Gateway forwards request
* Services validate token
* Services apply authorization

## Security Considerations

### Sensitive Data

* Payload readable
* Avoid private secrets
* No password storage

### Token Expiration

* Short access tokens
* Reduced attack window

### HTTPS Requirement

* Secure transport channel
* Prevent interception

### Secret Rotation

* Periodic key updates
* Reduce compromise risk

### Token Revocation

* Token blacklist approach
* Short expiration strategy

## JWT vs Sessions

### JWT

* Stateless authentication
* High scalability
* No database lookup
* Hard revocation

### Sessions

* Stateful storage
* Lower scalability
* Database lookup required
* Easy revocation

## When To Use JWT

* Microservice systems
* Mobile applications
* Distributed architecture
* API authentication

## When Not To Use

* Frequent logout systems
* Strict token revocation
* Sensitive payload requirements

## Real World Architecture

* User client request
* CDN entry point
* API gateway routing
* Auth service login
* Service validation
* Backend databases

## Best Practices

* Short token expiration
* Use refresh tokens
* Secure token storage
* Validate token signature
* Avoid sensitive payload

## Key Takeaways

* Stateless authentication model
* Distributed system friendly
* Reduces database lookups
* Enables scalable security
* Requires careful implementation
