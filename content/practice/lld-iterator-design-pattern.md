---
title: Iterator Design Pattern
articleSlug: lld-iterator-design-pattern
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: iterator-pattern, lld, design-patterns

What is the Iterator Design Pattern?

<!-- ANSWER -->
The Iterator Design Pattern provides a way to sequentially access elements of a collection without exposing its internal structure.

Instead of directly accessing collection internals:

```text
Array[index]
```

Iterator provides:

```text id="4m8qza"
hasNext()
next()
```

Benefits:

| Benefit            | Explanation                    |
| ------------------ | ------------------------------ |
| Encapsulation      | Hide collection internals      |
| Uniform traversal  | Common iteration interface     |
| Better flexibility | Different traversal strategies |

The Iterator Pattern is a behavioral design pattern.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: iterator-pattern, collections, lld

What problem does the Iterator Pattern solve?

<!-- ANSWER -->
Different collections often have different internal structures.

Examples:
- arrays
- linked lists
- trees
- graphs

Without Iterator:

```text id="6m2xqc"
Client must understand collection internals
```

Iterator solution:

```text id="uoeaqr"
Standard traversal interface for all collections
```

Benefits:

| Benefit                  | Explanation                 |
| ------------------------ | --------------------------- |
| Simplified traversal     | Uniform iteration logic     |
| Better abstraction       | Hide implementation details |
| Improved maintainability | Decoupled traversal code    |

Iterator separates traversal logic from collection implementation.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: iterator-pattern, components, lld

What are the main components of the Iterator Pattern?

<!-- ANSWER -->
The Iterator Pattern contains:
- Iterator
- Concrete Iterator
- Aggregate
- Concrete Aggregate

Architecture:

```text
Aggregate → Iterator
```

Responsibilities:

| Component          | Purpose                          |
| ------------------ | -------------------------------- |
| Iterator           | Defines traversal methods        |
| Concrete Iterator  | Implements traversal logic       |
| Aggregate          | Collection interface             |
| Concrete Aggregate | Actual collection implementation |

Example methods:

```text id="6p1qxt"
hasNext()
next()
```

The iterator controls traversal independently of the collection.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: iterator-pattern, encapsulation, clean-code

How does the Iterator Pattern improve encapsulation?

<!-- ANSWER -->
The Iterator Pattern hides the internal representation of collections.

Without Iterator:

```text id="5m2xqc"
Client accesses internal array or nodes directly
```

With Iterator:

```text id="8w4qza"
Client only uses traversal interface
```

Benefits:

| Benefit                       | Explanation                          |
| ----------------------------- | ------------------------------------ |
| Hidden implementation details | Better abstraction                   |
| Safer collection access       | Prevent accidental modification      |
| Flexible internal structures  | Collection implementation can change |

Encapsulation improves maintainability and modularity.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: iterator-pattern, tree-traversal, algorithms

How is the Iterator Pattern useful for tree traversal?

<!-- ANSWER -->
Trees support multiple traversal strategies.

Examples:
- preorder
- inorder
- postorder
- level-order

Iterator provides:

```text id="clt6p5"
TreeIterator
```

Benefits:

| Benefit                  | Explanation                   |
| ------------------------ | ----------------------------- |
| Reusable traversal logic | Encapsulated algorithms       |
| Flexible iteration       | Multiple traversal strategies |
| Cleaner client code      | Uniform interface             |

Example:

```text id="2v7qwr"
BinaryTreeIterator.inorder()
```

Iterator simplifies traversal of complex hierarchical structures.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: iterator-vs-visitor, design-patterns, lld

What is the difference between Iterator and Visitor Design Patterns?

<!-- ANSWER -->
Iterator focuses on traversing collections.

Visitor focuses on performing operations on object structures.

Comparison:

| Iterator | Visitor |
|---|---|
| Traverses elements | Applies operations |
| Encapsulates traversal logic | Encapsulates behavior logic |
| Focuses on access | Focuses on processing |

Example Iterator:

```text id="4q2xmc"
next()
hasNext()
```

Example Visitor:

```text id="nh6dzq"
visit(Node)
```

Both patterns work with collections but solve different problems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: lazy-evaluation, iterator-pattern, performance

How does the Iterator Pattern support lazy evaluation?

<!-- ANSWER -->
Lazy evaluation processes elements only when needed.

Iterator enables this by generating items incrementally.

Example:

```text id="4v8qpd"
Generate next element only during next()
```

Benefits:

| Benefit              | Explanation                  |
| -------------------- | ---------------------------- |
| Reduced memory usage | Avoid loading entire dataset |
| Better performance   | Process only required items  |
| Scalable iteration   | Large datasets supported     |

Examples:

* database cursors
* stream processing
* infinite generators

Lazy iterators are widely used in high-performance systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: concurrent-iteration, iterator-pattern, concurrency

What challenges exist with concurrent iteration?

<!-- ANSWER -->
Concurrent modification during iteration can cause inconsistent traversal behavior.

Example:

```text id="6m3qpd"
Collection modified while iterator is active
```

Possible problems:

| Problem           | Explanation                      |
| ----------------- | -------------------------------- |
| Race conditions   | Simultaneous updates             |
| Invalid traversal | Iterator state corruption        |
| Exceptions        | Concurrent modification failures |

Solutions:

* fail-fast iterators
* immutable collections
* snapshot iterators

Example:

```text id="2p8qza"
ConcurrentModificationException
```

Concurrency handling is important in iterator implementations.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: iterator-pattern, database-systems, backend-engineering

How is the Iterator Pattern used in database systems?

<!-- ANSWER -->
Database systems often return large result sets incrementally.

Instead of loading everything into memory:

```text id="1q8vza"
Rows fetched one at a time
```

Iterator abstraction:

```text id="rzdmjt"
ResultSetIterator
```

Benefits:

| Benefit              | Explanation                |
| -------------------- | -------------------------- |
| Memory efficiency    | Streamed result processing |
| Better scalability   | Large datasets supported   |
| Incremental fetching | Reduced resource usage     |

Examples:

* SQL cursors
* ORM query iterators
* stream processing APIs

Database drivers commonly implement iterator-like traversal internally.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: iterator-pattern, trade-offs, software-design

What are the trade-offs of using the Iterator Pattern?

<!-- ANSWER -->
The Iterator Pattern improves abstraction but introduces additional objects and traversal complexity.

Advantages:

| Advantage | Explanation |
|---|---|
| Encapsulation | Hide collection internals |
| Flexible traversal | Multiple iteration strategies |
| Cleaner APIs | Standardized access |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Additional abstraction | Extra iterator objects |
| Traversal overhead | Indirect access costs |
| Concurrency challenges | Iterator invalidation risks |

Example:

```text id="7v2xpd"
Collection → Iterator → Elements
```

Iterator is highly valuable in:

* collection frameworks
* stream processing
* database systems

<!-- END -->