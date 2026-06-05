---
title: Circuit Breaker Pattern
articleSlug: circuit-breaker
---

# Circuit Breaker Pattern

## Overview

* Resilience pattern
* Stops failing calls
* Prevents cascading failures
* Protects system stability
* Manages dependency health

## Core Idea

* Monitor failures
* Open circuit
* Block requests
* Allow recovery tests
* Resume normal flow

## Problem

* Slow dependencies
* Repeated failures
* Thread exhaustion
* High latency
* System overload

## Real-World Analogy

* Electrical breaker
* Cut overload current
* Prevent damage
* Wait for recovery
* Restore flow

## Circuit States

### Closed

* Normal operation
* Requests allowed
* Failures monitored
* Threshold checked

### Open

* Requests blocked
* Fallback returned
* Failed dependency bypassed
* Resources protected

### Half-Open

* Limited test calls
* Check recovery
* Close if success
* Reopen if failure

## Failure Flow

* Request sent
* Dependency fails
* Retries accumulate
* Threads block
* Cascading failure

## Benefits

* Failure isolation
* Faster fallback
* Reduced load
* Better stability
* Graceful degradation

## Fallback Options

* Cached response
* Default value
* Error message
* Deferred processing
* Alternate path

## Common Use Cases

* Payment services
* Third-party APIs
* Notification systems
* Recommendation engines
* Remote databases

## Implementation Concerns

* Failure threshold
* Timeout values
* Cooldown period
* Health checks
* Recovery probe

## Best Practices

* Use timeouts
* Set thresholds carefully
* Monitor metrics
* Add fallbacks
* Limit retries

## Related Patterns

* Retry
* Bulkhead
* Timeout
* Fallback
* Rate limiting

## Common Tools

* Hystrix
* Resilience4j
* Istio
* Envoy

## Key Takeaway

* Stop repeated failures
* Protect resources
* Test recovery safely
* Keep system responsive
