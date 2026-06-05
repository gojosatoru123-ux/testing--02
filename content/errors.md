---
title: Backend Errors
description: Understanding backend error types, HTTP error codes, database failures, validation errors, external service failures, and configuration problems.
category: Backend Design
order: 13
---

# A Beginner's Guide to Backend Errors: Why Things Go Wrong

In backend development, **errors are inevitable**.  
A database will eventually fail, an API will timeout, a user will send invalid data, or a deployment will miss a configuration.

The difference between **fragile systems and reliable systems** is not whether errors happen.

It is **how well the system is designed to handle them**.

A professional backend engineer assumes:

- failures will occur
- systems must recover gracefully
- users should receive meaningful responses
- developers should receive useful logs

This mindset is called **fault tolerance**.

> The best error handling begins **before the error even happens**.

Understanding the **types of backend errors** and their **corresponding HTTP error codes** is the first step toward building robust systems.

---

# 1. Logic Errors: The Sneaky Bugs

Logic errors occur when **the code executes successfully but produces the wrong result**.

Unlike runtime errors, these bugs do not crash the application.

Instead, they quietly produce incorrect behavior.

---

## Example Scenario

Imagine an e-commerce checkout system.

A promotional discount should be applied **once**.

But due to a logic bug:

```javascript
let total = 1000;
let discount = 0.1;

total = total - (total * discount);
total = total - (total * discount); // applied twice
````

The checkout system now applies **two discounts instead of one**.

The API response still returns:

```
HTTP 200 OK
```

But the business is losing money on every purchase.

---

## Why Logic Errors Are Dangerous

| Problem         | Impact                                |
| --------------- | ------------------------------------- |
| Silent failures | Application still runs                |
| Hard to detect  | No obvious crashes                    |
| Business damage | Incorrect billing, pricing, analytics |
| Long lifespan   | May remain unnoticed for months       |

---

## Common Causes

* Misinterpreted product requirements
* Incorrect algorithms
* Missing edge-case handling
* Incorrect assumptions about data

---

## Prevention Techniques

* Unit testing
* Integration testing
* Code reviews
* Feature validation with product teams
* Observability and logging

---

# 2. Input Validation Errors: The First Line of Defense

Input validation errors happen when **clients send incorrect data**.

This is the **most predictable type of backend error**.

Examples include:

* invalid email format
* missing required fields
* incorrect data types
* malicious inputs

Validation should occur **as early as possible**, usually in the request handler.

---

## Common HTTP Error Code

```
400 Bad Request
```

Meaning:
The client sent invalid data.

---

## Common Validation Rules

| Validation Type   | Example                                |
| ----------------- | -------------------------------------- |
| Format validation | Email must match `user@example.com`    |
| Range validation  | Age must be between 1-120              |
| Required fields   | `name` cannot be empty                 |
| Length validation | Password must be at least 8 characters |

---

## Example Request

Client sends:

```json
{
 "email": "not-an-email",
 "age": -5
}
```

Server response:

```
HTTP 400 Bad Request
```

```json
{
 "error": "ValidationError",
 "message": "Invalid input data"
}
```

---

## Example Validation Code

```javascript
function validateUser(data) {
  if (!data.email.includes("@")) {
    throw new Error("Invalid email format");
  }

  if (data.age < 0) {
    throw new Error("Age must be positive");
  }
}
```

---

# 3. Database Errors: When the System's Memory Fails

Most backend systems rely heavily on databases.

If the database fails, the entire system may stop functioning.

Database errors generally fall into three categories:

1. Connection errors
2. Constraint violations
3. Query errors

---

# 3.1 Connection Errors

A connection error occurs when the backend **cannot establish communication with the database**.

---

## Causes

* database server offline
* network failures
* connection pool exhaustion
* database overload

---

## Typical HTTP Response

```
503 Service Unavailable
```

Meaning:

The server is temporarily unable to handle the request.

---

## Example

```javascript
try {
  const users = await db.query("SELECT * FROM users");
} catch (error) {
  res.status(503).json({
    error: "DatabaseConnectionError",
    message: "Database temporarily unavailable"
  });
}
```

---

# 3.2 Constraint Violations

Constraint violations occur when **data breaks database rules**.

Most databases enforce constraints such as:

* unique constraints
* foreign key constraints
* not null constraints

---

## Unique Constraint Example

Two users cannot share the same email.

Database schema:

```sql
email VARCHAR UNIQUE
```

Attempting to insert a duplicate email triggers an error.

Typical response:

```
409 Conflict
```

Meaning:

The request conflicts with the current resource state.

---

## Foreign Key Constraint Example

Orders table:

```sql
customer_id REFERENCES customers(id)
```

If an order references a non-existent customer:

```
409 Conflict
```

---

# 3.3 Query Errors

Query errors occur due to mistakes in SQL queries.

Example:

```sql
SELECT * FROM custumers;
```

The correct table is `customers`.

Database returns an error.

Typical backend response:

```
500 Internal Server Error
```

---

# 4. External Service Errors: When Third Parties Fail

Modern backend systems depend heavily on third-party services.

Examples include:

* payment gateways
* email providers
* authentication providers
* AI APIs
* shipping services

Because these systems are outside your control, failures are common.

---

# 4.1 Network Failures

Network problems may cause requests to fail.

Examples:

* DNS resolution failures
* TCP connection timeouts
* packet loss
* slow networks

Typical HTTP response:

```
504 Gateway Timeout
```

Meaning:

The upstream service did not respond in time.

---

# 4.2 Rate Limiting

Many APIs restrict how many requests can be made within a given time window.

If the limit is exceeded:

```
429 Too Many Requests
```

Example response:

```json
{
 "error": "RateLimitExceeded",
 "message": "Too many API requests"
}
```

---

## Handling Rate Limits

A common strategy is **exponential backoff**.

Retry delays increase gradually:

```
1 second
2 seconds
4 seconds
8 seconds
```

Example:

```javascript
async function retryRequest(fn, retries = 5) {
  let delay = 1000;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch {
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
}
```

---

# 4.3 External Service Outages

Sometimes the external provider itself is down.

Typical HTTP response returned by your backend:

```
502 Bad Gateway
```

Meaning:

The server received an invalid response from an upstream service.

---

## Strategies for Handling Outages

| Strategy             | Explanation                    |
| -------------------- | ------------------------------ |
| Retry                | Attempt the request again      |
| Fallback             | Use cached or alternative data |
| Queue                | Process the request later      |
| Graceful degradation | Disable non-critical features  |

---

# 5. Configuration Errors: The Deployment Day Surprise

Configuration errors occur when application settings are incorrect.

These problems often appear when moving code between environments:

* development
* staging
* production

---

## Common Causes

* missing environment variables
* incorrect API keys
* wrong database connection strings
* missing secrets

---

## Example

A new feature requires:

```
OPENAI_API_KEY
```

The developer sets it locally but forgets to configure it in production.

The application crashes when attempting to call the API.

---

# Fail Fast vs Fail at Runtime

There are two ways configuration errors surface.

---

## Fail Fast (Best Practice)

The application checks configuration during startup.

Example:

```javascript
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY");
}
```

The application refuses to start.

This prevents broken deployments.

---

## Fail at Runtime (Worst Case)

The application starts normally.

The error only appears when the feature is used.

Example user response:

```
500 Internal Server Error
```

---

# 6. Important HTTP Error Codes in Backend Systems

| Code | Name                  | Meaning                       |
| ---- | --------------------- | ----------------------------- |
| 400  | Bad Request           | Invalid client input          |
| 401  | Unauthorized          | Authentication required       |
| 403  | Forbidden             | User lacks permission         |
| 404  | Not Found             | Resource does not exist       |
| 409  | Conflict              | Resource conflict             |
| 429  | Too Many Requests     | Rate limit exceeded           |
| 500  | Internal Server Error | Unexpected server failure     |
| 502  | Bad Gateway           | Upstream service failure      |
| 503  | Service Unavailable   | Server temporarily overloaded |
| 504  | Gateway Timeout       | External service timeout      |

---

# 7. Global Error Handling: The Safety Net

Even with proper validation and error checks, some errors will escape.

A **global error handler** acts as a final safety net.

It ensures:

* consistent responses
* safe error messages
* centralized logging

---

## Example Global Error Handler

```javascript
function errorHandler(err, req, res, next) {

  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "ValidationError",
      message: err.message
    });
  }

  if (err.code === "DB_CONNECTION_ERROR") {
    return res.status(503).json({
      error: "DatabaseUnavailable"
    });
  }

  return res.status(500).json({
    error: "InternalServerError"
  });

}
```

---

# 8. Professional Error Handling Principles

A well-designed backend system follows these principles:

* validate input early
* return correct HTTP status codes
* log errors for debugging
* hide sensitive internal details
* gracefully handle external failures
* detect configuration issues early
* centralize error handling

---

# Conclusion

Backend errors are not rare incidents.

They are an **expected part of building distributed systems**.

A reliable backend does not attempt to eliminate every error.

Instead, it prepares for them through:

* input validation
* structured error handling
* correct HTTP status codes
* database safeguards
* retry strategies
* configuration checks
* global error handlers

Understanding these error categories transforms backend development from **reactive debugging** into **proactive system design**.

And that shift in thinking is what separates a beginner backend developer from a professional one.