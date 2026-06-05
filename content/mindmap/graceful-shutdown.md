---
title: Graceful Shutdown
articleSlug: graceful-shutdown
---

# Graceful Shutdown

## Core Concept

### Definition

* Safe server stopping
* Controlled termination
* Request completion

### Main Goals

* Prevent data loss
* Avoid corruption
* Maintain consistency
* Safe restarts

### Shutdown Steps

* Stop new requests
* Finish active work
* Cleanup resources
* Exit safely

### Important During

* Deployments
* Container restarts
* Scaling events
* Infrastructure upgrades
* Failovers

## Problems Without Graceful Shutdown

### Data Problems

* Partial writes
* Lost transactions
* Corrupted records
* Duplicate payments

### User Problems

* Broken sessions
* Failed responses
* Interrupted uploads
* Incomplete operations

### System Problems

* Open connections
* Memory leaks
* File locks
* Resource exhaustion


## Server Lifecycle

### Startup Phase

* Initialize resources
* Connect databases
* Start listeners

### Running Phase

* Handle requests
* Process workloads
* Maintain connections

### Shutdown Phase

* Receive signal
* Stop accepting traffic
* Finish requests
* Cleanup resources
* Terminate process


## Operating System Signals

### Signal Purpose

* Process communication
* Shutdown requests
* Lifecycle control

### Common Signals

#### SIGTERM

* Polite shutdown
* Graceful termination
* Production standard

#### SIGINT

* Ctrl + C
* Manual interruption
* Local development

#### SIGKILL

* Forced termination
* Immediate stop
* No cleanup


## SIGTERM

### Purpose

* Graceful stopping
* Controlled exit
* Cleanup opportunity

### Common Senders

* Docker
* Kubernetes
* PM2
* Systemd
* Deployment pipelines

### Application Actions

* Stop new requests
* Finish transactions
* Cleanup resources
* Exit cleanly


## SIGINT

### Trigger

* Ctrl + C
* Manual shutdown

### Common Usage

* Local development
* Developer testing

### Behavior

* Similar to SIGTERM
* Graceful handling


## SIGKILL

### Characteristics

* Uncatchable
* Immediate termination
* No cleanup possible

### Consequences

* Dropped requests
* Broken transactions
* Open files
* Memory leaks

### Analogy

* Power cable removal

## Shutdown Workflow

### Step 1

* Receive signal
* Begin shutdown

### Step 2

* Stop new traffic
* Reject new requests

### Step 3

* Finish active requests
* Complete transactions

### Step 4

* Cleanup resources
* Close connections

### Step 5

* Exit process


## Restaurant Analogy

### Stop Seating

* Reject new customers
* Stop HTTP requests

### Let Diners Finish

* Complete active work
* Finish transactions

### Clean Restaurant

* Release resources
* Close connections

### Turn Off Lights

* Process termination


## Active Requests

### Examples

* Payment processing
* File uploads
* Database writes
* API computations

### Why Wait

* Prevent corruption
* Ensure consistency
* Avoid failures

### Tracking Methods

* Request counters
* Connection monitoring
* Completion events


## Resource Cleanup

### Database Connections

* Prevent leaks
* Release sessions

### Network Sockets

* Avoid port exhaustion
* Close listeners

### File Handles

* Prevent locks
* Safe file closure

### Cache Systems

* Disconnect caches
* Clear stale entries

### Worker Threads

* Prevent memory leaks
* Safe thread exit

## Reverse Cleanup Order

### Principle

* Reverse acquisition order

### Correct Sequence

* Close cache
* Stop server
* Close database

### Why Important

* Dependency safety
* Prevent failures

### Common Mistake

* Closing DB early

## Shutdown Timeout

### Purpose

* Prevent infinite waiting
* Safe forced exit

### Typical Duration

* 30 seconds

### Timeout Actions

* Finish requests
* Cleanup resources
* Force termination

### After Expiry

* SIGKILL sent
* Forced shutdown


## Node.js Shutdown

### Core Components

* Signal handlers
* Server closing
* Cleanup logic
* Timeout handling

### Important APIs

* process.on
* server.close
* process.exit

### Handled Signals

* SIGTERM
* SIGINT


## Active Request Tracking

### Variables

* Active requests
* Shutdown state

### During Shutdown

* Reject new traffic
* Complete ongoing work

### Benefits

* Safe completion
* Controlled draining
* Reliable exits


## Kubernetes Shutdown

### Shutdown Flow

* Send SIGTERM
* Remove traffic
* Finish requests
* Exit pod

### Important Setting

* terminationGracePeriodSeconds

### Kubernetes Goals

* Zero downtime
* Safe deployments
* Controlled restarts


## Common Mistakes

### Ignoring SIGTERM

* Production failures
* Abrupt exits

### Immediate Exit

* Dropped requests
* Lost operations

### Missing Timeout

* Stuck shutdowns
* Deployment delays

### Early Resource Closure

* Broken dependencies
* Failed requests


## Best Practices

### Handle Signals

* SIGTERM support
* SIGINT support

### Stop New Requests

* Prevent overload
* Controlled draining

### Track Requests

* Safe completion
* Accurate shutdown

### Add Timeout

* Avoid hanging
* Forced fallback

### Cleanup Resources

* Prevent leaks
* Stable restarts

### Test Shutdown

* Deployment safety
* Production readiness

## Reliability Benefits

### User Safety

* Completed operations
* Stable experience

### Data Integrity

* Consistent transactions
* Prevent corruption

### Infrastructure Safety

* Reliable restarts
* Predictable deployments

### Operational Stability

* Smooth scaling
* Safer failovers


## Real World Scenarios

### Deployments

* Rolling updates
* Zero downtime

### Auto Scaling

* Pod termination
* Instance replacement

### Failovers

* Controlled migration
* Traffic redirection

### Maintenance

* Server upgrades
* Infrastructure changes


## Final Takeaways

### Core Principle

* Finish before exiting

### Main Objectives

* Reliability
* Consistency
* Predictability

### Key Features

* Signal handling
* Request draining
* Resource cleanup
* Timeout enforcement

### Professional Systems

* Graceful restarts
* Safe deployments
* Reliable shutdowns
* Stable infrastructure
