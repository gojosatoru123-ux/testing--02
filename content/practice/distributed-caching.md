---
title:  Distributed Caching
articleSlug: distributed-caching
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Hard
tags: distributed-cache, scalability, performance-engineering

Why are distributed caches critical in large-scale backend systems?

<!-- ANSWER -->
Direct database access for every request creates:
- high latency
- database overload
- scalability bottlenecks

Distributed caches store frequently accessed data in memory.

Architecture:

```text
Client → Cache → Database
```

Benefits:

| Benefit             | Explanation                    |
| ------------------- | ------------------------------ |
| Reduced latency     | Memory access faster than disk |
| Lower database load | Fewer backend queries          |
| Better scalability  | Absorb massive traffic         |
| Improved throughput | Faster request handling        |

Example:

```text id="4m8qza"
Frequently accessed user profiles cached in Redis
```

Distributed caching is foundational for internet-scale performance optimization.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cache-aside, distributed-cache, database-scaling

Why is the Cache-Aside pattern commonly used in distributed caching systems?

<!-- ANSWER -->
Cache-Aside loads data into cache only when needed.

Workflow:

```text
Request → Cache Miss → Database → Populate Cache
```

Benefits:

| Benefit                | Explanation                     |
| ---------------------- | ------------------------------- |
| Lazy loading           | Cache stores only active data   |
| Simpler implementation | Application controls caching    |
| Reduced memory usage   | Avoid unnecessary cache entries |

Example:

```text id="6m2xqc"
User profile fetched from DB only on first request
```

Tradeoff:

| Tradeoff                   | Explanation                   |
| -------------------------- | ----------------------------- |
| Initial cache miss latency | First request slower          |
| Stale data risk            | Cache invalidation complexity |

Cache-Aside is widely used because of its simplicity and scalability.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cache-invalidation, distributed-systems, consistency

Why is cache invalidation considered one of the hardest problems in distributed systems?

<!-- ANSWER -->
Caches duplicate data outside the source of truth.

Problem:

```text
Database changes but cache still contains old data
```

Consequences:

* stale reads
* inconsistent behavior
* user confusion

Example:

```text id="6p1qxt"
Updated product price not reflected immediately
```

Challenges:

| Challenge         | Impact                    |
| ----------------- | ------------------------- |
| Distributed nodes | Multiple cache copies     |
| Event ordering    | Invalidations arrive late |
| Race conditions   | Old data overwrites new   |

Common solutions:

* TTL expiration
* write-through caching
* pub/sub invalidation

Cache invalidation fundamentally involves distributed consistency tradeoffs.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: redis, partitioning, distributed-cache

Why is partitioning essential for scaling distributed cache systems like Redis?

<!-- ANSWER -->
Single-node caches eventually hit:
- memory limits
- network limits
- CPU bottlenecks

Partitioning distributes keys across multiple cache nodes.

Architecture:

```text id="5m2xqc"
Key Hash → Assigned Cache Shard
```

Benefits:

| Benefit                | Explanation                 |
| ---------------------- | --------------------------- |
| Horizontal scalability | Add more cache nodes        |
| Higher throughput      | Distributed requests        |
| Better memory capacity | Aggregate storage increases |

Tradeoff:

| Tradeoff               | Explanation                 |
| ---------------------- | --------------------------- |
| Cross-shard complexity | Multi-key operations harder |
| Rebalancing overhead   | Data migration required     |

Partitioning is fundamental for large-scale distributed caching.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cache-consistency, distributed-cache, eventual-consistency

Why do distributed cache systems often tolerate eventual consistency?

<!-- ANSWER -->
Strong cache consistency requires:
- synchronization
- distributed coordination
- invalidation guarantees

These reduce scalability.

Distributed caches often prioritize:
- low latency
- high availability
- massive throughput

Example:

```text id="clt6p5"
Temporary stale profile data acceptable for few seconds
```

Benefits:

