---
title: Data Validation  
articleSlug: data-validation
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: validation, backend, security

What is data validation?

<!-- ANSWER -->
Data validation is the process of checking whether input data is correct, safe, and conforms to expected rules before processing it.

Validation ensures:
- correct data types
- proper formatting
- safe input handling
- business rule enforcement

Example:

```text
Email must contain @
```

Typical validations:

| Validation Type    | Example                  |
| ------------------ | ------------------------ |
| Required fields    | Username cannot be empty |
| Length validation  | Password minimum length  |
| Format validation  | Valid email format       |
| Numeric validation | Age must be positive     |

Example validation:

```js
if (!email.includes('@')) {
  throw new Error('Invalid email')
}
```

Validation is critical for:

* security
* data integrity
* application stability

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: frontend-validation, backend-validation, security

Why is backend validation necessary even if frontend validation exists?

<!-- ANSWER -->
Frontend validation improves user experience but cannot be trusted for security.

Attackers can bypass frontend validation using:
- custom HTTP requests
- modified JavaScript
- API tools like Postman

Example dangerous assumption:

```text id="6m2xqc"
Frontend already validated input
```

Backend validation ensures:

* malicious requests are blocked
* business rules are enforced
* data integrity is maintained

Example:

```js
if (password.length < 8) {
  return res.status(400).send('Weak password')
}
```

Important rule:

```text id="1k9xwr"
Never trust client input.
```

Backend validation is mandatory for secure applications.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: sanitization, validation, security

What is the difference between validation and sanitization?

<!-- ANSWER -->
Validation checks whether input is acceptable.

Sanitization modifies input to make it safe.

Comparison:

| Validation | Sanitization |
|---|---|
| Rejects invalid input | Cleans unsafe input |
| Enforces rules | Removes dangerous content |
| Example: email format | Example: escaping HTML |

Validation example:

```js
email.includes('@')
```

Sanitization example:

```html id="2m8qza"
<script>alert('XSS')</script>
```

becomes:

```html id="4v1xpd"
&lt;script&gt;alert('XSS')&lt;/script&gt;
```

Applications commonly use both:

* validation for correctness
* sanitization for security

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: schema-validation, api, backend

What is schema validation?

<!-- ANSWER -->
Schema validation checks whether incoming data matches a predefined structure.

Example JSON schema:

```json
{
  "type": "object",
  "required": ["email", "password"]
}
```

Incoming request:

```json
{
  "email": "alex@example.com",
  "password": "secret123"
}
```

Schema validation ensures:

* required fields exist
* correct data types
* valid structures
* predictable input

Benefits:

| Benefit         | Purpose                      |
| --------------- | ---------------------------- |
| Consistency     | Uniform request format       |
| Security        | Reject malformed input       |
| Maintainability | Centralized validation rules |

Popular schema validation libraries:

| Language   | Library             |
| ---------- | ------------------- |
| JavaScript | Joi, Zod, Yup       |
| Python     | Pydantic            |
| Java       | Hibernate Validator |

Schema validation is widely used in APIs and microservices.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: input-validation, security, sql-injection

How does proper validation help prevent SQL injection?

<!-- ANSWER -->
SQL injection occurs when attackers inject malicious SQL into application queries.

Dangerous query construction:

```js
const query = "SELECT * FROM users WHERE id = " + userInput
```

Attacker input:

```sql id="7m2xke"
1 OR 1=1
```

Resulting query:

```sql id="3q8vpd"
SELECT * FROM users WHERE id = 1 OR 1=1
```

Validation helps by:

* enforcing expected data types
* rejecting malicious patterns
* limiting dangerous characters

Example validation:

```js
if (!Number.isInteger(userId)) {
  throw new Error('Invalid ID')
}
```

Best practices:

| Protection            | Purpose                  |
| --------------------- | ------------------------ |
| Input validation      | Reject malicious input   |
| Parameterized queries | Prevent query injection  |
| ORM usage             | Safer query construction |

