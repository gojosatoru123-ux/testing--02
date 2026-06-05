---
title: Back-of-the-Envelope Estimation
articleSlug: back-of-the-envelope-estimation
---

# Back-of-the-Envelope Estimation

## Concept

* Quick scale estimation
* Rough system calculations
* Approximate infrastructure sizing
* Early design analysis

### Purpose

* Understand system scale
* Estimate infrastructure needs
* Guide architecture decisions
* Identify system constraints

## Why Estimation Matters

* Avoid overprovisioning
* Prevent system undercapacity
* Guide architecture choices
* Enable quick feasibility checks

### Key Questions

* Required servers count
* Storage requirements
* Network bandwidth needs
* Requests per second

## Estimation Principles

### Reasonable Assumptions

* Unknown values assumed
* Realistic user estimates
* Typical workload patterns

#### Example Assumptions

* Total users estimate
* Daily active percentage
* Actions per user
* Data size per object

### Use Round Numbers

* Simplify calculations
* Powers of ten usage
* Avoid exact precision

### Order of Magnitude

* Focus scale difference
* Rough system sizing
* Ignore minor variations

## Useful Reference Numbers

### Storage Units

* Kilobyte thousand bytes
* Megabyte million bytes
* Gigabyte billion bytes
* Terabyte trillion bytes

### Time Conversions

* Minute sixty seconds
* Hour thirty six hundred
* Day eighty six thousand
* Year thirty one million

### Latency Numbers

* CPU cache nanoseconds
* RAM hundred nanoseconds
* SSD hundred microseconds
* Datacenter network milliseconds
* Cross region network latency

## Estimation Workflow

### Step One Users

* Total users estimate
* Daily active users
* Active percentage assumption

### Step Two Traffic

* User actions daily
* Writes per second
* Reads per second

### Step Three Storage

* Data size per record
* Records per day
* Storage growth yearly

### Step Four Bandwidth

* Response size estimate
* Requests per second
* Network throughput

### Step Five Infrastructure

* Server capacity estimation
* Database scaling needs
* Cache capacity planning
* CDN requirements

## URL Shortener Example

### User Estimation

* Hundred million users
* Ten percent active
* Ten million active users

### Write Traffic

* Two links per user
* Twenty million writes daily
* Few hundred writes second

### Read Traffic

* Hundred accesses per link
* Billions redirects daily
* Tens thousands reads second

### Storage Estimation

* Short url identifier
* Original url storage
* Metadata storage
* Few hundred bytes record

### Storage Growth

* Several gigabytes daily
* Terabytes yearly growth

### Bandwidth Estimation

* Small response payload
* Redirect response size
* Network throughput calculation

## Common Estimation Types

### Traffic Estimation

* Requests per second
* Daily active users
* Peak traffic spikes

### Storage Estimation

* Data per object
* Objects per day
* Long term growth

### Bandwidth Estimation

* Response payload size
* Total request volume
* Network capacity needs

### Compute Estimation

* CPU utilization
* Server request capacity
* Horizontal scaling

## Distributed System Usage

### Large Platform Examples

* Video streaming platforms
* Ride sharing systems
* Photo sharing networks
* Social media services

### Infrastructure Planning

* Storage clusters
* Compute clusters
* Network throughput
* Global infrastructure

## Common Mistakes

### Overcomplicated Math

* Excessive precision
* Complex calculations
* Slow estimation process

### Ignoring Peak Load

* Average traffic focus
* Traffic spike failures
* Capacity planning mistakes

### Ignoring Data Growth

* Long term storage
* Increasing dataset size
* Scaling limitations

## Best Practices

### Conservative Estimates

* Slight overestimation
* Capacity safety margins

### Document Assumptions

* User growth assumptions
* Data size assumptions
* Traffic pattern assumptions

### Validate With Metrics

* Monitor real usage
* Compare actual traffic
* Adjust infrastructure

## Key Takeaways

* Quick system estimation
* Order magnitude understanding
* Traffic storage bandwidth planning
* Early architecture guidance
