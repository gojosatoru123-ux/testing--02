---
title:  Caching
articleSlug: caching
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: caching, system-design, performance

What is caching in system design?

<!-- ANSWER -->
Caching is the process of storing frequently accessed data temporarily for faster retrieval.

Instead of repeatedly fetching data from slow systems:

```text
Database
Disk
External APIs
```

applications retrieve it from a faster cache layer.

Example architecture:

```text
Client → Cache → Database
```

Benefits of caching:

| Benefit             | Purpose             |
| ------------------- | ------------------- |
| Faster responses    | Reduced latency     |
| Lower database load | Fewer queries       |
| Better scalability  | Handle more traffic |

Common cached data:

* user sessions
* API responses
* database query results
* static assets

Caching is one of the most important performance optimization techniques in distributed systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: cache-hit, cache-miss, system-design

What is the difference between a cache hit and a cache miss?

<!-- ANSWER -->
A cache hit occurs when requested data exists in the cache.

A cache miss occurs when data is absent and must be fetched from the original source.

Example flow:

```text
Request → Cache
           ├── Hit → Return Cached Data
           └── Miss → Fetch From Database
```

Comparison:

| Term       | Meaning             |
| ---------- | ------------------- |
| Cache Hit  | Data found in cache |
| Cache Miss | Data not found      |

Example:

```text id="4m8qza"
Cache Hit:
User profile already cached
```

```text id="6m2xqc"
Cache Miss:
Database query required
```

High cache hit rates improve:

* performance
* scalability
* response times

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: redis, memcached, caching

What are common caching systems used in backend architectures?

<!-- ANSWER -->
Caching systems store temporary data in fast-access memory.

Popular caching technologies:

| System | Characteristics |
|---|---|
| Redis | In-memory, feature-rich |
| Memcached | Lightweight key-value cache |
| CDN | Global content caching |

Example Redis usage:

```text id="6p1qxt"
SET user:42 "Alex"
```

Common caching use cases:

* sessions
* API responses
* database query caching
* rate limiting

Why in-memory caching is fast:

```text id="7m9vza"
RAM is much faster than disk storage.
```

Redis is one of the most widely used caching systems in modern architectures.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: cache-aside, caching-patterns, system-design

What is the Cache-Aside pattern?

<!-- ANSWER -->
Cache-Aside is a caching strategy where applications first check the cache before querying the database.

Flow:

```text
Request → Cache
           ├── Hit → Return Data
           └── Miss → Database → Update Cache
```

Example process:

1. check cache
2. if missing, query database
3. store result in cache
4. return response

Benefits:

| Benefit                | Purpose                        |
| ---------------------- | ------------------------------ |
| Reduced database load  | Cached responses               |
| Simpler implementation | Application-controlled caching |

Potential issue:

```text id="5m2xqc"
Stale cache data
```

Cache-Aside is one of the most common caching patterns in backend systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: ttl, cache-expiration, backend

What is TTL in caching systems?

<!-- ANSWER -->
TTL (Time To Live) defines how long cached data remains valid before expiration.

Example:

```text id="clt6p5"
TTL = 3600 seconds
```

After expiration:

* cache entry is removed
* data must be fetched again

Example Redis command:

```text id="2v7qwr"
SET user:42 "Alex" EX 3600
```

Benefits of TTL:

* automatic cache cleanup
* reduced stale data
* memory management

TTL is commonly used for:

* sessions
* API responses
* temporary tokens

Choosing proper TTL values is important for balancing:

* freshness
* performance
* consistency

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: distributed-cache, scalability, system-design

Why are distributed caches used in large-scale systems?

<!-- ANSWER -->
Distributed caches spread cached data across multiple servers to handle large traffic and datasets.

Single-server cache limitations:
- memory constraints
- scalability bottlenecks
- single point of failure

Distributed cache architecture:

```text id="4q2xmc"
Application → Cache Cluster → Database
```

Benefits:

| Benefit            | Explanation          |
| ------------------ | -------------------- |
| Horizontal scaling | Add more cache nodes |
| High availability  | Redundancy           |
| Better throughput  | Parallel processing  |

Examples:

* Redis Cluster
* Memcached clusters

Distributed caching is essential for:

* large SaaS platforms
* social media systems
* high-traffic APIs

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cache-invalidation, system-design, consistency

Why is cache invalidation difficult?

<!-- ANSWER -->
Cache invalidation means updating or removing stale cached data when the original data changes.

Problem example:

```text
Database Updated
Cache Still Old
```

This causes:

```text id="4v8qpd"
Stale Data
```

Common invalidation strategies:

| Strategy            | Description              |
| ------------------- | ------------------------ |
| TTL Expiration      | Auto-expire entries      |
| Write-through       | Update cache immediately |
| Manual invalidation | Explicit cache removal   |

Example:

```text id="5w2qwc"
DELETE cache:user:42
```

Challenges:

* synchronization complexity
* distributed systems coordination
* eventual consistency issues

Famous quote:

```text id="1x7vza"
"There are only two hard things in Computer Science:
cache invalidation and naming things."
```

Cache invalidation is a major system design challenge.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: write-through, write-back, caching-strategies

What is the difference between write-through and write-back caching?

<!-- ANSWER -->
Write-through caching updates both the cache and database immediately.

Write-back caching updates the cache first and writes to the database later.

Comparison:

| Write-Through | Write-Back |
|---|---|
| Safer consistency | Faster writes |
| Higher latency | Risk of data loss |
| Immediate persistence | Delayed persistence |

Write-through flow:

```text id="6m3qpd"
Application → Cache + Database
```

Write-back flow:

```text id="2p8qza"
Application → Cache → Database Later
```

Write-back advantages:

* lower write latency
* reduced database load

Write-back risks:

* data loss during crashes
* synchronization complexity

Different systems choose strategies based on performance vs consistency requirements.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cdn, edge-caching, web-performance

What is CDN caching?

<!-- ANSWER -->
A CDN (Content Delivery Network) caches content at geographically distributed edge servers closer to users.

Example architecture:

```text
User → CDN Edge Server → Origin Server
```

Cached CDN content:

* images
* videos
* CSS files
* JavaScript bundles

Benefits:

| Benefit                | Explanation                |
| ---------------------- | -------------------------- |
| Lower latency          | Nearby edge servers        |
| Reduced origin load    | Fewer backend requests     |
| Faster global delivery | Distributed infrastructure |

Example CDN providers:

| Provider       | Service      |
| -------------- | ------------ |
| Cloudflare     | Edge caching |
| Akamai         | Global CDN   |
| AWS CloudFront | AWS CDN      |

CDN caching is essential for modern high-performance web applications.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cache-consistency, distributed-systems, backend

What are cache consistency problems in distributed systems?

<!-- ANSWER -->
Cache consistency problems occur when cached data differs from the source of truth.

Example:

```text
Database Updated
One Cache Updated
Another Cache Still Old
```

Potential issues:

* stale reads
* inconsistent user experiences
* incorrect business logic

Common consistency strategies:

| Strategy             | Description               |
| -------------------- | ------------------------- |
| TTL expiration       | Temporary inconsistency   |
| Pub/Sub invalidation | Broadcast cache updates   |
| Write-through        | Immediate synchronization |

Example distributed issue:

```text id="7v2xpd"
User changes profile photo
Old photo still appears on another server
```

Tradeoff:

| Consistency          | Performance |
| -------------------- | ----------- |
| Strong consistency   | Slower      |
| Eventual consistency | Faster      |

Cache consistency is a major challenge in distributed architectures.

<!-- END -->