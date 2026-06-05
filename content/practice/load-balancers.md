---
title: Load Balancers
articleSlug: load-balancer
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Hard
tags: load-balancer, scalability, distributed-systems

Why are load balancers essential in large-scale distributed systems?

<!-- ANSWER -->
A single server cannot reliably handle:
- massive traffic
- hardware failures
- traffic spikes

Load balancers distribute incoming requests across multiple servers.

Architecture:

```text
Client → Load Balancer → Server Pool
```

Benefits:

| Benefit                     | Explanation                      |
| --------------------------- | -------------------------------- |
| Horizontal scalability      | Add more servers easily          |
| High availability           | Failed nodes bypassed            |
| Better resource utilization | Traffic evenly distributed       |
| Fault tolerance             | Reduced single-server dependency |

Without load balancing:

```text id="4m8qza"
Single overloaded servers become bottlenecks
```

Load balancers are foundational infrastructure components in modern scalable systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: layer4-vs-layer7, networking, load-balancer

Why do Layer 4 and Layer 7 load balancers solve different infrastructure problems?

<!-- ANSWER -->
Layer 4 load balancers operate at:
- TCP/UDP level

Layer 7 load balancers operate at:
- HTTP/HTTPS application layer

Comparison:

| Feature | Layer 4 | Layer 7 |
|---|---|---|
| Routing basis | IP + Port | URL, Headers, Cookies |
| Performance | Faster | More flexible |
| Visibility | Limited packet info | Full HTTP awareness |

Example:

```text id="6m2xqc"
L7 routes /payments and /search differently
```

Tradeoff:

```text id="uoeaqr"
Higher flexibility usually increases processing overhead
```

Large systems often combine both L4 and L7 balancing strategies.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: round-robin, load-balancing-algorithms, distributed-systems

Why is simple Round Robin load balancing insufficient for many production systems?

<!-- ANSWER -->
Round Robin distributes requests equally across servers.

Problem:

```text
Servers may not have equal processing capacity
```

Example:

* some servers stronger
* requests vary in complexity
* workloads become uneven

Consequences:

| Problem              | Impact                  |
| -------------------- | ----------------------- |
| Uneven utilization   | Some servers overloaded |
| Increased latency    | Slow nodes bottleneck   |
| Poor fault tolerance | Busy nodes overwhelmed  |

Architecture:

```text id="6p1qxt"
Request → Next Server Sequentially
```

Advanced algorithms like:

* Least Connections
* Weighted Round Robin
* Least Response Time

provide more adaptive balancing.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: least-connections, adaptive-routing, load-balancer

Why is the Least Connections algorithm often better for long-lived connections?

<!-- ANSWER -->
Round Robin ignores active server load.

Least Connections routes traffic to:

```text
Server with fewest active connections
```

Benefits:

| Benefit                    | Explanation                           |
| -------------------------- | ------------------------------------- |
| Better load awareness      | Adaptive balancing                    |
| Improved utilization       | Busy servers protected                |
| Suitable for long sessions | Persistent connections handled better |

Example:

```text id="5m2xqc"
WebSocket servers with varying connection durations
```

This algorithm is especially useful for:

* streaming systems
* chat applications
* real-time communication platforms

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: health-checks, high-availability, load-balancer

Why are health checks critical in load balancer architectures?

<!-- ANSWER -->
Servers may fail partially or completely.

Without health checks:

```text
Traffic continues routing to unhealthy nodes
```

Health check mechanisms:

* HTTP endpoint probing
* TCP connection tests
* heartbeat monitoring

Workflow:

```text id="clt6p5"
Healthy Nodes → Receive Traffic
Unhealthy Nodes → Removed
```

Benefits:

| Benefit            | Explanation           |
| ------------------ | --------------------- |
| High availability  | Failed nodes isolated |
| Reduced downtime   | Automatic failover    |
| Better reliability | Faster recovery       |

Health checks are essential for resilient distributed systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: sticky-sessions, session-management, load-balancer

Why can sticky sessions become problematic in scalable architectures?

<!-- ANSWER -->
Sticky sessions bind users to specific backend servers.

Mechanism:

```text
Same client always routed to same server
```

Problems:

| Problem                  | Impact                  |
| ------------------------ | ----------------------- |
| Uneven load distribution | Hotspot servers         |
| Poor failover handling   | Session loss on crashes |
| Reduced elasticity       | Harder autoscaling      |

Example:

```text id="4q2xmc"
One server accumulates thousands of active sessions
```

Modern architectures prefer:

* stateless services
* distributed session stores
* JWT-based authentication

to avoid sticky session limitations.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: ssl-termination, reverse-proxy, performance-engineering

Why is SSL termination commonly integrated with load balancers?

<!-- ANSWER -->
TLS encryption is CPU-intensive.

Without SSL termination:

```text
Every backend service performs encryption independently
```

Load balancer workflow:

```text id="4v8qpd"
HTTPS Client → Load Balancer → HTTP Backend
```

Benefits:

| Benefit                           | Explanation                          |
| --------------------------------- | ------------------------------------ |
| Reduced backend CPU usage         | Centralized encryption               |
| Simplified certificate management | Single TLS layer                     |
| Better scalability                | Backend focuses on application logic |

Examples:

* Nginx
* HAProxy
* AWS ALB

SSL termination significantly improves infrastructure efficiency.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: geo-load-balancing, cdn, global-distributed-systems

Why do globally distributed systems use geo-based load balancing?

<!-- ANSWER -->
Users are geographically distributed worldwide.

Routing all traffic to a single region causes:
- high latency
- congestion
- regional bottlenecks

Geo load balancing routes users to nearest regions.

Architecture:

```text id="6m3qpd"
User → Closest Regional Datacenter
```

Benefits:

| Benefit              | Explanation        |
| -------------------- | ------------------ |
| Lower latency        | Faster responses   |
| Better availability  | Regional failover  |
| Traffic distribution | Global scalability |

Techniques:

* Anycast routing
* GeoDNS
* CDN edge routing

Geo balancing is critical for internet-scale platforms.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: load-balancer, distributed-systems, fault-tolerance

Why can load balancers themselves become single points of failure?

<!-- ANSWER -->
All traffic flows through load balancers.

If the load balancer fails:

```text
Entire service may become unreachable
```

Problems:

| Problem            | Impact                 |
| ------------------ | ---------------------- |
| Traffic outage     | System unavailable     |
| Cascading failures | Services isolated      |
| DNS disruption     | Client routing failure |

Solutions:

| Solution                 | Purpose                  |
| ------------------------ | ------------------------ |
| Redundant load balancers | High availability        |
| Active-passive failover  | Backup recovery          |
| Anycast routing          | Distributed entry points |

Architecture:

```text id="1q8vza"
Multiple Load Balancers Behind DNS
```

Load balancer redundancy is critical for resilient infrastructure.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: load-balancer, trade-offs, system-design

What are the major trade-offs when designing load balancing infrastructure?

<!-- ANSWER -->
Load balancing improves scalability but introduces architectural complexity.

Advantages:

| Advantage | Explanation |
|---|---|
| Horizontal scaling | Traffic distributed |
| Fault tolerance | Failed nodes bypassed |
| Better availability | High uptime |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Additional latency | Extra network hop |
| Infrastructure complexity | More operational overhead |
| Session management challenges | Statelessness required |
| Balancer bottlenecks | Centralized routing pressure |

Example:

```text id="7v2xpd"
L7 inspection increases request processing overhead
```

Load balancer design fundamentally balances:

* performance
* flexibility
* scalability
* operational complexity

<!-- END -->