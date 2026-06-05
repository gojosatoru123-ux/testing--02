---
title: Throughput and Latency
articleSlug: throughput-and-latency
---

# Throughput and Latency

## Core Concepts

### Latency

* Request response time
* Single request duration
* End to end delay
* User perceived speed

### Throughput

* Requests per second
* Work per unit time
* System processing capacity
* Total operations handled

## Highway Analogy

### Cars Per Hour

* Traffic volume
* Road capacity
* Vehicle flow rate
* Throughput concept

### Travel Time

* Journey duration
* Start to destination
* Individual trip time
* Latency concept

## Latency Components

### Network Latency

* Data travel time
* Cross region delay
* Packet transmission
* Internet routing delay

### Queue Latency

* Waiting in queue
* Server backlog
* Request congestion
* Load waiting delay

### Processing Latency

* Server computation
* Business logic execution
* Application processing
* CPU work duration

### Disk Latency

* Storage read delay
* Storage write delay
* HDD access time
* SSD access time

### Serialization Latency

* Data format conversion
* Encoding decoding
* JSON transformation
* Protocol processing

## Latency Types

### Network Delay

* Node communication delay
* Inter service latency
* Internet propagation delay
* Cross region latency

### Storage Delay

* Disk read latency
* Disk write latency
* Storage seek time
* Persistence delay

### Queue Delay

* Request backlog
* Worker waiting time
* Processing slot wait
* Resource contention delay

## Latency Measurement

### Average Latency

* Mean response time
* Overall latency value
* Aggregated timing

### Percentile Metrics

#### P50

* Median latency
* Half requests faster

#### P90

* Ninety percent faster
* High performance threshold

#### P95

* Tail latency start
* Performance degradation indicator

#### P99

* Extreme slow requests
* Tail latency problem

### Tail Latency

* Slowest request group
* Rare high delays
* Performance spikes
* System bottleneck indicator

## Throughput Measurement

### Request Rate

* Requests per second
* API throughput metric
* Web server capacity

### Transaction Rate

* Database transactions
* Financial system metric
* Data operation volume

### Message Rate

* Queue message throughput
* Event streaming speed
* Messaging system capacity

### Data Throughput

* MB per second
* Data pipeline rate
* File transfer speed

## Throughput Visualization

### Request Flow

* Incoming request stream
* Processing pipeline
* Response output flow
* System workload

## Latency vs Throughput

### Latency Focus

* Individual request speed
* User experience impact
* Response performance

### Throughput Focus

* Total workload capacity
* System scalability
* Request volume processing

## Queue Effect

### Arrival Rate Increase

* Incoming request surge
* Traffic growth
* Load spike

### Queue Formation

* Requests waiting
* Worker saturation
* Resource contention

### Latency Growth

* Waiting time increase
* Slow responses
* System congestion

## Little Law Relationship

### Formula

* L equals lambda W

### Requests In System

* Active processing requests
* Queued requests

### Throughput Factor

* Request arrival rate
* System processing rate

### Latency Factor

* Average processing time
* End to end delay

## System Load Phases

### Low Load

* Plenty capacity
* Low latency
* Stable operation

### Optimal Throughput

* Efficient utilization
* Balanced performance
* High request handling

### Saturation

* Resource exhaustion
* Queue buildup
* Latency spike

### System Collapse

* Timeouts increase
* Requests dropped
* Service failure

## Distributed System Latency

### Service Communication

* Microservice network calls
* Inter service latency
* RPC communication delay

### Multi Service Requests

* Chained service calls
* Dependency latency
* Request fanout

### Network Hops

* Additional routing delay
* Service gateway latency
* Load balancer traversal

## Tail Latency Amplification

### Microservice Chains

* Multiple service dependencies
* Sequential service calls

### Latency Compounding

* Each service delay added
* Slowest service impact

### Distributed Request Paths

* Multi hop processing
* Cascading latency growth

## Throughput Bottlenecks

### CPU Bottleneck

* Heavy computation load
* CPU saturation
* Thread exhaustion

### Disk Bottleneck

* Slow storage operations
* IO wait time
* Database persistence delay

### Network Bottleneck

* Bandwidth limitations
* Packet congestion
* Slow inter node communication

### Database Bottleneck

* Query contention
* Lock conflicts
* Transaction delays

### Thread Pool Bottleneck

* Limited worker threads
* Request backlog
* Processing queue growth

## Latency Optimization

### Caching

* Redis caching layer
* Memcached acceleration
* Database query avoidance

### CDN Usage

* Edge server delivery
* Geographic latency reduction
* Static content distribution

### Reduce Network Calls

* Fewer service dependencies
* Minimize remote calls
* Simplified architecture

### Data Locality

* Compute near data
* Same region services
* Reduced network delay

## Throughput Optimization

### Horizontal Scaling

* Add more servers
* Load balanced clusters
* Distributed processing nodes

### Asynchronous Processing

* Message queues
* Background workers
* Event driven systems

### Batch Processing

* Bulk operation execution
* Multiple tasks together
* Efficient processing cycles

### Database Sharding

* Split dataset partitions
* Distributed databases
* Parallel query handling

## System Design Tradeoffs

### Low Latency Systems

* Trading platforms
* Real time services
* Interactive applications

### High Throughput Systems

* Analytics platforms
* Data pipelines
* Streaming systems

### Balanced Systems

* Search engines
* Messaging platforms
* Web applications

## Monitoring Metrics

### Request Rate

* Traffic volume monitoring
* Throughput measurement

### Latency Metrics

* Response time percentiles
* Performance tracking

### Error Rate

* Failed request percentage
* Reliability indicator

### Resource Usage

* CPU utilization
* Memory consumption
* Disk IO monitoring

## Observability Tools

### Prometheus

* Metrics collection
* Time series monitoring

### Grafana

* Metrics visualization
* Performance dashboards

### Datadog

* Observability platform
* Infrastructure monitoring

### New Relic

* Application performance monitoring
* Distributed tracing

## Key Insights

### Latency Importance

* User experience quality
* Real time responsiveness

### Throughput Importance

* System scalability
* High traffic handling

### Core Relationship

* Throughput increase queues
* Queues increase latency
* Balanced system design