| Benefit             | Explanation                      |
| ------------------- | -------------------------------- |
| Faster reads        | Reduced coordination             |
| Better scalability  | Independent cache nodes          |
| Higher availability | Continue serving during failures |

Tradeoff:

```text id="2v7qwr"
Clients may temporarily see outdated data
```

Eventual consistency is a practical tradeoff in distributed caching architectures.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cache-eviction, lru, memory-management

Why are cache eviction policies critical in distributed caching systems?

<!-- ANSWER -->
Caches have limited memory capacity.

When cache fills up:

```text
Some entries must be removed
```

Common eviction strategies:

| Policy    | Behavior                     |
| --------- | ---------------------------- |
| LRU       | Remove least recently used   |
| LFU       | Remove least frequently used |
| FIFO      | Remove oldest inserted       |
| TTL-based | Expire after duration        |

Example:

```text id="4q2xmc"
Rarely accessed sessions evicted first
```

Poor eviction policies cause:

* lower hit rates
* increased database pressure
* unstable performance

Eviction strategy directly impacts cache efficiency.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cache-stampede, distributed-systems, backend-performance

Why is cache stampede dangerous in high-traffic systems?

<!-- ANSWER -->
Cache stampede occurs when:
- popular cache entries expire
- many requests simultaneously hit backend

Problem:

```text
Thousands of requests bypass cache together
```

Consequences:

* database overload
* cascading failures
* latency spikes

Example:

```text id="4v8qpd"
Popular homepage cache expires during traffic peak
```

Mitigation strategies:

| Strategy            | Purpose                        |
| ------------------- | ------------------------------ |
| Request coalescing  | Single refresh request         |
| Early refresh       | Renew before expiration        |
| Distributed locking | Prevent duplicate regeneration |

Cache stampedes are major reliability risks at scale.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: write-through, write-back, distributed-cache

Why do write-through and write-back caching strategies have different consistency trade-offs?

<!-- ANSWER -->
Write-through updates:
- cache
- database

simultaneously.

Workflow:

```text id="6m3qpd"
Write → Cache + Database Together
```

Benefits:

* stronger consistency
* fewer stale reads

Write-back caching delays database writes.

Workflow:

```text
Write → Cache First → Database Later
```

Benefits:

* lower latency
* higher throughput

Tradeoff comparison:

| Strategy      | Advantage          | Risk           |
| ------------- | ------------------ | -------------- |
| Write-through | Better consistency | Higher latency |
| Write-back    | Faster writes      | Data loss risk |

Choice depends on workload consistency requirements.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cdn, edge-caching, distributed-systems

Why are CDNs considered globally distributed caching systems?

<!-- ANSWER -->
CDNs cache content closer to users geographically.

Architecture:

```text id="1q8vza"
User → Edge Cache → Origin Server
```

Cached content:

* images
* videos
* static assets
* API responses

Benefits:

| Benefit              | Explanation               |
| -------------------- | ------------------------- |
| Reduced latency      | Nearby edge delivery      |
| Lower origin traffic | Fewer backend requests    |
| Better scalability   | Global traffic absorption |

Examples:

* Cloudflare
* Akamai
* Fastly

CDNs are effectively internet-scale distributed caching layers.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: distributed-cache, trade-offs, system-design

What are the major trade-offs when designing distributed caching systems?

<!-- ANSWER -->
Distributed caching improves performance but introduces complexity.

Advantages:

| Advantage | Explanation |
|---|---|
| Faster responses | Memory-speed access |
| Lower DB load | Reduced backend pressure |
| Better scalability | Traffic absorption |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Cache inconsistency | Stale data risk |
| Invalidation complexity | Distributed synchronization |
| Memory costs | RAM is expensive |
| Operational overhead | Cluster management complexity |

Example:

```text id="7v2xpd"
Aggressive caching may serve outdated financial data
```

Distributed caching fundamentally balances:

* consistency
* latency
* scalability
* operational simplicity

<!-- END -->