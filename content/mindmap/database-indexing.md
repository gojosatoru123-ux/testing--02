---
title: Database Indexing
articleSlug: database-indexing
---

# Database Indexing

## Core Concept

* Faster data retrieval
* Avoid full table scan
* Search optimization
* Query performance boost
* Lookup data structure

## Motivation

* Massive datasets
* Millions records tables
* Slow sequential scans
* High query latency
* Need faster lookups

## Book Analogy

* Book index pages
* Topic lookup quickly
* Avoid reading entire book
* Direct page reference

## Without Index

### Full Table Scan

* Scan every row
* Sequential search
* Very slow queries
* High latency operations

### Complexity

* Linear time search
* O n complexity
* Large dataset slowdown

## With Index

### Index Lookup

* Search index structure
* Find row pointer
* Fetch actual row
* Faster retrieval

### Complexity

* Logarithmic search
* O log n
* Millisecond latency

## Index Data Structures

### B Tree

* Balanced tree structure
* Sorted key storage
* Efficient range queries
* Logarithmic operations

### B Tree Properties

* Root node
* Internal nodes
* Leaf nodes
* Balanced height

### Hash Index

* Hash function mapping
* Key bucket storage
* Fast equality search
* Poor range queries

## Index Components

* Indexed column value
* Row pointer reference
* Tree search structure
* Sorted key ordering

## Index Types

### Primary Index

* Primary key index
* Unique values only
* Automatically created
* One per table

### Secondary Index

* Non primary column
* Manual creation
* Faster filtered queries
* Multiple allowed

### Composite Index

* Multiple column index
* Multi attribute search
* Query optimization
* Ordered column priority

### Composite Rules

* Leftmost prefix rule
* Column order important
* Partial index usage

### Unique Index

* Enforce uniqueness
* Prevent duplicate values
* Data integrity guarantee

### Full Text Index

* Text search indexing
* Document searching
* Keyword lookup
* Search engine systems

## Clustered Index

### Characteristics

* Physical row ordering
* Data stored sequentially
* One per table
* Faster range scans

### Benefits

* Faster sequential reads
* Efficient range queries
* Reduced disk seeks

## Non Clustered Index

### Characteristics

* Separate index structure
* Pointer to table rows
* Multiple indexes allowed

### Benefits

* Flexible indexing
* Faster lookup queries
* Independent index structures

## Query Operations

### Select Queries

* Faster search operations
* Reduced scanned rows
* Improved latency

### Insert Operations

* Update index entries
* Tree rebalancing required
* Slightly slower writes

### Update Operations

* Modify indexed values
* Update tree structure
* Increased overhead

### Delete Operations

* Remove index entry
* Maintain tree balance

## Read Write Tradeoff

### Read Benefits

* Faster select queries
* Efficient filtering
* Optimized joins

### Write Costs

* Insert overhead
* Update overhead
* Delete overhead
* Extra storage usage

## Index Selectivity

### High Selectivity

* Unique values
* Few duplicates
* Efficient indexing

### Low Selectivity

* Repeated values
* Poor index usefulness
* Example gender column

### Medium Selectivity

* Moderate uniqueness
* Useful conditional queries

## Indexing in Large Systems

### Search Engines

* Web page indexing
* Fast search retrieval

### Ecommerce Platforms

* Product search indexes
* Category filtering

### Social Networks

* User lookup indexes
* Graph query acceleration

## Index Maintenance

### Index Rebuild

* Fix fragmentation
* Improve performance

### Index Monitoring

* Detect unused indexes
* Remove redundant indexes

### Statistics Updates

* Improve query planner
* Accurate cost estimation

## Index Fragmentation

### Causes

* Frequent inserts
* Random updates
* Page splits

### Effects

* Slower queries
* Inefficient disk usage
* Increased IO operations

### Solutions

* Rebuild indexes
* Reorganize indexes
* Periodic maintenance

## Index Best Practices

### Query Optimization

* Index WHERE columns
* Index JOIN columns
* Index ORDER BY columns

### Avoid Over Indexing

* Too many indexes
* Write performance degradation

### Composite Index Strategy

* Choose column order carefully
* Follow query patterns

## Performance Monitoring

### Index Hit Rate

* Percentage index usage
* Query efficiency indicator

### Query Latency

* Execution time measurement
* Performance optimization

### Index Size

* Storage consumption
* Memory footprint

## Key Takeaways

* Faster database queries
* Efficient search structures
* Balanced read write tradeoff
* Essential for large systems
