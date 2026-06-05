---
title:  Network Protocols
articleSlug: network-protocols
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Medium
tags: tcp-vs-udp, network-protocols, hld

Why do databases and payment systems typically prefer TCP over UDP?

<!-- ANSWER -->
Databases and payment systems require:
- reliable delivery
- ordered packets
- retransmissions
- connection state management

TCP provides:

| Feature | Why Important |
|---|---|
| Reliability | Prevent data loss |
| Ordered delivery | Preserve transaction sequence |
| Retransmission | Recover lost packets |
| Flow control | Prevent receiver overload |

UDP problems in such systems:

```text
Packet loss → inconsistent transactions
```

Example:

```text
Bank transfer acknowledgment lost
```

TCP trades higher latency for reliability guarantees, which is critical for financial and transactional systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: http2, multiplexing, backend-performance

How does HTTP/2 solve the Head-of-Line blocking problem of HTTP/1.1?

<!-- ANSWER -->
HTTP/1.1 processes requests sequentially per connection.

Problem:

```text
One slow request blocks subsequent requests
```

HTTP/2 introduces:

```text
Multiplexed streams over a single TCP connection
```

Benefits:

| Feature               | Impact                     |
| --------------------- | -------------------------- |
| Multiplexing          | Parallel request handling  |
| Header compression    | Reduced bandwidth          |
| Stream prioritization | Better resource scheduling |

Architecture:

```text
Single TCP Connection
 ├── Stream 1
 ├── Stream 2
 └── Stream 3
```

This significantly improves page loading performance for modern web applications.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: websocket, realtime-systems, distributed-systems

Why are WebSockets preferred over HTTP polling for large-scale real-time systems?

<!-- ANSWER -->
HTTP polling repeatedly opens connections to check for updates.

Problems:
- high connection overhead
- unnecessary requests
- increased latency

WebSockets provide:

```text
Persistent bidirectional connection
```

Benefits:

| Benefit           | Explanation                 |
| ----------------- | --------------------------- |
| Lower latency     | Real-time communication     |
| Reduced overhead  | No repeated HTTP handshakes |
| Efficient scaling | Fewer redundant requests    |

Example systems:

* chat applications
* multiplayer gaming
* stock trading dashboards

Architecture:

```text
Client ⇄ Persistent WebSocket ⇄ Server
```

WebSockets significantly reduce infrastructure cost for high-frequency real-time updates.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: grpc, protobuf, microservices

Why do many microservice architectures prefer gRPC over REST?

<!-- ANSWER -->
gRPC uses:
- HTTP/2
- Protocol Buffers
- binary serialization

Advantages over REST:

| Feature | gRPC | REST |
|---|---|---|
| Serialization | Binary (protobuf) | JSON |
| Performance | Faster | Slower |
| Streaming | Native support | Limited |
| Contract definition | Strong schema | Flexible |

Benefits:

```text
Lower latency + smaller payloads
```

Example:

```text
Internal service-to-service communication
```

gRPC is especially useful for:

* low-latency systems
* internal APIs
* high-throughput microservices

REST still remains better for:

* public APIs
* browser compatibility
* human-readable interfaces

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: dns, scalability, distributed-systems

How does DNS contribute to scalability and high availability in distributed systems?

<!-- ANSWER -->
DNS acts as the internet's distributed routing layer.

Capabilities:

| Capability | Purpose |
|---|---|
| Load distribution | Route traffic across servers |
| Failover | Redirect during outages |
| Geo-routing | Route users to nearest region |
| Caching | Reduce lookup overhead |

Example:

```text
api.example.com → nearest regional server
```

Architecture:

```text
User → DNS Resolver → Closest Data Center
```

DNS-based traffic management is fundamental for:

* CDNs
* global SaaS platforms
* multi-region deployments

Without DNS scalability techniques, global latency would increase significantly.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: tls, security, backend-security

Why is TLS termination commonly handled at load balancers instead of application servers?

<!-- ANSWER -->
TLS encryption/decryption is computationally expensive.

Offloading TLS to load balancers provides:

| Benefit | Explanation |
|---|---|
| Reduced backend CPU usage | App servers avoid crypto overhead |
| Centralized certificate management | Easier operations |
| Better scalability | Optimized TLS hardware/software |
| Simplified backend communication | Internal traffic may remain plaintext |

Architecture:

```text
Client → TLS Load Balancer → Backend Servers
```

Potential tradeoff:

```text
Internal traffic may require separate encryption
```

Large-scale systems often combine:

* TLS termination
* mTLS internally
* service mesh encryption

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: quic, http3, network-latency

Why does HTTP/3 use QUIC instead of TCP?

<!-- ANSWER -->
TCP suffers from transport-level Head-of-Line blocking.

Problem:

```text
Lost packet blocks all streams
```

QUIC solves this using:

* UDP-based transport
* independent streams
* built-in TLS

Benefits:

| Benefit                   | Explanation               |
| ------------------------- | ------------------------- |
| Faster connection setup   | Reduced handshake latency |
| Better mobile performance | Improved packet recovery  |
| Independent streams       | Reduced blocking          |
| Integrated encryption     | TLS built into protocol   |

Architecture:

```text
HTTP/3 → QUIC → UDP
```

QUIC significantly improves performance for:

* mobile networks
* lossy connections
* high-latency internet paths

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: kafka, messaging-protocols, event-driven-architecture

Why do distributed messaging systems prefer binary protocols over text-based protocols?

<!-- ANSWER -->
Binary protocols minimize payload size and parsing overhead.

Advantages:

| Benefit | Explanation |
|---|---|
| Smaller messages | Reduced bandwidth |
| Faster parsing | Lower CPU usage |
| Better throughput | Higher message rates |
| Lower latency | Faster serialization/deserialization |

Example:

```text
Kafka binary protocol
```

Text-based protocols like JSON introduce:

* larger payloads
* slower parsing
* higher memory allocation

Binary protocols are critical for:

* high-throughput queues
* streaming systems
* event-driven architectures

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: network-failures, distributed-systems, hld

Why must distributed systems assume partial network failures instead of complete failures?

<!-- ANSWER -->
In distributed systems, nodes may remain alive while communication fails.

Example:

```text
Server A cannot reach Server B
But both servers are still operational
```

Problems:

* split brain
* stale reads
* inconsistent state

Implications:

| Challenge            | Explanation                  |
| -------------------- | ---------------------------- |
| Timeout handling     | Detect unreachable nodes     |
| Retry logic          | Recover transient failures   |
| Consensus complexity | Coordinate distributed state |

Protocols like:

* Raft
* Paxos
* gossip protocols

are designed specifically for unreliable network conditions.

Partial failures are a core assumption in distributed system design.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: service-mesh, mtls, microservices-security

Why do service meshes use mTLS for internal service-to-service communication?

<!-- ANSWER -->
Microservices communicate across networks where traffic interception is possible.

mTLS provides:
- mutual authentication
- encryption
- identity verification

Architecture:

```text
Service A ⇄ mTLS ⇄ Service B
```

Benefits:

| Benefit                      | Explanation                  |
| ---------------------------- | ---------------------------- |
| Zero-trust security          | Every service authenticated  |
| Encrypted traffic            | Prevent packet sniffing      |
| Identity-based authorization | Secure service communication |

Service meshes like:

* Istio
* Linkerd

automatically inject sidecar proxies that enforce mTLS without changing application code.

This greatly improves internal security in large distributed systems.

<!-- END -->