Validation is an important layer in SQL injection prevention.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: regex, validation, backend

How are regular expressions used in data validation?

<!-- ANSWER -->
Regular expressions (Regex) are patterns used to validate text formats.

Example email regex:

```regex
^[^\s@]+@[^\s@]+\.[^\s@]+$
```

Validation example:

```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

Common regex validation uses:

| Validation        | Example                                     |
| ----------------- | ------------------------------------------- |
| Email             | [user@example.com](mailto:user@example.com) |
| Phone number      | Numeric patterns                            |
| Password strength | Complexity rules                            |
| ZIP codes         | Country-specific formats                    |

Benefits:

* concise validation logic
* flexible pattern matching
* reusable rules

Risks:

* overly complex regex
* performance issues
* difficult maintenance

Regex is powerful but should be used carefully.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: whitelist-validation, blacklist-validation, security

What is the difference between whitelist and blacklist validation?

<!-- ANSWER -->
Whitelist validation allows only explicitly permitted input.

Blacklist validation blocks known dangerous input.

Comparison:

| Whitelist | Blacklist |
|---|---|
| Allow known safe input | Block known bad input |
| More secure | Easier to bypass |
| Restrictive | Reactive approach |

Whitelist example:

```js
const allowedRoles = ['admin', 'user']
```

Blacklist example:

```js
if (input.includes('<script>'))
```

Problem with blacklist validation:

```text id="1v7xqc"
Attackers constantly invent new bypass techniques.
```

Best practice:

```text id="5n2qpd"
Prefer whitelist validation whenever possible.
```

Whitelist validation provides stronger security guarantees.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: validation-layers, backend-architecture, security

Why should validation exist at multiple layers of an application?

<!-- ANSWER -->
Validation should exist across multiple layers because each layer protects against different risks.

Typical layers:

| Layer | Purpose |
|---|---|
| Frontend | User experience |
| API Gateway | Request filtering |
| Backend | Business validation |
| Database | Data integrity |

Example flow:

```text id="4v8xmc"
Client → API → Service → Database
```

Benefits of layered validation:

* defense in depth
* reduced attack surface
* improved reliability
* stronger data consistency

Database example:

```sql id="7m1qza"
NOT NULL
UNIQUE
CHECK constraints
```

Even if one layer fails:

* other layers still provide protection

Layered validation is a core secure architecture principle.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: file-validation, upload-security, backend-security

Why is file upload validation important?

<!-- ANSWER -->
File upload validation prevents attackers from uploading malicious or dangerous files.

Risks of insecure uploads:
- malware uploads
- remote code execution
- storage abuse
- XSS via uploaded content

Dangerous example:

```text id="2m7qxt"
shell.php
```

Validation should check:

| Validation     | Purpose                  |
| -------------- | ------------------------ |
| File type      | Allow safe formats       |
| MIME type      | Verify actual content    |
| File size      | Prevent abuse            |
| File extension | Restrict dangerous files |

Example validation:

```js
if (!allowedTypes.includes(file.mimetype)) {
  throw new Error('Invalid file type')
}
```

Best practices:

* store uploads outside executable directories
* rename uploaded files
* scan for malware
* restrict executable formats

File uploads are a common attack vector in web applications.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: business-validation, backend, application-logic

What is business rule validation?

<!-- ANSWER -->
Business rule validation ensures application-specific logic and policies are enforced correctly.

Examples:
- bank account balance cannot go negative
- users cannot book unavailable seats
- age restrictions for purchases

Example:

```text id="7v2xpd"
Withdrawal amount ≤ account balance
```

Unlike format validation:

| Technical Validation | Business Validation      |
| -------------------- | ------------------------ |
| Email format         | Email already registered |
| Numeric value        | Amount exceeds limit     |
| Required field       | User lacks permission    |

Example business validation:

```js
if (withdrawal > balance) {
  throw new Error('Insufficient funds')
}
```

Business validation protects:

* application integrity
* financial correctness
* workflow consistency

It is a critical part of backend logic enforcement.

<!-- END -->