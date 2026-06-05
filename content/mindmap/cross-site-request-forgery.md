---
title: Cross-Site Request Forgery (CSRF)
articleSlug: cross-site-request-forgery
---

# Cross-Site Request Forgery (CSRF)

## Overview
- Also called XSRF or Session Riding
- Web security vulnerability
- Tricks authenticated users into performing unintended actions
- Exploits server trust in the user's browser
- Browsers automatically attach authentication cookies
- Malicious sites can trigger requests using the victim's session

## Potential Consequences
- Transferring money
- Changing account passwords
- Modifying profile information
- Posting content on behalf of the user

## Core Idea Behind CSRF

### Cookie-Based Authentication
- Web apps commonly use cookies for authentication
- After login server sends session cookie
- Browser automatically includes the cookie in future requests
- Server assumes requests with valid cookies are legitimate

### Exploited Assumption
- Server trusts the browser
- If cookie is valid request is treated as authentic
- Attackers abuse this trust to perform actions

## Why CSRF is Dangerous

### Automatic Cookie Behavior
- Browsers attach cookies to every request for the same domain
- Happens regardless of where the request originated

### Example Scenario

#### User Login
- User logs into bank.com
- Browser stores session_cookie

#### Visiting Malicious Site
- User later visits malicious-site.com
- Page triggers request to bank.com

#### Automatic Request
- Browser attaches session cookie automatically
- Server processes request as authenticated

### Result
- Action executed without user's intention
- Server cannot distinguish malicious request

## CSRF vs XSS

### CSRF Characteristics
- Does not require code injection into the target site
- Exploits browser trust
- Uses victim's authenticated session
- Goal is to perform actions as the victim

### XSS Characteristics
- Requires injecting code into the target site
- Executes malicious scripts in browser
- Sometimes uses session information
- Goal is script execution or data theft

## How CSRF Attacks Work

### Step 1 Victim Authentication
- Victim logs into the target application
- Server issues session cookie
- Browser stores session_id
- User becomes authenticated

### Step 2 Malicious Payload Delivery

#### Delivery Methods
- Phishing emails
- Malicious websites
- Compromised advertisements
- Injected scripts
- Hidden iframes

#### Attack Mechanism
- Page contains hidden form or request
- Form submits automatically
- Request targets the victim application

### Step 3 Forged Request Execution
- Victim browser sends request to the server
- Session cookie is automatically attached
- Server processes request as legitimate
- Action is executed successfully

## Real Attack Example

### Target Endpoint
- POST https://bank.com/transfer

### Parameters
- amount
- recipient account

### Attack Method
- Attacker embeds request in HTML image or form
- Browser loads resource automatically
- Request executes with session cookie

## Why CSRF Works

### Automatic Cookie Attachment
- Browsers include session cookies in requests automatically
- Happens for any request to the same domain

### Server Trust in Cookies
- Many systems authenticate users only with session cookies

### Lack of Origin Verification
- Server does not verify where request originated
- Cannot distinguish legitimate site from attacker site

## Prevention Techniques

### Synchronizer Token Pattern (CSRF Tokens)

#### Concept
- Server generates random secret token
- Token associated with user session

#### Implementation
- Token embedded in forms
- Token sent with request
- Server validates token before processing

#### Validation Result
- Missing or invalid token causes request rejection

#### Why It Works
- Tokens are unpredictable
- Attackers cannot read tokens from another origin due to browser security rules

### SameSite Cookies

#### Cookie Attribute
- SameSite defines cross-site cookie behavior

#### Strict
- Cookies never sent in cross-site requests

#### Lax
- Cookies sent only during top-level navigation

#### None
- Cookies allowed in cross-site requests

#### Recommended Configuration
- SameSite=Lax
- SameSite=Strict

### Origin Header Validation

#### Request Header
- Origin header indicates request origin

#### Server Validation
- Server checks allowed origin
- Requests from untrusted origins are rejected

### Referer Header Validation

#### Request Metadata
- Referer header contains source page URL

#### Validation Logic
- Server ensures requests originate from trusted domain pages

### Custom Request Headers

#### Security Strategy
- Require custom headers that normal forms cannot send

#### Example Header
- X-CSRF-Token

#### Benefit
- Cross-site HTML forms cannot include custom headers

### User Interaction Verification

#### Additional Safeguards
- Password re-entry
- OTP verification
- CAPTCHA challenges

#### Used For
- Password changes
- Money transfers
- Account deletion
- Sensitive account modifications

## Built-in CSRF Protection in Frameworks

### Django
- Built-in CSRF middleware

### Ruby on Rails
- Authenticity tokens included in forms

### Spring Security
- Built-in CSRF token validation

### Laravel
- Middleware automatically validates CSRF tokens

### Express
- csurf middleware package

## Relation Between CSRF and CORS

### CSRF Characteristics
- Prevents forged requests
- Protects server-side actions
- Uses application-level protections

### CORS Characteristics
- Controls cross-origin resource access
- Protects reading of responses
- Implemented by browser security model

### Important Insight
- CSRF attacks only require sending requests
- Reading responses is not necessary
- CORS may block response reading
- Action may still succeed on server

## Attack Flow

### User Authentication
- User logs into bank.com

### Session Creation
- Server sets session cookie

### Malicious Interaction
- User visits malicious website

### Forged Request
- Hidden request sent to bank.com

### Automatic Cookie Attachment
- Browser includes session cookie

### Server Processing
- Server processes request as authenticated action

## Best Practices

### Recommended Security Setup
- CSRF tokens
- SameSite cookies
- Origin validation

### High-Security Operations
- CSRF token validation
- Re-authentication
- Additional verification mechanisms

## Key Takeaways

### Core Concept
- CSRF tricks authenticated users into executing unwanted actions

### Exploited Mechanism
- Automatic browser cookie behavior

### Attack Requirement
- Only requires sending requests
- Reading responses is unnecessary

### Targeted Operations
- State-changing requests
- Account modifications
- Financial operations

### Best Defense
- Combine CSRF tokens
- Use SameSite cookie policies
- Validate request origins
