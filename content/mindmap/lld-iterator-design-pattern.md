---
title: Iterator Design Pattern
articleSlug: lld-iterator-design-pattern
---

# Iterator Design Pattern

## Core Idea

* Sequential access
* Hidden collection structure
* Standard traversal
* One item at a time
* Collection abstraction

## Main Problem

* Traversal mixed
* Storage coupled
* Structure leaks
* Hard maintenance
* Rigid loops

## Playlist Example

* Songs collection
* Play sequentially
* Storage may change
* Traversal should stay stable
* Client should not care

## Why It Fails

* Vector uses indexes
* LinkedList uses nodes
* Tree uses recursion
* Different traversal rules
* Code breaks on change

## SRP Issue

* Manage songs
* Traverse songs
* Two responsibilities
* One class
* Too much change

## Solution

* Separate traversal
* Iterator handles movement
* Collection stores items
* Client uses iterator
* Internal structure hidden

## Core Components

* Iterator interface
* Concrete iterator
* Aggregate collection
* Concrete collection
* Client

### Iterator Interface

* hasNext
* next
* Optional remove
* Traversal contract
* Standard access

### Concrete Iterator

* Tracks position
* Knows collection
* Moves step by step
* Hides complexity
* Returns elements

### Collection

* Stores elements
* Adds items
* Removes items
* Creates iterator
* Owns data

## Flow

* Client asks iterator
* Collection returns iterator
* Client checks hasNext
* Client calls next
* Iterator advances

## Key Benefit

* No structure exposure
* No internal details
* Reusable traversal
* Flexible design
* Cleaner client code

## Analogy

* GPS navigator
* Collection is road map
* Iterator guides movement
* Client follows directions
* Path stays hidden

## Traversal Interface

* hasNext
* next
* Same usage
* Any structure
* Uniform access

## Types of Iterators

* Forward
* Reverse
* Bidirectional
* Recursive
* Filtered

### Forward Iterator

* Left to right
* Most common
* Simple traversal
* Sequential access
* Standard loop

### Reverse Iterator

* Right to left
* Backward traversal
* Undo support
* Reverse playlist
* History navigation

### Bidirectional Iterator

* Forward movement
* Backward movement
* Flexible navigation
* Two-way access
* Rich traversal

### Recursive Iterator

* Nested structures
* Tree traversal
* Composite friendly
* Deep navigation
* Hierarchical access

## External vs Internal

* External iterator
* Client controls traversal
* Internal iterator
* Collection controls traversal
* Different ownership

## Benefits

* Decouples traversal
* Supports strategies
* Preserves encapsulation
* Follows OCP
* Cleaner loops
* Reusable navigation

## Real-World Examples

* Music playlists
* Browser history
* Database rows
* Social feeds
* File systems

### Music Playlist

* Song by song
* Sequential playing
* Easy navigation
* Hidden storage
* Simple playback

### Browser History

* Backward navigation
* Forward navigation
* Page sequence
* History traversal
* User control

### Database ResultSet

* Row iteration
* One row at time
* Lazy access
* Efficient retrieval
* Standard traversal

## Iterator and SOLID

* SRP: traversal only
* OCP: new iterators
* DIP: depend abstraction
* Better separation
* Better design

## Iterator vs Indexing

* Indexing depends structure
* Iterator hides structure
* Trees easier
* Encapsulation stronger
* Flexible traversal

## Iterator vs Visitor

* Iterator navigates
* Visitor acts
* Different goals
* Different responsibilities
* Different patterns

## Drawbacks

* Extra classes
* Slight complexity
* Iterator sync issues
* Overuse risk
* More abstraction

## Common Mistakes

* Exposing internals
* Modifying during iteration
* Overengineering simple data
* Wrong traversal choice
* Leaking structure

## Advanced Iterators

* Lazy iterator
* Filter iterator
* Infinite iterator
* Composite iterator
* Stream-like behavior

### Lazy Iterator

* Load on demand
* Memory friendly
* Deferred work
* Pagination friendly
* Efficient access

### Filter Iterator

* Matching items only
* Conditional traversal
* Focused results
* Cleaner selection
* Custom rules

## Modern Language Support

* Java iterator
* Python iteration
* C++ iterators
* JavaScript loops
* Built-in support

## Before vs After

* Before: coupled loops
* After: reusable iterator
* Before: structure aware
* After: structure hidden
* Better maintainability

## Final Takeaway

* Collection stores data
* Iterator traverses data
* Client stays simple
* Structure stays hidden
* Traversal becomes reusable
