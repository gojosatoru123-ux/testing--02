---
title:  Routing
articleSlug: backend-routing
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Hard
tags: routing, backend-systems, distributed-systems

Why is routing a foundational concept in backend system design?

<!-- ANSWER -->
Backend systems receive:
- HTTP requests
- API calls
- internal service traffic
- event-driven requests

Routing determines:

```text
Which handler or service processes a request
```

Without efficient routing:

```text
Requests may reach incorrect or overloaded services
```

Routing responsibilities:

* request dispatching
* path matching
* load distribution
* traffic isolation

Architecture:

```text id="u1vcqn"
Client Request → Router → Service Handler
```

Routing is fundamental for scalability, reliability, and request orchestration.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: api-routing, scalability, backend-systems

Why do large-scale backend systems separate routing from business logic?

<!-- ANSWER -->
Mixing routing with business logic creates:
- tightly coupled systems
- difficult scaling
- reduced maintainability

Separation enables:
- centralized traffic management
- reusable routing rules
- independent service evolution

Architecture:

```text id="6m2xqc"
API Gateway / Router → Business Services
```

Benefits:

| Benefit                | Explanation                  |
| ---------------------- | ---------------------------- |
| Cleaner architecture   | Separation of concerns       |
| Better scalability     | Independent routing layer    |
| Easier traffic control | Centralized request policies |

Modern distributed systems often isolate routing into dedicated infrastructure layers.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: load-balancing, routing, distributed-systems

Why is intelligent request routing critical for load balancing?

<!-- ANSWER -->
Backend traffic is uneven and dynamic.

Problem:

```text
Poor routing may overload certain servers while others remain idle
```

Routing strategies:

* round robin
* least connections
* latency-aware routing
* weighted routing

Workflow:

```text id="6p1qxt"
Incoming Requests → Routing Decision → Healthy Backend Instance
```

Benefits:

| Benefit               | Explanation                    |
| --------------------- | ------------------------------ |
| Better scalability    | Distributed workload handling  |
| Improved availability | Avoid overloaded nodes         |
| Lower latency         | Optimized traffic distribution |

Routing directly impacts distributed system performance and stability.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: service-discovery, microservices, routing

Why is service discovery important in dynamic routing systems?

<!-- ANSWER -->
Modern distributed systems use:
- autoscaling
- ephemeral containers
- dynamic infrastructure

Problem:

```text
Backend service locations constantly change
```

Static routing tables become unreliable.

Service discovery enables:

```text id="5m2xqc"
Dynamic lookup of available service instances
```

Architecture:

```text id="k7t39d"
Router → Service Registry → Active Instances
```

Benefits:

| Benefit             | Explanation                  |
| ------------------- | ---------------------------- |
| Dynamic scalability | Automatic instance discovery |
| Fault tolerance     | Failed nodes removed         |
| Better elasticity   | Supports autoscaling         |

Routing and service discovery are tightly coupled in microservice architectures.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: sticky-sessions, routing, distributed-systems

Why do some backend systems require sticky-session routing?

<!-- ANSWER -->
Certain applications maintain:
- session state
- in-memory user context
- websocket connections

Problem:

```text
Requests routed to different servers may lose session continuity
```

Sticky sessions ensure:

```text id="clt6p5"
Same client consistently routed to same backend instance
```

Benefits:

| Benefit                          | Explanation                  |
| -------------------------------- | ---------------------------- |
| Session continuity               | Preserved local state        |
| Reduced synchronization overhead | Less shared session storage  |
| Simpler stateful workflows       | Easier connection management |

Tradeoff:

| Tradeoff                    | Explanation                       |
| --------------------------- | --------------------------------- |
| Uneven traffic distribution | Reduced load balancing efficiency |

Sticky routing improves stateful communication at the cost of flexibility.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: geo-routing, latency-optimization, distributed-systems

Why is geographic routing important in globally distributed systems?

<!-- ANSWER -->
Users are distributed worldwide.

Problem:

```text
Requests traveling long distances increase latency
```

Geographic routing directs traffic to:

* nearest region
* lowest latency data center
* geographically optimal backend

Architecture:

```text id="4q2xmc"
User → Regional Router → Closest Service Region
```

Benefits:

| Benefit                | Explanation                  |
| ---------------------- | ---------------------------- |
| Lower latency          | Faster responses             |
| Better user experience | Regional proximity           |
| Improved scalability   | Distributed traffic handling |

Examples:

* CDN routing
* Anycast routing
* geo-aware load balancing

Geo-routing is critical for low-latency global systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: failover-routing, resilience, backend-systems

Why is failover routing essential for high-availability systems?

<!-- ANSWER -->
Backend services inevitably fail due to:
- crashes
- overload
- network partitions
- infrastructure outages

Problem:

```text
Requests routed to failed instances increase outages
```

Failover routing dynamically bypasses unhealthy systems.

Workflow:

```text id="4v8qpd"
Health Check Failure → Traffic Redirected → Healthy Backend
```

Benefits:

| Benefit               | Explanation                 |
| --------------------- | --------------------------- |
| Improved availability | Failed nodes avoided        |
| Better resilience     | Automatic recovery behavior |
| Reduced downtime      | Continuous traffic serving  |

Routing plays a major role in distributed fault tolerance.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: api-gateway, routing, microservices

Why do microservice architectures commonly use API Gateways for routing?

<!-- ANSWER -->
Microservices expose:
- numerous endpoints
- distributed services
- heterogeneous protocols

Problem:

```text
Clients cannot efficiently manage direct communication with all services
```

API Gateway centralizes:

* routing
* authentication
* rate limiting
* traffic policies

Architecture:

```text id="6m3qpd"
Client → API Gateway → Internal Services
```

Benefits:

| Benefit                         | Explanation                   |
| ------------------------------- | ----------------------------- |
| Simplified client communication | Single entry point            |
| Centralized control             | Unified traffic management    |
| Better security                 | Consistent policy enforcement |

API Gateways act as intelligent routing layers in microservice ecosystems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: observability, routing, distributed-systems

Why is observability important in backend routing systems?

<!-- ANSWER -->
Routing systems influence:
- latency
- traffic distribution
- fault tolerance
- request success rates

Problem:

```text
Routing issues may silently degrade system performance
```

Key monitoring areas:

* request latency
* routing failures
* traffic imbalance
* backend health

Benefits:

| Benefit                     | Explanation                |
| --------------------------- | -------------------------- |
| Faster incident detection   | Identify routing anomalies |
| Better traffic optimization | Detect hotspots            |
| Improved reliability        | Routing visibility         |

Example:

```text id="1q8vza"
Traffic imbalance overloads one backend cluster
```

Routing infrastructure requires strong monitoring and telemetry systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: routing, trade-offs, system-design

What are the major trade-offs in backend routing systems?

<!-- ANSWER -->
Routing systems optimize:
- scalability
- availability
- latency
- traffic management

Advantages:

| Advantage | Explanation |
|---|---|
| Efficient traffic distribution | Better scalability |
| Fault isolation | Improved resilience |
| Centralized request management | Easier control |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Added infrastructure complexity | Routing layers and discovery systems |
| Routing latency overhead | Additional network hops |
| Stateful routing challenges | Sticky session limitations |
| Operational complexity | Health checks and traffic policies |

Example:

```text id="7v2xpd"
Geo-routing improves latency but increases routing coordination complexity
```

Routing architecture fundamentally balances:

* scalability
* latency
* availability
* operational simplicity

<!-- END -->