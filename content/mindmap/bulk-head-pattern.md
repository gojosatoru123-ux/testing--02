---
title: Bulkhead Pattern
articleSlug: bulk-head-pattern
---

# Bulkhead Pattern

## Overview

* Resilience pattern
* Failure isolation
* Resource compartmentalization
* Prevent cascading failures
* Protect critical services

## Core Idea

* Separate resources
* Limit blast radius
* Isolate failures
* Keep system running
* Reduce contention

## Real-World Analogy

* Ship compartments
* Watertight sections
* Flood stays local
* Rest remains safe

## Problem

* Shared resources
* Thread exhaustion
* Memory pressure
* CPU contention
* Bandwidth saturation

## Resource Contention

* One service dominates
* Others slow down
* Shared pool overload
* System-wide latency
* Partial outage

## Example Workloads

* Payments
* Search
* Orders
* Recommendations
* Analytics

## Bulkhead Solution

* Separate pools
* Dedicated limits
* Independent execution
* Isolated failures
* Controlled degradation

## Bulkhead Types

### Thread Pool Isolation

* Separate thread pools
* Service-specific limits
* Prevent thread starvation

### Connection Pool Isolation

* Dedicated DB pools
* Avoid connection leaks
* Protect critical traffic

### Process Isolation

* Separate processes
* Stronger fault boundaries
* Crash containment

### Container Isolation

* Dedicated containers
* Resource limits
* Infrastructure separation

### Resource Quotas

* CPU limits
* Memory caps
* Bandwidth control

## Architecture Idea

* Payment pool
* Recommendation pool
* Order pool
* Independent compartments
* No shared overload

## Microservices Fit

* Natural isolation
* Independent scaling
* Per-service resources
* Failure containment
* Better resilience

## Bulkhead vs Circuit Breaker

* Bulkhead: resource isolation
* Circuit breaker: failure stop
* Bulkhead protects pools
* Circuit breaker protects calls

## Use Cases

* Payment systems
* Video streaming
* Search systems
* Notification services
* Background jobs

## Example Outcome

* Slow recommendations
* Payments stay healthy
* Orders stay responsive
* Core system survives

## Benefits

* Failure isolation
* Better reliability
* Controlled degradation
* Safer shared systems
* Reduced blast radius

## Trade-offs

* More configuration
* More resource planning
* Potential fragmentation
* Extra operational cost

## Monitoring

* Pool utilization
* Queue length
* Latency spikes
* Failure rates
* Saturation alerts

## Best Practices

* Protect critical paths
* Tune pool sizes
* Use dedicated limits
* Combine with retries
* Add timeouts
* Use circuit breakers

## Key Takeaway

* Divide resources
* Contain failures
* Protect core flows
* Keep system responsive
