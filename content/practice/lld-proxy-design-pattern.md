---
title: Proxy Design Pattern
articleSlug: lld-proxy-design-pattern
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: proxy-pattern, lld, design-patterns

What is the Proxy Design Pattern?

<!-- ANSWER -->
The Proxy Design Pattern provides a placeholder or surrogate object that controls access to another object.

Architecture:

```text
Client → Proxy → Real Object
```

Purpose:

```text id="4m8qza"
Control access to an object
```

Benefits:

| Benefit             | Explanation                     |
| ------------------- | ------------------------------- |
| Access control      | Restrict direct object access   |
| Lazy initialization | Delay expensive object creation |
| Additional behavior | Logging, caching, security      |

The Proxy Pattern is a structural design pattern.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: proxy-pattern, access-control, lld

What problem does the Proxy Pattern solve?

<!-- ANSWER -->
Direct access to objects may be:
- expensive
- insecure
- inefficient

Without Proxy:

```text id="6m2xqc"
Client directly accesses heavy object
```

Problems:

* unnecessary resource usage
* missing security checks
* no caching layer

Proxy solution:

```text id="uoeaqr"
Intermediate object manages access
```

Benefits:

| Benefit              | Explanation            |
| -------------------- | ---------------------- |
| Better control       | Validate requests      |
| Improved performance | Caching/lazy loading   |
| Enhanced security    | Authorization handling |

Proxy adds intelligent control around object access.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: proxy-pattern, components, lld

What are the main components of the Proxy Pattern?

<!-- ANSWER -->
The Proxy Pattern contains:
- Subject
- RealSubject
- Proxy

Responsibilities:

| Component | Purpose |
|---|---|
| Subject | Common interface |
| RealSubject | Actual business object |
| Proxy | Controls access to RealSubject |

Architecture:

```text
Client → Proxy → RealSubject
```

Example:

```text id="6p1qxt"
ImageProxy → HighResolutionImage
```

The proxy implements the same interface as the real object.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: virtual-proxy, lazy-loading, performance-engineering

What is a Virtual Proxy?

<!-- ANSWER -->
A Virtual Proxy delays creation of expensive objects until they are actually needed.

Example:

```text id="5m2xqc"
Large image loaded only when displayed
```

Workflow:

```text id="8w4qza"
Proxy creates Real Object lazily
```

Benefits:

| Benefit            | Explanation                      |
| ------------------ | -------------------------------- |
| Faster startup     | Avoid unnecessary initialization |
| Lower memory usage | Deferred object creation         |
| Better performance | Lazy resource loading            |

Virtual proxies are common in:

* image viewers
* ORM lazy loading
* remote resources

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: protection-proxy, security, backend-systems

What is a Protection Proxy?

<!-- ANSWER -->
A Protection Proxy controls access based on authorization rules.

Example:

```text id="clt6p5"
Admin-only operations
```

Architecture:

```text id="2v7qwr"
Client → AuthProxy → SecureService
```

Benefits:

| Benefit                | Explanation                 |
| ---------------------- | --------------------------- |
| Access control         | Role-based restrictions     |
| Better security        | Prevent unauthorized access |
| Centralized validation | Shared authorization logic  |

Protection proxies are widely used in backend APIs and enterprise systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: remote-proxy, distributed-systems, networking

What is a Remote Proxy?

<!-- ANSWER -->
A Remote Proxy represents an object located on another machine or network.

Example:

```text id="4q2xmc"
Client → RemoteProxy → Remote Service
```

Responsibilities:

* network communication
* serialization
* remote request handling

Benefits:

| Benefit               | Explanation                       |
| --------------------- | --------------------------------- |
| Location transparency | Remote object appears local       |
| Simplified networking | Proxy hides communication details |
| Better abstraction    | Cleaner distributed systems       |

Remote proxies are common in:

* RPC systems
* gRPC
* distributed object frameworks

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: caching-proxy, performance-optimization, backend-engineering

How is the Proxy Pattern useful for caching?

<!-- ANSWER -->
A caching proxy stores previous results to avoid repeated expensive operations.

Example:

```text id="4v8qpd"
API response cache
```

Workflow:

```text id="5w2qwc"
Client → CacheProxy → Real Service
```

Benefits:

| Benefit            | Explanation              |
| ------------------ | ------------------------ |
| Reduced latency    | Faster repeated requests |
| Lower server load  | Fewer backend calls      |
| Better scalability | Efficient resource usage |

Caching proxies are common in:

* CDNs
* reverse proxies
* database query caches

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: proxy-vs-decorator, design-patterns, lld

What is the difference between Proxy and Decorator Design Patterns?

<!-- ANSWER -->
Proxy controls access to an object.

Decorator dynamically adds behavior to an object.

Comparison:

| Proxy | Decorator |
|---|---|
| Focuses on access control | Focuses on feature extension |
| May restrict object usage | Adds additional functionality |
| Often transparent to clients | Enhances behavior dynamically |

Example Proxy:

```text id="6m3qpd"
AuthorizationProxy
```

Example Decorator:

```text id="2p8qza"
CompressionDecorator
```

Both wrap objects but solve different architectural problems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: smart-proxy, resource-management, software-design

What is a Smart Proxy?

<!-- ANSWER -->
A Smart Proxy adds additional logic around object access.

Examples:
- reference counting
- logging
- monitoring
- synchronization

Architecture:

```text id="1q8vza"
Client → SmartProxy → Real Object
```

Benefits:

| Benefit               | Explanation                    |
| --------------------- | ------------------------------ |
| Better observability  | Logging and metrics            |
| Resource management   | Lifecycle tracking             |
| Additional safeguards | Validation and synchronization |

Smart proxies are common in enterprise middleware systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: proxy-pattern, trade-offs, software-design

What are the trade-offs of using the Proxy Pattern?

<!-- ANSWER -->
The Proxy Pattern improves control and optimization but introduces additional indirection.

Advantages:

| Advantage | Explanation |
|---|---|
| Access control | Security enforcement |
| Better performance | Lazy loading and caching |
| Improved abstraction | Transparent object management |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Additional complexity | Extra abstraction layer |
| Potential latency | Proxy forwarding overhead |
| Harder debugging | Indirect execution flow |

Example:

```text id="7v2xpd"
Client → Proxy → Real Object
```

Proxy works best when:

* access needs control
* resources are expensive
* cross-cutting concerns exist

<!-- END -->