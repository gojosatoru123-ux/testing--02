---
title:  API Request
articleSlug: api-request
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: api, http, requests

What is an API request?

<!-- ANSWER -->
An API request is a message sent by a client to a server asking for data or an action to be performed.

Example flow:

```text
Client → API Request → Server
```

Example request:

```http
GET /api/users HTTP/1.1
Host: example.com
```

An API request typically contains:

| Component | Purpose         |
| --------- | --------------- |
| Method    | Operation type  |
| URL       | Target resource |
| Headers   | Metadata        |
| Body      | Request data    |

Common API request purposes:

* fetching data
* creating resources
* updating records
* deleting resources

API requests are the foundation of client-server communication.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: http-methods, api, backend

What are the common HTTP methods used in API requests?

<!-- ANSWER -->
HTTP methods define the action an API request wants to perform.

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

```http id="6m2xqc"
POST /users
```

```http id="7x4vpa"
DELETE /users/1
```

REST APIs rely heavily on proper HTTP method usage.

Benefits:

* predictable APIs
* clear semantics
* standardized communication

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: api-request, headers, http

What are HTTP headers in an API request?

<!-- ANSWER -->
HTTP headers provide metadata about an API request.

Example request:

```http
GET /api/users HTTP/1.1
Authorization: Bearer token
Content-Type: application/json
```

Common request headers:

| Header        | Purpose                |
| ------------- | ---------------------- |
| Authorization | Authentication         |
| Content-Type  | Body format            |
| Accept        | Expected response type |
| User-Agent    | Client information     |

Example:

```http id="1m7qxt"
Authorization: Bearer <jwt>
```

Headers help APIs handle:

* authentication
* content negotiation
* caching
* security policies

Headers are an essential part of every API request.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: request-body, json, api

What is the request body in an API request?

<!-- ANSWER -->
The request body contains data sent from the client to the server.

It is commonly used with:
- POST requests
- PUT requests
- PATCH requests

Example JSON body:

```json
{
  "name": "Alex",
  "email": "alex@example.com"
}
```

Example request:

```http id="5p8xpd"
POST /users
Content-Type: application/json
```

Body purposes:

| Purpose          | Example      |
| ---------------- | ------------ |
| Create resources | New user     |
| Update records   | Edit profile |
| Submit forms     | Login/signup |

Common body formats:

| Format    | Usage          |
| --------- | -------------- |
| JSON      | Modern APIs    |
| Form Data | File uploads   |
| XML       | Legacy systems |

The request body carries the actual data payload of an API request.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: query-parameters, api, routing

What are query parameters in API requests?

<!-- ANSWER -->
Query parameters are key-value pairs appended to a URL to modify request behavior.

Example:

```http
GET /users?page=2&limit=10
```

Structure:

```text id="6n3xqc"
?key=value&key=value
```

Common uses:

| Purpose    | Example    |
| ---------- | ---------- |
| Pagination | page=2     |
| Filtering  | role=admin |
| Sorting    | sort=name  |
| Searching  | q=alex     |

Backend access example:

```js
req.query.page
```

Query parameters make APIs flexible without changing routes.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: path-parameters, api-routing, backend

What are path parameters in API requests?

<!-- ANSWER -->
Path parameters are dynamic values embedded directly in the URL path.

Example:

```http
GET /users/42
```

Here:

```text id="9m2xwc"
42 = user ID
```

Example route:

```http id="5x1qxt"
/users/:id
```

Common uses:

| Resource | Example       |
| -------- | ------------- |
| Users    | /users/42     |
| Products | /products/100 |
| Posts    | /posts/15     |

Benefits:

* cleaner URLs
* resource identification
* RESTful API design

Path parameters uniquely identify specific resources.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: idempotency, http, api-design

What is idempotency in API requests?

<!-- ANSWER -->
An API request is idempotent if making the same request multiple times produces the same result.

Examples:

| Method | Idempotent |
|---|---|
| GET | Yes |
| PUT | Yes |
| DELETE | Yes |
| POST | Usually No |

Example:

```http
DELETE /users/1
```

First request:

```text id="1v7qpd"
User deleted
```

Second request:

```text id="8m4xyt"
User already absent
```

Final state remains unchanged.

Why idempotency matters:

| Benefit         | Purpose                    |
| --------------- | -------------------------- |
| Safe retries    | Prevent duplicate actions  |
| Reliability     | Better distributed systems |
| Fault tolerance | Network retry safety       |

Payment APIs often implement idempotency keys to avoid duplicate transactions.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: authentication, api-security, authorization

How are API requests authenticated?

<!-- ANSWER -->
API authentication verifies the identity of the client making the request.

Common authentication methods:

| Method | Example |
|---|---|
| API Keys | X-API-Key |
| JWT Tokens | Bearer tokens |
| OAuth | Access tokens |
| Sessions | Cookies |

JWT example:

```http
Authorization: Bearer <jwt>
```

API key example:

```http id="2n8qza"
X-API-Key: abc123
```

Authentication flow:

```text id="7m5xqc"
Client → Credentials → Server Verification
```

Authenticated requests allow servers to:

* identify users
* enforce permissions
* secure endpoints

Unauthenticated requests often return:

```http id="4v2qwr"
401 Unauthorized
```

Authentication is critical for API security.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: rate-limiting, api-security, backend

What is API rate limiting?

<!-- ANSWER -->
Rate limiting restricts how many API requests a client can make within a certain time period.

Example:

```text id="6m1xke"
100 requests per minute
```

Why rate limiting is important:

| Purpose       | Benefit                    |
| ------------- | -------------------------- |
| Prevent abuse | Stops spam requests        |
| Prevent DDoS  | Reduces overload           |
| Fair usage    | Shared resource protection |

Example response:

```http
HTTP/1.1 429 Too Many Requests
```

Common rate limiting strategies:

| Strategy       | Description           |
| -------------- | --------------------- |
| Fixed Window   | Requests per interval |
| Sliding Window | Moving time window    |
| Token Bucket   | Refillable tokens     |

Rate limiting is commonly implemented at:

* API gateways
* reverse proxies
* backend services

It is a critical API protection mechanism.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: api-errors, status-codes, backend

How should APIs handle errors in requests?

<!-- ANSWER -->
APIs should return clear and standardized error responses.

Example error response:

```json
{
  "error": "Invalid email format"
}
```

Common HTTP error codes:

| Status Code | Meaning               |
| ----------- | --------------------- |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Resource Not Found    |
| 500         | Internal Server Error |

Good API error responses should include:

* status code
* error message
* error details when appropriate

Example:

```http id="3m7qwc"
HTTP/1.1 400 Bad Request
```

Benefits of proper error handling:

* easier debugging
* better client integration
* predictable API behavior

Consistent error handling improves developer experience significantly.

<!-- END -->