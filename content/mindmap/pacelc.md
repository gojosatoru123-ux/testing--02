---
title: PACELC Theorem
articleSlug: pacelc
---

# PACELC Theorem

## Core Idea

* distributed system tradeoffs
* CAP extension model
* failure and normal tradeoffs
* latency awareness

## PACELC Rule

### Partition Case

* partition occurs
* choose availability
* or choose consistency

### Else Case

* normal operation
* choose latency
* or choose consistency

## PACELC Meaning

### P

* network partition
* node communication failure

### A

* system always responds
* stale data possible

### C

* same data everywhere
* strict data correctness

### E

* normal system state
* no partition

### L

* fast response time
* reduced waiting

## Partition Scenario

### Network Partition

* nodes isolated
* communication failure
* distributed split

### System Decision

* availability prioritized
* or consistency prioritized

## Availability Choice

### Behavior

* accept all requests
* return possible stale data
* maintain uptime

### Result

* temporary inconsistency
* continuous service

## Consistency Choice

### Behavior

* reject unsafe requests
* wait for replica agreement
* strict data accuracy

### Result

* some request failures
* consistent state maintained

## Normal Operation

### Tradeoff

* latency vs consistency
* response speed decision

## Low Latency Choice

### Behavior

* immediate responses
* asynchronous replication
* faster user experience

### Result

* temporary data divergence
* eventual consistency

## Strong Consistency Choice

### Behavior

* wait for replicas
* synchronous replication
* coordinated writes

### Result

* higher latency
* consistent data view

## Why PACELC Exists

### CAP Limitation

* focuses partition only
* ignores normal operation

### Real Systems

* partitions rare
* latency always present

## System Design Impact

### Global Systems

* cross region replication
* network delay impact
* latency increase

### User Experience

* slow responses harmful
* fast responses preferred

## PACELC Categories

### PA EL

* availability during partition
* low latency normally

### PA EC

* availability during partition
* consistency normally

### PC EC

* consistency during partition
* consistency normally

### PC EL

* consistency during partition
* low latency normally

## Database Examples

### PA EL Systems

* Cassandra architecture
* Dynamo style systems
* eventual consistency

### PC EC Systems

* Spanner style databases
* consensus replication
* strong consistency

### PA EC Systems

* configurable systems
* replica coordination

## Consistency Concepts

### Strong Consistency

* single correct value
* synchronized replicas

### Eventual Consistency

* replicas converge later
* temporary differences

## Latency Sources

### Network Delay

* cross region distance
* packet travel time

### Replication Coordination

* waiting for acknowledgements
* consensus overhead

### Distributed Protocols

* leader coordination
* quorum confirmation

## Design Strategies

### Quorum Reads

* partial replica agreement
* balance consistency latency

### Leader Replication

* single write leader
* replica synchronization

### Eventual Replication

* async background replication
* faster writes

### Read Replicas

* distributed read scaling
* reduced response time

## Architecture Example

### Global Regions

* US region
* Europe region
* Asia region

### Replication Links

* cross region communication
* global data synchronization

## Application Example

### Social Media Feed

* post stored primary
* replicas updated later
* fast response priority

## Key Benefits

### System Understanding

* realistic system model
* design tradeoff clarity

### Architecture Decisions

* consistency tolerance
* latency expectations
* availability goals

## Summary

### PACELC Principle

* partition tradeoff
* normal operation tradeoff

### Key Balance

* consistency
* availability
* latency
