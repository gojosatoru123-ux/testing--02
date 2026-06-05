---
title: Flyweight Design Pattern
articleSlug: lld-flyweight-design-pattern
---

# Flyweight Design Pattern

## Core Idea

* Share common data
* Reduce memory usage
* Reuse many objects
* Separate shared state
* Keep unique state outside

## Problem

* Huge object counts
* Repeated data storage
* High memory usage
* Slow object creation
* Poor scalability

## Asteroid Example

* Many asteroids
* Same textures
* Same colors
* Different positions
* Different velocities

## State Types

* Intrinsic state
* Extrinsic state

### Intrinsic State

* Shared data
* Reusable data
* Usually immutable
* Stored in flyweight
* Example: color, texture

### Extrinsic State

* Unique data
* Context-specific data
* Passed from outside
* Stored separately
* Example: position, velocity

## Participants

* Flyweight
* Context
* Flyweight Factory
* Client

### Flyweight

* Shared object
* Intrinsic state
* Reused everywhere
* Immutable preferred

### Context

* Extrinsic state
* Uses flyweight
* Lightweight wrapper
* Per object data

### Factory

* Creates flyweights
* Reuses cached objects
* Prevents duplication
* Key-based lookup

## Factory Flow

* Request object
* Check cache
* Return existing
* Or create new
* Store and reuse

## Why It Works

* Shared intrinsic data
* Unique extrinsic data
* Smaller memory footprint
* Fewer allocations
* Better performance

## Immutability

* Shared objects stable
* No setters
* Safe reuse
* Avoid side effects
* Prevent shared mutation

## Benefits

* Memory efficient
* Scales well
* Less duplication
* Faster creation
* Lower GC pressure

## Drawbacks

* More complexity
* State separation needed
* Factory overhead
* Extrinsic data passing
* Harder design

## When to Use

* Many similar objects
* Memory pressure
* Repeated shared data
* Fine-grained objects
* Large-scale systems

## When Not to Use

* Few objects
* Little sharing
* Simple systems
* Minimal memory gain
* Unneeded complexity

## Real-World Examples

* Video games
* Text editors
* Graphics systems
* Map tiles
* Forest rendering

### Text Editor

* Shared glyphs
* Shared fonts
* Unique positions
* Efficient characters
* Memory saving

### Game Trees

* Shared models
* Shared textures
* Unique coordinates
* Unique rotation
* Reused assets

## Flyweight vs Object Pool

* Flyweight shares state
* Object pool reuses instances
* Different goals
* Different optimization
* Distinct patterns

## Flyweight vs Singleton

* Flyweight many objects
* Singleton one object
* Shared reuse
* Not global single
* Different purpose

## Flyweight vs Prototype

* Flyweight shares
* Prototype clones
* Memory saving
* Object copying
* Different mechanics

## Common Mistakes

* Mixing extrinsic state
* Mutable flyweights
* No caching
* Overusing pattern
* Wrong state split

## Implementations

* C++
* Java
* Python

### Shared Structure

* Flyweight class
* Context class
* Factory class
* Cache map
* Display method

## Final Takeaway

* Share repeated data
* Store unique data separately
* Reuse flyweights
* Save memory
* Improve scalability
