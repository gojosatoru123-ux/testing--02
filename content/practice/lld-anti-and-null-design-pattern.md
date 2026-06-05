---
title: Anti and Null Design Pattern
articleSlug: lld-anti-and-null-design-pattern
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: null-object-pattern, lld, design-patterns

What is the Null Object Design Pattern?

<!-- ANSWER -->
The Null Object Pattern provides an object with default harmless behavior instead of using `null`.

Instead of:

```text
if(object != null)
```

systems use:

```text id="4m8qza"
RealObject or NullObject
```

Purpose:

* eliminate null checks
* avoid null pointer exceptions
* simplify client code

Benefits:

| Benefit             | Explanation                   |
| ------------------- | ----------------------------- |
| Cleaner code        | Fewer null conditions         |
| Safer execution     | Prevent null reference errors |
| Better polymorphism | Consistent object behavior    |

The Null Object Pattern is a behavioral design pattern.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: anti-patterns, software-design, lld

What is an Anti-Pattern in software design?

<!-- ANSWER -->
An Anti-Pattern is a commonly used solution that appears useful initially but causes long-term problems.

Examples:
- God Object
- Spaghetti Code
- Copy-Paste Programming

Characteristics:

| Characteristic | Explanation |
|---|---|
| Initially attractive | Seems easy or fast |
| Poor maintainability | Hard to scale or debug |
| Technical debt | Creates future problems |

Example:

```text id="6m2xqc"
One massive class handling everything
```

Recognizing anti-patterns is important in software architecture and low-level design interviews.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: null-object-pattern, clean-code, lld

Why is the Null Object Pattern better than repeated null checks?

<!-- ANSWER -->
Repeated null checks increase code complexity and duplication.

Without Null Object:

```text id="6p1qxt"
if(user != null)
```

With Null Object:

```text id="7m9vza"
user.performAction()
```

Benefits:

| Benefit                | Explanation           |
| ---------------------- | --------------------- |
| Cleaner business logic | Less conditional code |
| Better readability     | Simpler flow          |
| Reduced bugs           | Fewer null errors     |

Example:

```text id="8oz4ld"
GuestUser implements default behavior
```

The Null Object Pattern improves code maintainability.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: god-object, anti-patterns, software-architecture

What is the God Object Anti-Pattern?

<!-- ANSWER -->
The God Object Anti-Pattern occurs when one class handles too many responsibilities.

Example:

```text id="5m2xqc"
UserManager handles:
- authentication
- payments
- emails
- database access
- logging
```

Problems:

| Problem              | Explanation             |
| -------------------- | ----------------------- |
| Tight coupling       | Too many dependencies   |
| Hard testing         | Large complex logic     |
| Poor maintainability | Difficult modifications |

Violates:

```text id="8w4qza"
Single Responsibility Principle
```

God Objects are common in poorly structured backend systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: null-object-pattern, polymorphism, lld

How does the Null Object Pattern use polymorphism?

<!-- ANSWER -->
The Null Object Pattern relies on polymorphism by providing a substitute object implementing the same interface.

Architecture:

```text id="clt6p5"
Service Interface
 ├── RealService
 └── NullService
```

Example behavior:

| Object   | Behavior          |
| -------- | ----------------- |
| RealUser | Send notification |
| NullUser | Do nothing        |

Benefits:

* uniform behavior
* no special-case handling
* cleaner client code

Polymorphism allows clients to treat null objects like normal objects safely.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: spaghetti-code, anti-patterns, maintainability

What is Spaghetti Code?

<!-- ANSWER -->
Spaghetti Code refers to unstructured, tangled, and difficult-to-maintain code.

Characteristics:
- deeply nested logic
- duplicated code
- unclear control flow

Example:

```text id="4q2xmc"
if → else → nested if → switch → goto-like flow
```

Problems:

| Problem             | Explanation            |
| ------------------- | ---------------------- |
| Difficult debugging | Complex execution flow |
| Poor readability    | Hard to understand     |
| Low maintainability | Risky modifications    |

Causes:

* lack of architecture
* rushed development
* missing design principles

Spaghetti Code is one of the most common software anti-patterns.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: singleton-anti-pattern, global-state, lld

Why can Singleton become an Anti-Pattern?

<!-- ANSWER -->
Singleton provides a single global instance, but excessive use can create hidden dependencies and global state issues.

Problems:

| Problem | Explanation |
|---|---|
| Tight coupling | Components depend on global object |
| Difficult testing | Hard to mock dependencies |
| Shared mutable state | Concurrency risks |

Example:

```text id="4v8qpd"
GlobalConfig.getInstance()
```

Overuse leads to:

```text id="5w2qwc"
Hidden application-wide dependencies
```

Singleton is useful in limited scenarios but becomes harmful when abused.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: null-object-pattern, domain-driven-design, lld

Where is the Null Object Pattern commonly used in real systems?

<!-- ANSWER -->
The Null Object Pattern is commonly used where optional behavior exists.

Examples:
- guest users
- empty loggers
- fallback strategies
- disabled services

Example:

```text id="6m3qpd"
GuestUser instead of null User
```

Benefits:

| Benefit              | Explanation                |
| -------------------- | -------------------------- |
| Simplified workflows | Fewer conditional branches |
| Safer execution      | Avoid null failures        |
| Better extensibility | Easy default behavior      |

It is widely used in:

* clean architecture
* enterprise systems
* backend services

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: lava-flow, anti-patterns, legacy-systems

What is the Lava Flow Anti-Pattern?

<!-- ANSWER -->
Lava Flow occurs when obsolete or poorly understood code remains in the system because developers fear removing it.

Example:

```text id="1q8vza"
Unused modules kept "just in case"
```

Problems:

| Problem              | Explanation            |
| -------------------- | ---------------------- |
| Increased complexity | Dead code accumulation |
| Maintenance burden   | Confusing architecture |
| Slower development   | Fear of modification   |

Causes:

* missing documentation
* lack of tests
* legacy system fear

Lava Flow commonly appears in large long-running enterprise systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: anti-patterns, technical-debt, software-engineering

Why is identifying Anti-Patterns important in LLD interviews?

<!-- ANSWER -->
LLD interviews evaluate not only correct solutions but also awareness of poor design practices.

Recognizing anti-patterns demonstrates:
- architectural maturity
- maintainability thinking
- scalability awareness

Example anti-patterns:
- God Object
- Spaghetti Code
- Circular dependencies
- Over-engineering

Benefits of anti-pattern awareness:

| Benefit | Explanation |
|---|---|
| Better design decisions | Avoid future problems |
| Cleaner architecture | Improved maintainability |
| Reduced technical debt | Sustainable systems |

Strong engineers identify both:
- good patterns
- dangerous anti-patterns
<!-- END -->
