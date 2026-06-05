---
title: Load Balancers
articleSlug: load-balancers
---

# Load Balancers

## Traffic Distribution

* distribute incoming requests
* balance load across servers
* prevent server overload
* improve system reliability

### Core Objectives

* high availability
* fault tolerance
* scalability
* performance optimization

## System Bottleneck Problem

### Single Server Architecture

* all users hit one server
* CPU saturation
* memory exhaustion
* request timeouts

### Consequences

* slow response time
* system crashes
* poor user experience
* lost revenue

### Solution

* introduce traffic manager
* distribute requests
* scale horizontally

## Load Balancer Concept

### Definition

* traffic distribution system
* sits between clients and servers
* routes requests to backend servers

### Basic Flow

* user request arrives
* load balancer evaluates servers
* selects appropriate server
* forwards request
* returns response to user

### Infrastructure Position

* between internet and application servers
* entry point to backend systems

## Load Balancer Responsibilities

### Traffic Management

* request distribution
* server selection
* load balancing algorithms

### Reliability

* health monitoring
* failure detection
* traffic rerouting

### Performance

* connection optimization
* latency reduction
* efficient resource usage

## High Level Architecture

### Core Components

* clients
* load balancer
* backend servers

### Request Flow

* client request
* load balancer receives traffic
* routing decision made
* request forwarded to backend
* response returned

## Load Balancer Types

### Hardware Load Balancers

* dedicated networking appliances
* specialized traffic processing
* enterprise level performance

#### Advantages

* extremely high throughput
* hardware optimized
* reliable networking performance

#### Disadvantages

* expensive infrastructure
* limited flexibility
* difficult scaling

### Software Load Balancers

* application running on servers
* configurable routing logic
* cloud native solutions

#### Advantages

* cost effective
* flexible configuration
* container compatible
* cloud friendly

#### Disadvantages

* consumes server resources
* dependent on host infrastructure

## Network Layer Load Balancing

### Layer 4 Load Balancing

#### Characteristics

* transport layer operation
* TCP and UDP routing
* based on IP and ports

#### Routing Criteria

* destination IP
* source IP
* TCP ports
* connection state

#### Advantages

* extremely fast
* minimal processing overhead
* low latency routing

#### Limitations

* cannot inspect request payload
* limited routing intelligence

### Layer 7 Load Balancing

#### Characteristics

* application layer routing
* understands HTTP protocol
* content aware routing

#### Routing Criteria

* URL paths
* headers
* cookies
* request methods

#### Advantages

* intelligent request routing
* advanced traffic management
* flexible application logic

#### Limitations

* higher processing overhead
* additional latency

## Load Balancing Algorithms

### Round Robin

#### Mechanism

* sequential request distribution
* cyclic server selection

#### Benefits

* simple implementation
* evenly distributes traffic

#### Limitations

* assumes equal server capacity
* ignores server load

### Weighted Round Robin

#### Mechanism

* servers assigned weights
* higher capacity servers receive more traffic

#### Use Cases

* heterogeneous server infrastructure
* different hardware capacities

### Least Connections

#### Mechanism

* selects server with fewest active connections
* dynamic load based routing

#### Suitable For

* long lived connections
* streaming services
* websocket connections

### IP Hash

#### Mechanism

* hash based server selection
* deterministic routing

#### Benefit

* consistent user routing
* session persistence

## Session Persistence

### Sticky Sessions

#### Concept

* same client routed to same server
* session maintained locally

#### Use Cases

* login sessions
* shopping carts
* user session memory

#### Limitations

* uneven traffic distribution
* reduced scalability

### Better Alternative

#### External Session Storage

* distributed cache
* centralized session storage
* shared state systems

#### Technologies

* Redis
* distributed cache clusters
* database session storage

## Health Monitoring

### Health Checks

#### Purpose

* detect unhealthy servers
* remove failing nodes
* ensure reliable routing

#### Check Types

* TCP port checks
* HTTP endpoint checks
* deep application checks

### Failure Handling

#### Failure Detection

* periodic health checks
* response verification

#### Traffic Control

* unhealthy server removed
* traffic rerouted to healthy nodes

## SSL Termination

### Encryption Handling

#### Traditional Approach

* each server decrypts HTTPS
* high CPU usage

#### Load Balancer Approach

* decrypt traffic at load balancer
* backend receives HTTP

### Benefits

* reduced server CPU usage
* centralized certificate management
* simplified backend services

## Reverse Proxy Role

### Reverse Proxy Features

* request routing
* response caching
* compression
* authentication

### Relationship With Load Balancer

* many tools perform both roles
* traffic distribution plus request processing

## Global Load Balancing

### Multi Region Infrastructure

#### Objective

* route users to closest region
* minimize latency
* ensure regional redundancy

### Benefits

* faster response times
* improved user experience
* regional failover

### Geographic Routing

#### Traffic Decisions Based On

* user location
* network latency
* region health

## DNS Based Load Balancing

### Mechanism

* DNS returns different IPs
* clients connect to nearest data center

### Advantages

* global traffic distribution
* simple implementation
* reduced latency

## CDN Integration

### CDN Role

* cache static content
* serve assets from edge locations
* reduce origin traffic

### System Flow

* user request to CDN
* cached content served from edge
* dynamic traffic forwarded to load balancer

## Auto Scaling Integration

### Dynamic Infrastructure

#### Traffic Spike Handling

* additional servers created
* load balancer updates server pool

### Scaling Benefits

* automatic capacity expansion
* improved resilience
* efficient resource usage

## Deployment Strategies

### Blue Green Deployment

#### Concept

* two identical environments
* production version
* new release version

#### Traffic Switching

* load balancer redirects traffic
* zero downtime release

### Canary Deployment

#### Concept

* gradual rollout
* small percentage of users

#### Benefits

* detect issues early
* controlled risk deployment

## Load Balancer High Availability

### Single Point of Failure Risk

* load balancer failure affects system

### Redundant Load Balancers

* multiple load balancers deployed
* failover mechanisms enabled

### Failover Mechanisms

* active passive configuration
* active active configuration

## Popular Load Balancer Tools

### Open Source Solutions

* nginx
* haproxy
* envoy
* traefik

### Cloud Managed Solutions

* aws elastic load balancer
* google cloud load balancer
* azure load balancer

## Real World Systems

### Streaming Platforms

* distribute millions of requests
* scale during peak traffic

### Cloud Providers

* global routing infrastructure
* regional failover systems

### E Commerce Platforms

* handle traffic spikes
* ensure checkout reliability

## Common Problems

### Uneven Load Distribution

* poor algorithm selection
* server capacity differences

### Slow Failure Detection

* delayed health checks
* slow failover response

### SSL Bottlenecks

* heavy encryption workload

### Infrastructure Failure

* load balancer becomes bottleneck

## Best Practices

### Architecture Recommendations

* deploy multiple load balancers
* enable health checks
* use autoscaling infrastructure

### Performance Optimization

* monitor request latency
* optimize routing rules
* use CDN for static content

### Scalability Strategy

* avoid sticky sessions
* use shared session storage
* design stateless services

## Key Concepts

### Horizontal Scaling

* add more servers
* distribute traffic evenly

### High Availability

* maintain uptime
* handle failures gracefully

### Traffic Engineering

* intelligent request routing
* performance optimization

### Distributed Systems Foundation

* load balancing as core infrastructure
* essential for internet scale systems
