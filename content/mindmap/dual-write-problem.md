---
title: Dual Write Problem
articleSlug: dual-write-problem
---

# Dual Write Problem

## Core Idea

* Two system writes
* Independent systems
* Partial failure risk
* Data inconsistency

## Common Scenarios

* Database and cache
* Database and queue
* Database and search index
* Service to service writes

## Basic Flow

* Write system A
* Write system B
* Both must succeed

## Failure Scenario

* Database write success
* Queue publish failure
* Missing system events

## Cache Scenario

* Database update success
* Cache update failure
* Users read stale data

## Root Cause

* No atomic cross system transaction
* Independent system guarantees
* Different failure modes

## Distributed Components

* Databases
* Message queues
* Cache systems
* Search indexes
* External services

## Traditional Transactions

* ACID database transactions
* Single database scope
* Atomic database writes
* No cross system support

## Impact of Dual Writes

* Lost events
* Stale cache data
* Broken workflows
* Service inconsistency
* Data divergence

## Transactional Outbox Pattern

### Core Idea

* Store events in database
* Single atomic transaction
* Publish events asynchronously

### Flow

* Write business data
* Insert outbox event
* Commit transaction
* Publisher sends event

### Components

* Application service
* Database
* Outbox table
* Event publisher
* Message queue

### Benefits

* Atomic database write
* Reliable event delivery
* Retry failed events
* No distributed transactions

### Limitations

* Extra database table
* Background polling worker
* Slight event delay

## Change Data Capture

### Core Idea

* Stream database changes
* Database single write
* External event generation

### Mechanism

* Read database logs
* Detect committed changes
* Publish change events

### Data Sources

* Write ahead logs
* Binary logs
* Transaction logs

### Benefits

* Single source truth
* Transparent event generation
* Reliable change streaming

### Limitations

* Infrastructure complexity
* Operational overhead
* Event propagation delay

## Event Sourcing

### Core Idea

* Events as source truth
* Store all domain events
* Rebuild system state

### Event Examples

* Order created
* Payment processed
* Order shipped
* Order cancelled

### Architecture

* Command handler
* Event store
* Event bus
* Projection services

### Benefits

* No dual writes
* Complete audit history
* Replayable events

### Limitations

* Complex architecture
* Event schema management
* Higher learning curve

## Distributed Transactions

### Two Phase Commit

* Global transaction coordinator
* Prepare phase
* Commit phase

### Limitations

* Slow coordination
* Blocking participants
* Coordinator failure risk

### Industry Usage

* Rare in large systems
* High latency overhead
* Operational complexity

## Idempotent Consumers

* Handle duplicate events
* Safe event retries
* Ignore processed events
* Maintain processing state

## Detecting Inconsistency

* Reconciliation jobs
* Data audit processes
* Event replay systems
* Repair pipelines

## Key Takeaways

* Dual writes cause inconsistency
* Independent systems fail separately
* Avoid direct multiple writes
* Use reliable event patterns
* Prefer eventual consistency architectures
