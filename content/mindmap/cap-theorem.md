---
title: CAP Theorem
articleSlug: cap-theorem
---

# CAP Theorem

## Overview

* Distributed system trade-off
* Consistency
* Availability
* Partition tolerance
* Network failure reality

## Core Idea

* Cannot guarantee all three
* Partition forces trade-off
* Choose consistency or availability
* P is unavoidable
* Real systems must decide

## Why It Exists

* Networks are unreliable
* Delays happen
* Packet loss happens
* Nodes crash
* Partitions happen

## Consistency

* All nodes same data
* Latest write visible
* Reads return fresh value
* No stale data

### Example

* Balance update
* Old value rejected
* Latest value returned

## Availability

* Every request gets response
* No request refusal
* May return stale data
* System stays responsive

### Example

* Social feed response
* Older data allowed
* Request still answered

## Partition Tolerance

* System survives network split
* Nodes cannot communicate
* Service continues operating
* Partition is unavoidable

### Example

* Data center outage
* Router failure
* Link broken
* Node isolation

## CAP Triangle

* Consistency
* Availability
* Partition tolerance
* Trade-off under partition

## System Types

### CP Systems

* Consistency plus partition tolerance
* May reject requests
* May delay responses
* Never inconsistent

### AP Systems

* Availability plus partition tolerance
* Always responds
* May be stale
* Eventually consistent

## CP Example Systems

* Strong consistency databases
* ZooKeeper
* Majority-write MongoDB
* Financial systems

## AP Example Systems

* Cassandra
* DynamoDB
* Riak
* Social platforms

## Real-World Analogy

* Bank branches
* Network disconnect
* Branches diverge
* Choose blocking
* Or choose availability

## CAP vs ACID

* CAP for distributed systems
* ACID for transactions
* Different problem space
* Different guarantees

## Common Misconceptions

* Not choose any two
* Partition always matters
* Not strictly CP/AP
* Tunable consistency exists

## Design Considerations

* App requirements first
* Banking needs consistency
* Social apps need availability
* Messaging may balance both

## Best Practices

* Understand trade-offs
* Use replication carefully
* Monitor lag
* Monitor health
* Monitor latency

## Key Takeaway

* Partition is unavoidable
* Consistency and availability conflict
* System must choose
* Design by need
