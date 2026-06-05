---
title: Rate Limiter
articleSlug: rate-limiter
---

# Rate Limiter

## Overview

* Traffic control mechanism
* Request frequency limit
* Protect system resources
* Prevent overload
* Ensure fair usage

## Purpose

* Prevent system overload
* Block abusive traffic
* Fair resource allocation
* Control infrastructure cost
* Maintain system stability

## Real World Analogy

* Highway toll booth
* Limited cars per minute
* Traffic regulation
* Prevent congestion

## Core Concepts

### Rate Limit

* Maximum request count
* Defined per window
* Example 100 per minute

### Time Window

* Counting duration
* Seconds window
* Minute window
* Hour window

### Identity Key

* User ID
* API key
* IP address
* Access token

## Policy Types

### User Based

* Per user limits
* Account protection
* Fair user usage

### IP Based

* Per IP limits
* Bot mitigation
* Network abuse control

### API Key Based

* Developer quotas
* Third party limits
* Application control

### Global Limits

* System wide limits
* Infrastructure protection
* Traffic ceiling

## Architecture Flow

### Basic Flow

* Client request arrives
* Rate limiter check
* Within limit allow
* Exceeded reject

### Response Handling

* Return 429 error
* Inform retry later
* Limit enforcement

## Algorithms

### Fixed Window Counter

* Fixed time window
* Counter resets
* Simple implementation

#### Advantages

* Easy implementation
* Low memory usage
* Fast computation

#### Problems

* Window boundary bursts
* Traffic spikes
* Unfair distribution

### Sliding Window Log

* Store request timestamps
* Remove expired entries
* Accurate counting

#### Advantages

* High accuracy
* True rolling window
* Fair request handling

#### Problems

* High memory usage
* Large timestamp storage
* Scaling challenges

### Sliding Window Counter

* Current window counter
* Previous window counter
* Weighted calculation

#### Benefits

* Memory efficient
* Balanced accuracy
* Scalable approach

### Token Bucket

* Token container model
* Token per request
* Refill over time

#### Behavior

* Burst allowed
* Sustained traffic limited
* Controlled request flow

#### Advantages

* Supports bursts
* Efficient memory
* Network friendly

### Leaky Bucket

* Queue based flow
* Constant drain rate
* Traffic smoothing

#### Behavior

* Fixed output rate
* Queue overflow drops
* Smooth processing

## Algorithm Comparison

### Fixed Window

* Burst support poor
* Accuracy low
* Memory low

### Sliding Log

* Burst support excellent
* Accuracy high
* Memory high

### Sliding Counter

* Burst support good
* Accuracy medium
* Memory medium

### Token Bucket

* Burst support excellent
* Accuracy high
* Memory low

### Leaky Bucket

* Smooth traffic output
* Accuracy medium
* Memory low

## Distributed Rate Limiting

### Problem

* Multiple servers exist
* Independent counters
* Limit bypass risk

### Example Scenario

* Ten API servers
* Each server limit
* Global limit broken

## Distributed Solution

### Shared Counter Storage

* Central counter store
* Shared limit tracking
* Global consistency

### Redis Based Limiter

* In memory datastore
* Atomic increment
* Shared counters

### Redis Operations

* Increment request count
* Expiration time window
* Fast atomic operations

## Distributed Architecture

### Client Layer

* External users
* Incoming requests
* High traffic volume

### API Servers

* Multiple service nodes
* Request processing
* Limit checks

### Shared Store

* Redis cluster
* Centralized counters
* Distributed coordination

## API Gateway Integration

### Gateway Layer

* Entry traffic control
* Central rate limiting
* Backend protection

### Flow

* Client request gateway
* Gateway limiter check
* Forward allowed requests
* Reject excess requests

## Multi Level Rate Limiting

### User Limit

* Per user quota
* Individual protection
* Fair usage

### IP Limit

* Network level control
* Bot protection
* Abuse prevention

### Global Limit

* Total request cap
* Infrastructure protection
* System safety

## Violation Handling

### Error Response

* HTTP 429 response
* Request rejected
* Retry later signal

### Response Headers

* Limit information
* Remaining quota
* Reset time indicator

## Rate Limiting vs Throttling

### Rate Limiting

* Reject extra requests
* Immediate denial
* Hard limit enforcement

### Throttling

* Slow request processing
* Controlled output rate
* Delay responses

## System Challenges

### Distributed Counters

* Cross server synchronization
* Consistency complexity
* Shared state management

### Clock Skew

* Time inconsistency
* Window misalignment
* Counting inaccuracies

### Hot Keys

* Popular user traffic
* Counter contention
* Storage bottleneck

### Performance Requirements

* Extremely fast checks
* Minimal latency
* High throughput

## Best Practices

### Algorithm Choice

* Prefer token bucket
* Burst support capability
* Balanced resource usage

### Distributed Counters

* Shared data store
* Consistent limits
* Cluster coordination

### Retry Control

* Add jitter delays
* Avoid synchronized retries
* Prevent request storms

### Monitoring

* Track limiter metrics
* Detect abuse patterns
* Observe traffic spikes

### Multi Layer Limits

* User limits
* IP limits
* Global limits

## Key Outcomes

* Protect system resources
* Prevent service overload
* Maintain fair access
* Block abusive traffic
* Improve reliability
