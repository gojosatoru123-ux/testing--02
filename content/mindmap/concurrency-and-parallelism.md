---
title: Concurrency and Parallelism
articleSlug: concurrency-and-parallelism
---

# Concurrency and Parallelism

## Core Idea

* Multiple simultaneous users
* Efficient task handling
* Responsive backend systems
* High-load scalability

## Fundamental Concepts

### Concurrency

* Multiple task progress
* Single-core compatible
* Task switching
* Efficiency focused
* Non-blocking workflow

### Parallelism

* Simultaneous execution
* Multi-core execution
* Speed focused
* Hardware dependent
* True simultaneous work

### Key Difference

* Concurrency → dealing tasks
* Parallelism → doing tasks
* Efficiency vs speed
* Structure vs execution

## Why Concurrency Matters

### Sequential Processing Problems

* Idle CPU
* Waiting requests
* Slow throughput
* User delays
* Resource waste

### Common Waiting Operations

* Database queries
* API requests
* File reads
* Cache lookups
* Network communication

### I/O-Bound Reality

* Mostly waiting time
* Minimal CPU work
* External latency bottleneck
* Network dependency
* Disk dependency

## CPU vs I/O

### CPU Operations

* Millions instructions/ms
* Extremely fast
* Computation focused

### I/O Operations

* Slow external systems
* Network delays
* Disk latency
* Remote service waits

### Backend Characteristics

* Mostly I/O-bound
* Waiting dominant
* Concurrency critical

## Concurrency Example

### Single-Core Execution

* Request switching
* Wait handling
* Context transitions
* Shared CPU time

### Workflow

* Request starts
* DB query waits
* Switch another task
* Resume later

## Parallelism Example

### Multi-Core Execution

* Multiple simultaneous tasks
* Dedicated CPU cores
* Independent execution

### Benefits

* Faster computation
* Heavy task processing
* Reduced execution time

## Workload Types

### I/O-Bound Tasks

* Database operations
* File handling
* API communication
* Logging systems
* Cache access

### CPU-Bound Tasks

* Encryption
* Video encoding
* Image processing
* Compression
* ML inference

## Concurrency Models

### OS Threads

#### Architecture

* One request/thread
* OS-managed threads
* Blocking operations

#### Advantages

* Simple mental model
* True parallelism
* Mature ecosystem

#### Problems

* High memory usage
* Expensive context switching
* Scalability limits

### Event Loop Model

#### Characteristics

* Single-threaded runtime
* Async task scheduling
* Callback driven
* Non-blocking I/O

#### Used By

* Node.js
* JavaScript runtimes

#### Benefits

* Massive concurrency
* Low memory usage
* Efficient I/O handling

#### Dangers

* Event loop blocking
* CPU-heavy freezes
* Single-thread bottleneck

### Goroutines / Virtual Threads

#### Runtime Scheduling

* Lightweight tasks
* Runtime-managed scheduling
* Many-to-few mapping

#### Used By

* Go
* Java virtual threads
* Kotlin coroutines

#### Benefits

* Tiny memory overhead
* Fast task switching
* Simple concurrent code

## Shared State Problems

### Race Conditions

* Simultaneous modifications
* Unpredictable results
* Data inconsistency

### Lost Update Problem

* Shared counter issue
* Concurrent writes
* Invalid final state

### Async Race Conditions

* Await interruptions
* State inconsistency
* Parallel request conflicts

## Race Condition Solutions

### Locks / Mutexes

* Single access control
* Protected critical sections

### Atomic Operations

* Hardware-level updates
* Safe modifications

### Transactions

* Database consistency
* Rollback support

### Message Queues

* Serialized processing
* Ordered execution

### Immutability

* No shared mutation
* Safer concurrency

## Choosing Right Model

### Best for I/O-Bound

* Event loops
* Async/await
* Goroutines
* Virtual threads

### Best for CPU-Bound

* Thread pools
* Worker processes
* Parallel execution
* GPU acceleration

## Hybrid Architectures

### Common Pattern

* Async API servers
* Parallel background workers
* Queue-based pipelines

### Example Tasks

* Email processing
* Video transcoding
* Analytics jobs
* Image rendering

## Backend Scalability Principles

### Concurrency Goals

* Maximize responsiveness
* Avoid idle CPU
* Efficient waiting

### Parallelism Goals

* Faster computation
* Core utilization
* Heavy task acceleration

## Key Takeaways

### Concurrency

* Handles many tasks
* Efficient waiting
* Great for APIs
* Ideal for I/O

### Parallelism

* Multiple simultaneous execution
* Best for computation
* Uses multi-core CPUs

### Modern Backend Insight

* Mostly I/O-bound
* Concurrency more important
* Parallelism for heavy compute
* Combined architectures common

## Final Insight

* Complementary concepts
* Not competing approaches
* Efficiency + speed
* Smart architectural balance
