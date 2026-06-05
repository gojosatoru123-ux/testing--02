---
title: Singleton Design Pattern
articleSlug: lld-singleton-design-pattern
---

# Singleton Design Pattern

## Overview

* One instance only
* Global access point
* Creational design pattern
* Controlled object creation

## Why It Exists

* Avoid duplicate instances
* Save memory
* Keep shared state
* Prevent conflicting behavior
* Reduce resource waste

## Core Idea

* Private constructor
* Static instance field
* Public access method
* Single shared object

## Access Flow

* Client calls `getInstance()`
* Check instance exists
* Create if absent
* Return same object

## Key Steps

* Make constructor private
* Store static instance
* Expose static method
* Control duplication

## Initialization Strategies

### Lazy Initialization

* Create on first use
* Saves resources
* Needs null check
* Thread safety needed

### Eager Initialization

* Create at load time
* Simpler implementation
* Usually thread-safe
* May waste memory

## Thread Safety

* Multiple threads risk
* Duplicate creation issue
* Critical section problem
* Locking required
* Safe access needed

## Thread-Safe Approaches

* Synchronized method
* Synchronized block
* Double-checked locking
* Static initialization
* Enum Singleton

## Double-Checked Locking

* Check before locking
* Lock only once
* Check again inside
* Reduce overhead

## Language Notes

### C++

* Private constructor
* Deleted copy operations
* Static pointer instance
* Manual cleanup needed

### Java

* Private constructor
* Static instance field
* Synchronized access
* Enum option available

### Python

* Override `__new__()`
* Class-level instance
* Return same object
* No strict private

## Common Use Cases

* Logger
* Configuration manager
* Cache controller
* Scheduler
* Metrics collector
* Database coordinator

## Benefits

* One shared object
* Centralized control
* Consistent state
* Easy global access
* Reduced duplication

## Drawbacks

* Global state
* Hidden dependencies
* Harder testing
* Thread complexity
* Tight coupling

## When To Use

* One object needed
* Shared coordination required
* Expensive creation
* Global access useful

## When Not To Use

* Multiple instances fine
* Object easily created
* Testing becomes difficult
* Flexibility matters more

## Singleton vs Static Class

* Singleton is object
* Static class is not
* Singleton can implement interfaces
* Static class cannot

## Singleton vs Factory

* Singleton: one instance
* Factory: create objects
* Singleton: uniqueness focus
* Factory: creation focus

## Best Practices

* Use sparingly
* Keep responsibility focused
* Ensure thread safety
* Prevent copying
* Prefer dependency injection

## Common Mistakes

* Overusing Singleton
* Ignoring thread safety
* Allowing cloning
* Mixing responsibilities
* Creating hidden globals

## Final Takeaway

* One class
* One instance
* One access point
* Use carefully
* Solve true uniqueness
