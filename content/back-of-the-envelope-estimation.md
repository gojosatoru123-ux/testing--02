---
title: Back-of-the-Envelope Estimation
description: A comprehensive guide to Back-of-the-Envelope Estimation in High Level Design (HLD), explaining how engineers quickly approximate system scale, storage, bandwidth, and infrastructure needs using simple calculations and assumptions.
category: High Level Design
order: 9
---

# Back-of-the-Envelope Estimation

When designing large-scale distributed systems, engineers often need to **estimate system requirements quickly** before diving into detailed architecture.

These estimations help answer questions like:

- How many **servers** will we need?
- How much **storage** is required?
- What is the expected **network bandwidth**?
- How many **requests per second** will the system handle?

Instead of building precise mathematical models, engineers perform **Back-of-the-Envelope Estimation**.

> Back-of-the-envelope estimation means making **quick, approximate calculations using simple assumptions** to understand the scale of a system.

The goal is **not perfect accuracy**, but **reasonable approximations** that guide architectural decisions.

---

# Why Back-of-the-Envelope Estimation Matters

Before designing a system, it is critical to understand the **scale of the problem**.

Without estimation:

- Infrastructure may be **overprovisioned** (wasting resources)
- Systems may be **underpowered** (leading to failures)
- Architecture choices may be **inappropriate for the scale**

### Example Scenario

Suppose we want to design a **photo sharing platform**.

Before building the architecture we must estimate:

| Metric | Question |
|------|-----------|
| Users | How many users will use the platform? |
| Traffic | How many requests per second? |
| Storage | How many images stored per day? |
| Bandwidth | How much data transfer occurs? |

Back-of-the-envelope estimation helps answer these questions **within minutes**.

---

# Key Principles of Estimation

Back-of-the-envelope estimation relies on several principles.

## 1 Reasonable Assumptions

We rarely know exact numbers, so we assume reasonable values.

Example assumptions:

| Parameter | Assumption |
|----------|------------|
| Daily users | 100 million |
| Active users | 10% of total |
| Photos per user per day | 2 |
| Image size | 3 MB |

Even if assumptions are not perfect, they provide **useful approximations**.

---

## 2 Use Round Numbers

Estimation works best with **powers of ten**.

Instead of:

```

1,237,893 users

```

Use:

```

~1 million users

```

This makes calculations easier and faster.

---

## 3 Focus on Order of Magnitude

In system design, the difference between:

- **10 servers**
- **1000 servers**

is much more important than the difference between:

- **101 servers**
- **120 servers**

Therefore estimations focus on **order of magnitude**, not precision.

---

# Useful Numbers to Remember

Engineers often memorize common approximations.

## Storage Units

| Unit | Value |
|----|------|
| 1 KB | 10³ bytes |
| 1 MB | 10⁶ bytes |
| 1 GB | 10⁹ bytes |
| 1 TB | 10¹² bytes |

---

## Time Conversions

| Time | Seconds |
|-----|---------|
| 1 minute | 60 |
| 1 hour | 3600 |
| 1 day | 86,400 |
| 1 year | ~31 million |

---

## Latency Numbers (Approximate)

These numbers help estimate network and storage delays.

| Operation | Latency |
|----------|---------|
| L1 Cache | ~1 ns |
| RAM | ~100 ns |
| SSD | ~100 µs |
| Network within datacenter | ~0.5 ms |
| Network across regions | ~100 ms |

---

# Example: Estimating a URL Shortener System

Imagine designing a service similar to :contentReference[oaicite:0]{index=0}.

We estimate system requirements step by step.

---

# Step 1: Estimate Number of Users

Assume:

```

Total users = 100 million
Daily active users = 10%

```

So:

```

Daily active users = 10 million

```

---

# Step 2: Estimate Write Traffic

Assume each active user creates **2 shortened URLs per day**.

```

URLs created per day = 10M × 2
= 20M URLs/day

```

Requests per second:

```

20M / 86400 ≈ 231 writes/sec

```

So roughly:

```

~200 write requests per second

```

---

# Step 3: Estimate Read Traffic

URL redirects are typically far more frequent.

Assume:

```

Each URL accessed 100 times

```
```

20M × 100 = 2B redirects/day

```

