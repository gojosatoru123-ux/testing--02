---
title: Chain of Responsibility Design Pattern
articleSlug: lld-chain-of-responsibility-design-pattern
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: chain-of-responsibility, lld, design-patterns

What is the Chain of Responsibility Design Pattern?

<!-- ANSWER -->
The Chain of Responsibility Pattern passes a request through a chain of handlers until one handler processes it.

Architecture:

```text
Request → Handler1 → Handler2 → Handler3
```

Each handler can:

* process the request
* forward the request
* reject the request

Purpose:

```text id="4m8qza"
Decouple sender from receiver
```

Benefits:

| Benefit              | Explanation                        |
| -------------------- | ---------------------------------- |
| Loose coupling       | Sender unaware of concrete handler |
| Flexible workflows   | Dynamic processing chains          |
| Better extensibility | Add handlers easily                |

The Chain of Responsibility is a behavioral design pattern.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: chain-of-responsibility, request-processing, lld

When should the Chain of Responsibility Pattern be used?

<!-- ANSWER -->
The pattern should be used when multiple objects may handle a request dynamically.

Common scenarios:
- middleware pipelines
- authentication filters
- logging systems
- event processing

Example:

```text id="6m2xqc"
Request → Auth → Validation → Business Logic
```

Benefits:

| Benefit                | Explanation                      |
| ---------------------- | -------------------------------- |
| Flexible routing       | Dynamic handler chains           |
| Separation of concerns | Each handler focuses on one task |
| Easier maintenance     | Independent handlers             |

It is widely used in backend frameworks and web servers.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: handlers, chain-of-responsibility, lld

What are the main components of the Chain of Responsibility Pattern?

<!-- ANSWER -->
The pattern consists of:
- Handler interface
- Concrete handlers
- Client request

Architecture:

```text
Client → Handler Interface
           ↓
    Concrete Handlers
```

Responsibilities:

| Component        | Purpose                           |
| ---------------- | --------------------------------- |
| Handler          | Defines request handling contract |
| Concrete Handler | Processes or forwards request     |
| Client           | Sends request into chain          |

Example flow:

```text id="6p1qxt"
Handler A → Handler B → Handler C
```

Handlers are connected sequentially to form the chain.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: middleware, backend-frameworks, chain-of-responsibility

How is the Chain of Responsibility Pattern used in middleware systems?

<!-- ANSWER -->
Middleware systems process requests through sequential handlers.

Example request pipeline:

```text id="5m2xqc"
Request
↓
Authentication Middleware
↓
Logging Middleware
↓
Validation Middleware
↓
Controller
```

Benefits:

| Benefit            | Explanation                   |
| ------------------ | ----------------------------- |
| Modular processing | Independent middleware layers |
| Reusable handlers  | Shared request logic          |
| Flexible ordering  | Reconfigure pipelines easily  |

Examples:

* Express.js middleware
* Spring filters
* ASP.NET middleware

Middleware architectures commonly use Chain of Responsibility internally.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: chain-of-responsibility, authentication, backend-security

How does the Chain of Responsibility Pattern help in authentication systems?

<!-- ANSWER -->
Authentication systems often require multiple validation stages.

Example flow:

```text id="clt6p5"
Request
↓
API Key Validation
↓
JWT Validation
↓
Permission Check
```

Each handler:

* validates part of the request
* rejects invalid requests
* forwards valid requests

Benefits:

| Benefit                | Explanation                     |
| ---------------------- | ------------------------------- |
| Layered security       | Multiple validation stages      |
| Better maintainability | Independent auth components     |
| Flexible policies      | Easy addition/removal of checks |

This pattern is widely used in API gateways and backend security systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: chain-of-responsibility-vs-decorator, lld, design-patterns

What is the difference between Chain of Responsibility and Decorator Patterns?

<!-- ANSWER -->
Chain of Responsibility passes requests through handlers.

Decorator adds behavior to objects dynamically.

Comparison:

| Chain of Responsibility | Decorator |
|---|---|
| Focuses on request handling flow | Focuses on behavior enhancement |
| Multiple handlers may process request | Wrappers extend object functionality |
| Request may stop midway | All decorators usually execute |

Example Chain:

```text id="4q2xmc"
Auth → Validation → Processing
```

Example Decorator:

```text id="nh6dzq"
Coffee → MilkDecorator → SugarDecorator
```

Both patterns use composition but solve different design problems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: chain-of-responsibility, event-processing, distributed-systems

How is the Chain of Responsibility Pattern used in event processing systems?

<!-- ANSWER -->
Event processing systems often route events through multiple processing stages.

Example:

```text id="4v8qpd"
Event
↓
Validation Handler
↓
Transformation Handler
↓
Persistence Handler
```

Benefits:

| Benefit                | Explanation                   |
| ---------------------- | ----------------------------- |
| Modular event handling | Independent processors        |
| Flexible pipelines     | Reorder handlers dynamically  |
| Better scalability     | Distributed processing stages |

Examples:

* Kafka stream processing
* logging pipelines
* ETL workflows

The pattern naturally models sequential event processing systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: chain-of-responsibility, error-handling, backend-systems

How does the Chain of Responsibility Pattern improve error handling?

<!-- ANSWER -->
Handlers can intercept and process errors at different stages of the chain.

Example:

```text id="6m3qpd"
Request
↓
Validation Handler
↓
Authorization Handler
↓
Business Handler
```

Possible behavior:

* reject invalid requests early
* transform exceptions
* log failures centrally

Benefits:

| Benefit                  | Explanation                 |
| ------------------------ | --------------------------- |
| Early failure detection  | Stop invalid processing     |
| Cleaner logic separation | Independent error handlers  |
| Better observability     | Centralized logging/tracing |

This pattern is widely used in backend request-processing pipelines.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: dynamic-pipelines, chain-of-responsibility, lld

Why is the Chain of Responsibility Pattern considered flexible?

<!-- ANSWER -->
Handlers can be:
- added
- removed
- reordered

without changing client logic.

Example:

```text id="1q8vza"
Logging → Auth → Validation
```

can become:

```text id="rzdmjt"
RateLimit → Logging → Auth → Validation
```

Benefits:

| Benefit                | Explanation                |
| ---------------------- | -------------------------- |
| Configurable workflows | Dynamic request pipelines  |
| Extensibility          | Easy new handlers          |
| Loose coupling         | Minimal dependency changes |

This flexibility makes the pattern useful in:

* backend frameworks
* API gateways
* middleware systems

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: chain-of-responsibility, trade-offs, software-design

What are the trade-offs of using the Chain of Responsibility Pattern?

<!-- ANSWER -->
The Chain of Responsibility Pattern improves modularity but introduces additional complexity.

Advantages:

| Advantage | Explanation |
|---|---|
| Loose coupling | Sender independent from handlers |
| Flexible processing | Dynamic chains |
| Better extensibility | Add handlers easily |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Harder debugging | Request path may be unclear |
| Performance overhead | Multiple handler traversals |
| Unhandled requests | Possible missing processors |

Example:

```text id="7v2xpd"
Request traverses many handlers before completion
```

The pattern works best for:

* request pipelines
* middleware chains
* layered processing systems

<!-- END -->