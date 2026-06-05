---
title: Caching in Distributed Systems
articleSlug: caching-strategies
---

# Caching in Distributed Systems

## Overview

* Faster data access
* Reduced database load
* Higher throughput
* Lower latency
* Better scalability

## Why Caching Matters

* Millions of users
* Repeated requests
* Expensive database hits
* Faster memory access
* Lower infrastructure cost

## Core Idea

* Store frequent data
* Serve future requests faster
* Avoid repeated computation
* Reduce backend pressure
* Improve responsiveness

## Cache Benefits

* Reduced latency
* Reduced database load
* Higher throughput
* Cost reduction
* Better scalability

## Cache Workflow

* Check cache first
* Return cached data
* Fetch from database
* Store in cache
* Serve response

## Cache Terms

* Cache hit
* Cache miss
* Cache fill
* Cache invalidation

## Cache Layers

### Browser Cache

* Client-side storage
* Static assets
* Very fast access
* Fewer network calls

### CDN Cache

* Edge server cache
* Global content delivery
* Lower latency
* Less origin traffic

### Application Cache

* In-memory cache
* Fast lookups
* Local server storage
* No network hop

### Distributed Cache

* Shared cache cluster
* Multiple app servers
* Consistent shared access
* Horizontal scalability

### Database Cache

* Query result cache
* Database-side optimization
* Moderate speed
* Reduced repeated queries

## Eviction Policies

### LRU

* Least recently used
* Remove old access
* Common default
* Good general fit

### LFU

* Least frequently used
* Remove unpopular items
* Tracks access counts
* Better for hot data

### FIFO

* First in first out
* Remove oldest entry
* Simple policy
* Less optimal

### TTL

* Time to live
* Expire by age
* Good for freshness
* Common for dynamic data

## Caching Patterns

### Cache Aside

* Lazy loading
* App checks cache
* Miss loads database
* Stores result afterward

### Write Through

* Write cache and DB
* Strong consistency
* Slower writes
* Simple correctness

### Write Back

* Write cache first
* Async database flush
* Faster writes
* Risk of loss

### Write Around

* Write directly to DB
* Cache updated later
* Avoid write caching
* More cache misses

## Cache Invalidation

* Remove stale data
* TTL expiration
* Write invalidation
* Event-based invalidation
* Freshness control

## Cache Stampede

* Many misses at once
* Sudden DB overload
* Thundering herd
* Needs mitigation

### Mitigation

* Request coalescing
* Cache locking
* Staggered TTL
* Background refresh

## Choosing What to Cache

* Frequently read data
* Computation results
* Static data
* Expensive queries
* Aggregated metrics

## Poor Cache Candidates

* Rapidly changing data
* Rarely accessed data
* Large useless entries
* Highly volatile data

## Trade-offs

* Faster reads
* Hard invalidation
* Better scalability
* Consistency challenges
* Extra infrastructure

## Multi-Layer Cache

* Browser layer
* CDN layer
* App layer
* Distributed layer
* Database layer

## Key Takeaway

* Cache frequent data
* Reduce backend pressure
* Balance speed and freshness
* Design for consistency
* Use layered caching
