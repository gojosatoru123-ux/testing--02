---
title:  Database Indexing
articleSlug: database-indexing
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Hard
tags: database-indexing, performance-engineering, databases

Why are database indexes critical for large-scale system performance?

<!-- ANSWER -->
Without indexes, databases perform:

```text
Full table scans
```

Meaning:

```text
Every row must be checked sequentially
```

Problems:

* high query latency
* poor scalability
* excessive disk I/O

Indexes improve lookup efficiency.

Benefits:

| Benefit            | Explanation                |
| ------------------ | -------------------------- |
| Faster queries     | Reduced search space       |
| Lower disk reads   | Efficient access paths     |
| Better scalability | Faster response under load |

Example:

```text id="4m8qza"
Searching user by email in billion-row table
```

Indexes are foundational for performant database systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: btree-index, relational-databases, query-optimization

Why are B-Tree indexes the default indexing structure in most relational databases?

<!-- ANSWER -->
B-Trees provide:
- balanced search paths
- logarithmic lookup complexity
- efficient range queries

Complexity:

```text
O(log n)
```

Benefits:

| Benefit              | Explanation           |
| -------------------- | --------------------- |
| Fast equality search | Efficient key lookups |
| Range scan support   | Ordered traversal     |
| Balanced structure   | Stable performance    |

Example:

```text id="6m2xqc"
SELECT * FROM users WHERE age BETWEEN 20 AND 30
```

B-Trees optimize both:

* point lookups
* ordered queries

making them highly versatile for relational workloads.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: composite-index, query-planning, database-performance

Why does column order matter significantly in composite indexes?

<!-- ANSWER -->
Composite indexes are ordered structures.

Example:

```text
INDEX(first_name, last_name)
```

Efficient queries:

```text id="6p1qxt"
WHERE first_name = 'John'
```

Less efficient queries:

```text id="n7z9qa"
WHERE last_name = 'Smith'
```

Reason:

```text
Indexes follow leftmost prefix matching
```

Benefits of proper ordering:

| Benefit            | Explanation              |
| ------------------ | ------------------------ |
| Faster filtering   | Better index utilization |
| Reduced scans      | Smaller search space     |
| Better query plans | Lower latency            |

Column order should reflect common query access patterns.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: covering-index, query-optimization, databases

Why are covering indexes extremely powerful for query performance?

<!-- ANSWER -->
A covering index contains:
- indexed columns
- all columns required by query

Result:

```text
Database answers query entirely from index
```

Without accessing table rows.

Example:

```text id="5m2xqc"
SELECT email FROM users WHERE id = 5
```

Benefits:

| Benefit                 | Explanation             |
| ----------------------- | ----------------------- |
| Reduced disk I/O        | Table lookup avoided    |
| Lower latency           | Faster execution        |
| Better cache efficiency | Smaller index footprint |

Tradeoff:

| Tradeoff       | Explanation            |
| -------------- | ---------------------- |
| Larger indexes | Increased storage cost |
| Slower writes  | More index maintenance |

Covering indexes are highly effective for read-heavy workloads.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: write-amplification, indexing, database-performance

Why do excessive indexes negatively impact write performance?

<!-- ANSWER -->
Indexes must stay synchronized with table data.

Every:
- INSERT
- UPDATE
- DELETE

requires index updates.

Problems:

| Problem | Impact |
|---|---|
| Additional disk writes | Increased I/O |
| More CPU usage | Index maintenance overhead |
| Slower transactions | Increased latency |

Example:

```text id="clt6p5"
Single INSERT updates 10 separate indexes
```

Tradeoff:

```text id="2v7qwr"
Indexes improve reads but slow writes
```

Over-indexing is a common database performance anti-pattern.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: hash-index, database-indexing, distributed-systems

Why are hash indexes fast for equality lookups but poor for range queries?

<!-- ANSWER -->
Hash indexes map:

```text
Key → Hash Bucket
```

Benefits:

| Benefit                        | Explanation          |
| ------------------------------ | -------------------- |
| Extremely fast equality lookup | Direct bucket access |
| Constant-time search           | Average O(1)         |

Example:

```text id="4q2xmc"
WHERE user_id = 12345
```

Problem:

```text
Hashing destroys ordering information
```

Range query issue:

```text id="nh6dzq"
WHERE age BETWEEN 20 AND 30
```

requires scanning multiple buckets.

B-Trees are preferred for ordered access patterns.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: full-text-search, inverted-index, elasticsearch

Why do search engines use inverted indexes instead of traditional B-Tree indexes?

<!-- ANSWER -->
Traditional indexes optimize structured lookups.

Search engines require:
- keyword search
- relevance ranking
- text tokenization

Inverted index structure:

```text id="4v8qpd"
Word → List of Document IDs
```

Example:

| Word        | Documents  |
| ----------- | ---------- |
| distributed | Doc1, Doc4 |
| caching     | Doc2, Doc7 |

Benefits:

| Benefit                  | Explanation         |
| ------------------------ | ------------------- |
| Fast keyword search      | Direct token lookup |
| Efficient text retrieval | Scalable search     |
| Ranking support          | Relevance scoring   |

Inverted indexes power:

* Elasticsearch
* Solr
* Lucene

and modern search infrastructure.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: indexing, partitioning, distributed-databases

Why do indexes become more complex in distributed databases?

<!-- ANSWER -->
Distributed databases partition data across nodes.

Challenges:
- distributed query routing
- cross-partition lookups
- index synchronization

Problem:

```text
Global indexes require distributed coordination
```

Architecture:

```text id="6m3qpd"
Partition Key → Different Database Shards
```

Tradeoffs:

| Tradeoff       | Explanation                     |
| -------------- | ------------------------------- |
| Local indexes  | Faster but partition-limited    |
| Global indexes | Flexible but coordination-heavy |

Distributed indexing complexity increases with:

* shard count
* replication
* consistency guarantees

Index design becomes tightly coupled with partitioning strategy.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: query-optimizer, execution-plans, database-indexing

Why can databases sometimes ignore indexes even when indexes exist?

<!-- ANSWER -->
Query optimizers estimate:
- query cost
- selectivity
- data distribution

Problem:

```text
Using index may be slower than full scan
```

Example:

```text id="1q8vza"
WHERE gender = 'male'
```

If most rows match:

```text id="2a3g05"
Sequential scan may be cheaper
```

Factors affecting optimizer decisions:

| Factor              | Impact                             |
| ------------------- | ---------------------------------- |
| Selectivity         | Highly selective indexes preferred |
| Table size          | Small tables may skip indexes      |
| Statistics accuracy | Better execution plans             |

Indexes help only when they significantly reduce scanned data.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: database-indexing, trade-offs, system-design

What are the major trade-offs when designing database indexing strategies?

<!-- ANSWER -->
Indexes improve query speed but increase operational overhead.

Advantages:

| Advantage | Explanation |
|---|---|
| Faster reads | Reduced query latency |
| Better scalability | Efficient lookups |
| Lower query cost | Reduced disk access |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Slower writes | Additional index updates |
| Increased storage | Index structures consume space |
| Maintenance overhead | Rebuild and optimization needed |
| Query planner complexity | More execution possibilities |

Example:

```text id="7v2xpd"
Highly indexed OLTP systems may suffer heavy write amplification
```

Effective indexing requires balancing:

* read performance
* write throughput
* storage efficiency
* operational complexity

<!-- END -->