Requests per second:

```

2B / 86400 ≈ 23,000 requests/sec

```

So:

```

~20k reads per second

```

---

# Step 4: Estimate Storage

Each shortened URL record stores:

| Field | Size |
|-----|------|
| Short URL | 8 bytes |
| Original URL | 200 bytes |
| Metadata | 100 bytes |

Total per record:

```

~300 bytes

```

Daily storage:

```

20M × 300 bytes
= 6 GB/day

```

Yearly storage:

```

6 GB × 365
≈ 2.2 TB/year

```

---

# Step 5: Estimate Bandwidth

Each redirect returns HTTP headers and a small response.

Assume:

```

Response size ≈ 500 bytes

```

Total daily bandwidth:

```

2B × 500 bytes
= 1 TB/day

```

Bandwidth per second:

```

1 TB / 86400 ≈ 12 MB/sec

````

---

# Estimation Flow

The process usually follows this logical flow.

```mermaid
flowchart TD
    ProblemDefinition --> UserEstimation
    UserEstimation --> TrafficEstimation
    TrafficEstimation --> StorageEstimation
    StorageEstimation --> BandwidthEstimation
    BandwidthEstimation --> InfrastructurePlanning
````

---

# Infrastructure Estimation

Once we know the traffic numbers, we can estimate infrastructure.

Example:

| Metric    | Estimated Value |
| --------- | --------------- |
| Read QPS  | 20,000          |
| Write QPS | 200             |
| Storage   | 2 TB/year       |
| Bandwidth | 12 MB/sec       |

From this we can decide:

* database capacity
* number of application servers
* cache requirements
* CDN usage

---

# Real World Analogy

Imagine planning a **large restaurant**.

Before opening, you estimate:

* expected number of customers per day
* food required
* number of chefs
* number of tables

You don't calculate **exact customer counts**.

Instead you estimate:

```
~500 customers per day
```

This allows you to plan resources efficiently.

System design estimation works the same way.

---

# Common Estimation Patterns

Engineers frequently estimate the following.

## Traffic

```
Requests per second
Daily active users
Peak traffic
```

---

## Storage

```
Data per record
Records per day
Total storage growth
```

---

## Bandwidth

```
Response size
Requests per second
Total network throughput
```

---

## Compute

```
CPU usage
Server capacity
Horizontal scaling needs
```

---

# Estimation in Large Distributed Systems

Large platforms heavily rely on estimation.

Examples:

| Company   | System Scale                       |
| --------- | ---------------------------------- |
| YouTube   | Petabytes of video storage         |
| Netflix   | Massive video streaming bandwidth  |
| Uber      | Millions of ride requests per hour |
| Instagram | Billions of photos                 |

Before building infrastructure, engineers estimate:

* traffic patterns
* storage growth
* network capacity

---

# Common Mistakes in Estimation

## Overcomplicating Calculations

Estimation should remain **simple and quick**.

Avoid unnecessary precision.

---

## Ignoring Peak Traffic

Systems must handle **peak loads**, not just average traffic.

Example:

```
Average = 10k requests/sec
Peak = 50k requests/sec
```

---

## Forgetting Data Growth

Data systems must consider **long-term storage growth**.

Example:

```
2 TB/year → 10 TB in 5 years
```

---

# Best Practices

### Use Conservative Estimates

It is safer to **overestimate slightly** than underestimate.

---

### Document Assumptions

Always clearly state assumptions.

Example:

```
Assume image size = 2 MB
Assume daily users = 10M
```

---

### Validate with Real Data

After deployment, compare estimates with **actual metrics**.

Monitoring tools such as:

* Prometheus
* Grafana

help validate and refine system capacity.

---

# Summary

Back-of-the-envelope estimation is an essential skill in **High Level Design**.

It allows engineers to:

* understand system **scale**
* estimate **traffic and storage**
* plan **infrastructure capacity**
* identify **architectural constraints**

The goal is not exact numbers but **order-of-magnitude understanding** that guides architectural decisions.

By combining **simple assumptions**, **round numbers**, and **quick calculations**, engineers can quickly determine whether a system will require **dozens, hundreds, or thousands of servers**, and design architectures that scale accordingly.