---
title: Consistent Hashing
articleSlug: consistent-hashing
---

# Consistent Hashing

## Overview

* Distributed data placement
* Dynamic node scaling
* Minimal key movement
* Circular hash space
* Distributed systems core

## Problem Context

* Distributed caches
* Distributed databases
* CDN routing
* Load balancers
* Key value stores

## Core Question

* Which server stores key
* Efficient data placement
* Scalable distribution
* Stable mapping

## Traditional Hashing

### Method

* Hash key modulo servers
* server equals hash mod N
* Direct server mapping

### Example Mapping

* user123 server C
* user456 server B
* user789 server C

### Major Issue

* Server addition disruption
* Server removal disruption
* Massive key redistribution
* Cache miss storms
* Network traffic spike

## Consistent Hashing Idea

* Hash servers and keys
* Circular hash ring
* Clockwise key assignment
* Stable distribution

## Hash Ring

### Structure

* Circular hash space
* Range zero to max
* Wrap around topology

### Node Placement

* Server hashed position
* Random ring positions
* Deterministic mapping

### Key Placement

* Hash key position
* Move clockwise
* First server selected

## Key Assignment Process

* Compute key hash
* Locate ring position
* Scan clockwise
* Select nearest server

## Example Distribution

* user1 server B
* user2 server D
* user3 server C

## Server Join

### Scenario

* New node inserted
* Added ring position

### Impact

* Limited key movement
* Localized redistribution
* System stability preserved

### Key Movement Rule

* Keys between neighbors
* Move to new server

## Server Failure

### Failure Event

* Node becomes unavailable
* Ring entry removed

### Reassignment

* Keys move clockwise
* Next server ownership

### Impact Scope

* Limited key movement
* Fault tolerance support

## Real World Analogy

* Circular pizza table
* Seats represent servers
* Pizza slices represent data
* Neighbor slices shift

## Load Imbalance Problem

### Cause

* Random server placement
* Uneven ring segments
* Unequal key distribution

### Result

* Hot servers
* Underutilized nodes
* Performance imbalance

## Virtual Nodes

### Concept

* Multiple ring entries
* One server many nodes
* Distributed placement

### Example Nodes

* A1 A2 A3
* B1 B2 B3
* C1 C2 C3

### Distribution Effect

* Smaller partitions
* Balanced key spread
* Reduced hotspots

## Benefits of Virtual Nodes

* Improved load balance
* Flexible scaling
* Better fault isolation
* Granular partitioning

## Key Advantages

### Minimal Rebalancing

* Limited key movement
* Stable distribution

### Scalability

* Easy node addition
* Easy node removal

### Efficient Distribution

* Uniform key placement
* Balanced workload

### Fault Tolerance

* Node failure recovery
* Localized impact

## Systems Using Consistent Hashing

* Amazon Dynamo
* Apache Cassandra
* Riak storage
* Memcached clusters
* CDN routing systems

## Distributed Cache Flow

### Request Flow

* Client sends request
* Key hashed
* Ring position located
* Request routed node

## Key Lookup Steps

* Client request received
* Key hashed position
* Ring traversal clockwise
* Server identified

## Time Complexity

### Node Addition

* Virtual nodes insertion
* Sorted ring update

### Node Removal

* Ring entry deletion
* Rebalance partitions

### Key Lookup

* Binary search ring
* Logarithmic lookup

## Use Cases

### Distributed Caching

* Cache sharding
* Key distribution

### NoSQL Databases

* Data partitioning
* Scalable storage

### Load Balancing

* Request routing
* Service distribution

### Microservices Routing

* Service instance mapping
* Consistent routing

### CDN Routing

* Edge node selection
* Request locality

## Limitations

### Implementation Complexity

* Ring management logic
* Metadata maintenance

### Metadata Overhead

* Node hash tracking
* Virtual node mapping

### Rebalancing Cost

* Key transfer overhead
* Network usage

### Hash Function Dependency

* Poor hashing imbalance
* Collision risks

## Mental Model

* Circular server map
* Keys walk clockwise
* First server owns key
* Stable distributed system
