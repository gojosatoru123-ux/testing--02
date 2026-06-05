---
title:  DNS
articleSlug: dns
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Hard
tags: dns, distributed-systems, internet-infrastructure

Why is DNS considered one of the foundational systems of the internet?

<!-- ANSWER -->
Humans prefer readable domain names.

Machines communicate using:
- IP addresses
- low-level networking identifiers

DNS translates:

```text
Domain Name → IP Address
```

Example:

```text id="4m8qza"
example.com → 192.168.1.10
```

Without DNS:

```text
Users would need to remember raw IP addresses
```

DNS enables scalable and human-friendly internet communication.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: recursive-resolver, dns-resolution, distributed-systems

Why do recursive DNS resolvers improve internet performance significantly?

<!-- ANSWER -->
Recursive resolvers perform DNS lookups on behalf of clients.

Workflow:

```text id="6m2xqc"
Client → Recursive Resolver → Root → TLD → Authoritative Server
```

Benefits:

| Benefit                   | Explanation                   |
| ------------------------- | ----------------------------- |
| Reduced client complexity | Resolver handles lookup chain |
| DNS caching               | Faster repeated lookups       |
| Lower global DNS traffic  | Shared cached responses       |

Example:

```text id="uoeaqr"
Popular domains resolved directly from cache
```

Recursive resolvers dramatically reduce internet-wide lookup latency.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: dns-caching, scalability, distributed-systems

Why is DNS caching critical for internet scalability?

<!-- ANSWER -->
Without caching:

```text
Every DNS query would traverse the full lookup hierarchy
```

Problems:

* excessive latency
* overloaded DNS infrastructure
* increased global traffic

Caching stores DNS responses temporarily.

Benefits:

| Benefit                   | Explanation                   |
| ------------------------- | ----------------------------- |
| Faster lookups            | Reduced resolution latency    |
| Lower infrastructure load | Fewer authoritative queries   |
| Better scalability        | Reduced internet-wide traffic |

Example:

```text id="6p1qxt"
Browser reuses cached IP for repeated requests
```

DNS caching is essential for scalable internet performance.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: ttl, dns-caching, consistency

Why does DNS TTL involve a trade-off between scalability and consistency?

<!-- ANSWER -->
TTL stands for:

```text
Time To Live
```

It determines how long DNS responses remain cached.

Tradeoff:

| Low TTL            | High TTL                    |
| ------------------ | --------------------------- |
| Faster updates     | Better scalability          |
| More DNS traffic   | Lower latency               |
| Better consistency | Reduced infrastructure load |

Problem:

```text id="5m2xqc"
Stale DNS entries may persist after IP changes
```

Example:

```text id="k7t39d"
CDN migration delayed by cached DNS records
```

TTL tuning balances:

* propagation speed
* caching efficiency
* operational stability

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: authoritative-dns, distributed-systems, internet-architecture

Why are authoritative DNS servers critical in the DNS hierarchy?

<!-- ANSWER -->
Authoritative servers contain:

```text
Official DNS records for a domain
```

Examples:

* A records
* MX records
* CNAME records

Workflow:

```text id="clt6p5"
Resolver queries authoritative server for final answer
```

Benefits:

| Benefit                  | Explanation                        |
| ------------------------ | ---------------------------------- |
| Source of truth          | Official domain mappings           |
| Domain ownership control | Managed DNS records                |
| Reliable resolution      | Consistent authoritative responses |

Example:

```text id="6r7e2d"
example.com DNS managed by Route53 authoritative servers
```

Authoritative DNS servers are the backbone of domain ownership and resolution.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: dns-load-balancing, traffic-routing, scalability

Why is DNS commonly used for global traffic load balancing?

<!-- ANSWER -->
DNS can return different IP addresses based on:
- geography
- latency
- availability
- traffic policies

Architecture:

```text id="4q2xmc"
User DNS Query → Closest Regional Endpoint
```

Benefits:

| Benefit              | Explanation                   |
| -------------------- | ----------------------------- |
| Geographic routing   | Lower latency                 |
| High availability    | Failover support              |
| Traffic distribution | Load balancing across regions |

Examples:

* CDN routing
* multi-region deployments
* disaster recovery systems

DNS-based routing enables globally distributed architectures.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: dns-propagation, distributed-systems, eventual-consistency

Why is DNS propagation inherently eventually consistent?

<!-- ANSWER -->
DNS records are heavily cached across:
- browsers
- ISPs
- recursive resolvers
- operating systems

Problem:

```text
Old DNS records may remain cached temporarily
```

Example:

```text id="4v8qpd"
Some users reach old server after DNS migration
```

Reasons:

* TTL delays
* distributed cache layers
* resolver refresh timing

Tradeoff:

| Benefit            | Cost                |
| ------------------ | ------------------- |
| Better scalability | Delayed consistency |
| Reduced latency    | Slower propagation  |

DNS prioritizes scalability over immediate global consistency.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: dns-security, dns-spoofing, cybersecurity

Why is DNS considered a major attack surface in internet infrastructure?

<!-- ANSWER -->
DNS controls traffic routing across the internet.

Attack types:
- DNS spoofing
- cache poisoning
- amplification attacks
- hijacking

Problem:

```text
Manipulated DNS responses redirect users maliciously
```

Example:

```text id="6m3qpd"
Banking website resolves to attacker-controlled IP
```

Mitigation techniques:

| Technique       | Purpose                            |
| --------------- | ---------------------------------- |
| DNSSEC          | Response authenticity verification |
| Rate limiting   | DDoS mitigation                    |
| Anycast routing | Distributed resilience             |

DNS security is critical for trustworthy internet communication.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: anycast, dns, distributed-networking

Why do large DNS providers heavily rely on Anycast networking?

<!-- ANSWER -->
Anycast allows:

```text
Multiple servers share same IP address
```

Traffic automatically routes to nearest available server.

Benefits:

| Benefit                | Explanation                    |
| ---------------------- | ------------------------------ |
| Lower latency          | Nearby DNS resolution          |
| Better fault tolerance | Automatic failover             |
| DDoS resilience        | Distributed traffic absorption |

Architecture:

```text id="1q8vza"
Single DNS IP → Multiple Global Data Centers
```

Examples:

* Cloudflare DNS
* Google Public DNS
* Route53

Anycast is foundational for globally scalable DNS infrastructure.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: dns, trade-offs, system-design

What are the major trade-offs when designing DNS infrastructure?

<!-- ANSWER -->
DNS infrastructure balances:
- scalability
- consistency
- latency
- reliability

Advantages:

| Advantage | Explanation |
|---|---|
| Massive scalability | Distributed caching |
| Global reach | Worldwide resolution |
| Traffic routing flexibility | Geo-based load balancing |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Eventual consistency | Delayed propagation |
| Cache staleness | Outdated records |
| Security exposure | Spoofing and poisoning risks |
| Operational complexity | Global distributed infrastructure |

Example:

```text id="7v2xpd"
Low TTL improves agility but increases DNS query load
```

DNS system design fundamentally balances:

* performance
* consistency
* resilience
* operational scalability

<!-- END -->