---
title: Throughput and Latency
articleSlug: throughput-and-latency
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Hard
tags: throughput, latency, performance-engineering

Why are throughput and latency considered fundamental metrics in distributed systems?

<!-- ANSWER -->
Distributed systems must handle:
- large traffic volumes
- real-time responsiveness
- scalable workloads

Core metrics:

| Metric | Meaning |
|---|---|
| Latency | Time taken for one request |
| Throughput | Number of requests processed per unit time |

Example:

```text id="u1vcqn"
Low latency = fast responses
High throughput = many requests handled simultaneously
```

Both metrics define:

* user experience
* scalability
* system efficiency

Performance engineering fundamentally revolves around balancing latency and throughput.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: latency, user-experience, distributed-systems

Why is latency often more critical for user experience than throughput?

<!-- ANSWER -->
Users perceive responsiveness directly through latency.

Problem:

```text
Slow response times degrade user interaction quality
```

Examples:

* delayed page loads
* sluggish APIs
* slow checkout flows

Even systems with high throughput may feel slow if latency is high.

Benefits of low latency:

| Benefit                    | Explanation         |
| -------------------------- | ------------------- |
| Better responsiveness      | Faster interactions |
| Improved user satisfaction | Reduced waiting     |
| Higher engagement          | Smoother workflows  |

Example:

```text id="6m2xqc"
Search result returned in 50ms instead of 2 seconds
```

Latency strongly impacts perceived application quality.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: throughput, scalability, distributed-systems

Why is throughput critical for internet-scale systems?

<!-- ANSWER -->
Large-scale systems process:
- millions of requests
- streaming events
- concurrent users

Problem:

```text
Low throughput creates bottlenecks under high traffic
```

Examples:

* overloaded APIs
* queue buildup
* dropped requests

Benefits of high throughput:

| Benefit                      | Explanation                     |
| ---------------------------- | ------------------------------- |
| Better scalability           | Supports massive traffic        |
| Improved resource efficiency | More work per unit time         |
| Higher system capacity       | Increased concurrent processing |

Architecture:

```text id="6p1qxt"
Horizontal Scaling → Increased Throughput
```

Throughput determines system capacity at scale.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: throughput-vs-latency, performance-engineering, distributed-systems

Why do throughput and latency often conflict with each other?

<!-- ANSWER -->
Optimizing for throughput often involves:
- batching
- queueing
- parallel processing

Problem:

```text
Batching improves throughput but increases waiting time
```

Example:

```text id="5m2xqc"
Message broker batches requests for efficiency
```

Tradeoff:

| Optimized For   | Consequence                       |
| --------------- | --------------------------------- |
| Low latency     | Lower throughput efficiency       |
| High throughput | Higher individual request latency |

Distributed systems must balance:

* responsiveness
* scalability
* efficiency

Throughput and latency optimization often require different architectural strategies.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: queueing-theory, latency, overload

Why does system overload dramatically increase latency?

<!-- ANSWER -->
As traffic approaches system capacity:

```text
Requests begin waiting in queues
```

Problem:

* resource contention
* scheduling delays
* thread starvation

Queue buildup causes latency amplification.

Example:

```text id="clt6p5"
CPU utilization reaches 100% and request backlog grows rapidly
```

Effects:

| Effect             | Impact                  |
| ------------------ | ----------------------- |
| Queueing delay     | Increased response time |
| Timeout spikes     | Failed requests         |
| Cascading failures | Wider instability       |

Latency often increases nonlinearly near saturation points.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: tail-latency, distributed-systems, performance

Why is tail latency more important than average latency in distributed systems?

<!-- ANSWER -->
Average latency hides extreme slow requests.

Tail latency measures:
- p95
- p99
- worst-case response behavior

Problem:

```text
Few slow dependencies may dominate end-user experience
```

Example:

```text id="4q2xmc"
99% of requests fast, but 1% take several seconds
```

Consequences:

* degraded UX
* timeout propagation
* cascading slowdowns

Benefits of tail latency optimization:

| Benefit                         | Explanation                |
| ------------------------------- | -------------------------- |
| Better reliability              | Fewer extreme delays       |
| Improved consistency            | Predictable response times |
| Better distributed coordination | Reduced timeout chains     |

Tail latency dominates distributed system responsiveness.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: parallelism, throughput, concurrency

Why does parallelism improve throughput in distributed systems?

<!-- ANSWER -->
Sequential execution limits processing capacity.

Parallelism allows:
- simultaneous execution
- distributed workload handling
- multi-core utilization

Architecture:

```text id="4v8qpd"
Multiple Workers → Concurrent Request Processing
```

Benefits:

| Benefit                       | Explanation                    |
| ----------------------------- | ------------------------------ |
| Higher throughput             | More requests processed        |
| Better scalability            | Distributed workload execution |
| Improved hardware utilization | Multi-resource usage           |

Tradeoff:

| Tradeoff              | Explanation                |
| --------------------- | -------------------------- |
| Coordination overhead | Synchronization complexity |

Parallelism is fundamental for scalable throughput optimization.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: caching, latency, performance-engineering

Why does caching significantly reduce latency in distributed systems?

<!-- ANSWER -->
Fetching data from:
- databases
- remote services
- disk storage

introduces latency.

Caching stores frequently accessed data closer to computation.

Workflow:

```text id="6m3qpd"
Request → Cache Hit → Immediate Response
```

Benefits:

| Benefit            | Explanation                     |
| ------------------ | ------------------------------- |
| Faster responses   | Reduced network/database access |
| Lower backend load | Fewer expensive operations      |
| Better scalability | Reduced infrastructure pressure |

Examples:

* CDN caching
* Redis
* in-memory application caches

Caching is one of the most effective latency optimization techniques.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: observability, slos, performance-monitoring

Why is observability critical for monitoring throughput and latency?

<!-- ANSWER -->
Performance bottlenecks emerge across:
- networks
- databases
- APIs
- queues
- compute layers

Problem:

```text
Performance degradation may remain invisible without monitoring
```

Key metrics:

* request latency
* p99 latency
* throughput rate
* queue depth
* saturation

Benefits:

| Benefit           | Explanation               |
| ----------------- | ------------------------- |
| Faster diagnosis  | Bottleneck identification |
| Capacity planning | Predict scaling limits    |
| SLA/SLO tracking  | Reliability measurement   |

Example:

```text id="1q8vza"
Sudden throughput spike increases p99 latency dramatically
```

Performance engineering requires strong observability systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: throughput, latency, trade-offs, system-design

What are the major trade-offs between throughput and latency in distributed systems?

<!-- ANSWER -->
High-performance systems must balance:
- responsiveness
- scalability
- resource efficiency

Advantages of throughput optimization:

| Advantage | Explanation |
|---|---|
| Better scalability | Handles larger workloads |
| Improved infrastructure efficiency | More work per resource |

Advantages of latency optimization:

| Advantage | Explanation |
|---|---|
| Faster user experience | Lower response times |
| Better inter-service coordination | Reduced timeout propagation |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Batching improves throughput | Increases latency |
| Parallelism boosts throughput | Adds coordination complexity |
| Aggressive caching lowers latency | Risks stale data |

Example:

```text id="7v2xpd"
Large batch processing improves throughput but delays individual requests
```

System design fundamentally balances:

* latency
* throughput
* scalability
* consistency

<!-- END -->