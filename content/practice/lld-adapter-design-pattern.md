---
title: Adapter Design Pattern
articleSlug: lld-adapter-design-pattern
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: adapter-pattern, lld, design-patterns

What is the Adapter Design Pattern?

<!-- ANSWER -->
The Adapter Design Pattern allows incompatible interfaces to work together.

It acts as a bridge between:
- an existing class
- a required interface

Architecture:

```text
Client → Adapter → Adaptee
```

Purpose:

```text id="4m8qza"
Convert one interface into another expected by the client
```

Benefits:

| Benefit       | Explanation                               |
| ------------- | ----------------------------------------- |
| Reusability   | Use existing classes without modification |
| Compatibility | Integrate incompatible systems            |
| Flexibility   | Support legacy code                       |

The Adapter pattern is a structural design pattern.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: adapter-pattern, structural-patterns, lld

When should the Adapter Pattern be used?

<!-- ANSWER -->
The Adapter Pattern should be used when existing classes cannot directly work with the required interface.

Common scenarios:
- integrating third-party libraries
- legacy system compatibility
- API format conversion

Example:

```text id="6m2xqc"
PaymentGatewayA ≠ ExpectedPaymentInterface
```

Solution:

```text id="uoeaqr"
Adapter converts calls between interfaces
```

Benefits:

| Benefit              | Purpose                |
| -------------------- | ---------------------- |
| Avoid code rewrites  | Reuse existing systems |
| Simplify integration | Uniform interfaces     |
| Reduce coupling      | Decouple client logic  |

It is commonly used in enterprise backend systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: object-adapter, class-adapter, lld

What is the difference between Object Adapter and Class Adapter?

<!-- ANSWER -->
Object Adapter uses composition.

Class Adapter uses inheritance.

Comparison:

| Object Adapter | Class Adapter |
|---|---|
| Uses composition | Uses inheritance |
| More flexible | Tighter coupling |
| Preferred in modern languages | Requires multiple inheritance support |

Example Object Adapter:

```text id="6p1qxt"
Adapter HAS-A Adaptee
```

Example Class Adapter:

```text id="7m9vza"
Adapter IS-A Adaptee
```

Object Adapter is more commonly used in modern object-oriented systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: legacy-systems, adapter-pattern, software-design

How does the Adapter Pattern help with legacy systems?

<!-- ANSWER -->
Legacy systems often expose outdated interfaces incompatible with modern applications.

Example:

```text id="5m2xqc"
OldPaymentAPI → incompatible with new checkout system
```

Adapter solution:

```text id="8w4qza"
Modern Interface → Adapter → Legacy API
```

Benefits:

| Benefit                | Explanation              |
| ---------------------- | ------------------------ |
| Preserve existing code | Avoid expensive rewrites |
| Incremental migration  | Gradual modernization    |
| Reduced risk           | Stable integration       |

The Adapter Pattern is heavily used during system modernization projects.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: api-integration, adapter-pattern, lld

How is the Adapter Pattern used in third-party API integrations?

<!-- ANSWER -->
Different APIs expose different request and response formats.

Example:

```text id="clt6p5"
Stripe API ≠ Internal Payment Interface
```

Adapter flow:

```text id="2v7qwr"
Application → Payment Adapter → Third-Party API
```

Responsibilities of the adapter:

* request transformation
* response normalization
* error conversion

Benefits:

| Benefit              | Explanation                 |
| -------------------- | --------------------------- |
| Unified internal API | Simplified business logic   |
| Vendor abstraction   | Easier provider replacement |
| Cleaner architecture | Reduced external coupling   |

API integrations commonly rely on adapters.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: adapter-vs-facade, lld, design-patterns

What is the difference between Adapter and Facade Design Patterns?

<!-- ANSWER -->
Adapter converts interfaces.

Facade simplifies interfaces.

Comparison:

| Adapter | Facade |
|---|---|
| Makes incompatible interfaces work together | Provides simpler interface |
| Focuses on compatibility | Focuses on usability |
| Usually wraps one class | Often wraps multiple subsystems |

Example Adapter:

```text id="4q2xmc"
Convert XML API → JSON Interface
```

Example Facade:

```text id="nh6dzq"
Single API for complex subsystem
```

Both are structural design patterns but solve different problems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: dependency-inversion, adapter-pattern, solid-principles

How does the Adapter Pattern support the Dependency Inversion Principle?

<!-- ANSWER -->
The Dependency Inversion Principle states:

```text id="4v8qpd"
High-level modules should not depend on low-level modules directly
```

Adapters help by introducing abstraction layers.

Architecture:

```text id="5w2qwc"
Business Logic → Interface → Adapter → External System
```

Benefits:

| Benefit                | Explanation                       |
| ---------------------- | --------------------------------- |
| Loose coupling         | External implementations isolated |
| Easier testing         | Mock adapters possible            |
| Better maintainability | Replace implementations easily    |

Adapters are commonly used in clean architecture and hexagonal architecture.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: adapter-pattern, clean-architecture, lld

How does the Adapter Pattern improve testability?

<!-- ANSWER -->
Adapters isolate external dependencies behind interfaces.

Without adapter:

```text id="6m3qpd"
Business Logic → Direct External API Call
```

With adapter:

```text id="2p8qza"
Business Logic → Interface → Mock Adapter
```

Benefits:

| Benefit             | Explanation              |
| ------------------- | ------------------------ |
| Easier unit testing | Replace external systems |
| Faster tests        | Avoid real network calls |
| Better isolation    | Controlled test behavior |

Adapters allow mocking:

* payment gateways
* databases
* cloud services

This significantly improves maintainable testing architectures.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: anti-corruption-layer, microservices, adapter-pattern

What is an Anti-Corruption Layer and how is it related to the Adapter Pattern?

<!-- ANSWER -->
An Anti-Corruption Layer (ACL) prevents external system models from leaking into internal architecture.

It commonly uses adapters internally.

Architecture:

```text id="1q8vza"
External System → ACL → Internal Domain Model
```

Responsibilities:

* data translation
* protocol conversion
* model isolation

Benefits:

| Benefit              | Explanation                     |
| -------------------- | ------------------------------- |
| Domain protection    | Preserve internal design        |
| Reduced coupling     | External changes isolated       |
| Cleaner architecture | Internal consistency maintained |

ACLs are widely used in:

* microservices
* domain-driven design
* legacy migrations

The Adapter Pattern is a core building block of Anti-Corruption Layers.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: adapter-pattern, performance, software-architecture

What are the trade-offs of using the Adapter Pattern?

<!-- ANSWER -->
The Adapter Pattern improves flexibility but introduces additional abstraction layers.

Advantages:

| Advantage | Explanation |
|---|---|
| Better compatibility | Integrate incompatible systems |
| Reusability | Avoid rewriting code |
| Decoupling | Cleaner architecture |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Additional complexity | More classes and abstractions |
| Indirection overhead | Extra call layers |
| Harder debugging | More abstraction boundaries |

Example:

```text id="7v2xpd"
Client → Adapter → Wrapper → External API
```

Excessive adapters may overcomplicate system design.

Good architecture balances:

* flexibility
* simplicity
* maintainability

<!-- END -->