---
title: Factory Design Pattern
articleSlug: lld-factory-design-pattern
---

# Factory Design Pattern

## Core Idea

* Separate creation logic
* Hide concrete classes
* Client asks for objects
* Factory decides creation
* Reduce coupling

## Problem

* Business logic mixed
* Repeated `new`
* `if-else` chains
* `switch` statements
* Rigid object creation

## Why It Matters

* Easier maintenance
* Easier extension
* Cleaner code
* Better testing
* Stronger design

## Factory Family

* Simple Factory
* Factory Method
* Abstract Factory

## Simple Factory

* One factory method
* Uses conditionals
* Centralized creation
* Useful for small systems
* Not formal GoF

### Example

* Notification type
* Email
* SMS
* Push

### Limitation

* Factory changes often
* Not open for extension
* Can grow large

## Factory Method

* Subclasses decide creation
* Creator defines workflow
* True GoF pattern
* Creation is overridden
* Client stays decoupled

### Example

* Burger factory
* Normal burger
* Wheat burger
* Order workflow

### Strength

* Better extensibility
* Supports OCP
* Subclass variation

## Abstract Factory

* Create related families
* Compatible objects together
* No concrete classes exposed
* Factory creates multiple products
* Strong consistency

### Example

* Meal factory
* Burger
* Bread
* Regular set
* Healthy set

## Pattern Comparison

* Simple Factory: centralize
* Factory Method: subclass creation
* Abstract Factory: product families
* Different abstraction levels
* Different complexity

## Factory vs Strategy

* Factory: object creation
* Strategy: behavior selection
* Factory creates things
* Strategy chooses algorithms
* Different intents

## Structure

* Client
* Factory
* Product interface
* Concrete products
* Concrete factories

### Client

* Requests object
* Uses abstraction
* No creation details

### Factory

* Encapsulates creation
* Chooses product
* Returns abstraction

### Product

* Common interface
* Shared behavior
* Concrete implementations

## Benefits

* Loose coupling
* Cleaner architecture
* Easy replacement
* Centralized creation
* Better readability

## Drawbacks

* More classes
* More indirection
* Possible overengineering
* Extra abstraction

## When to Use

* Many product types
* Creation complexity
* Frequent extensions
* Need abstraction
* Need product families

## When Not to Use

* Simple object creation
* Few types
* No variation
* Unnecessary abstraction

## Common Signs

* Repeated `new`
* Scattered object creation
* Conditional construction
* Concrete class coupling
* Hard-to-change code

## Real-World Uses

* Notifications
* UI components
* Database connectors
* Payment processors
* Logging frameworks
* Report generators

## Implementations

* C++
* Java
* Python

### Shared Elements

* Interface
* Concrete product
* Factory class
* Creation method
* Client usage

## Final Takeaway

* Separate creation
* Keep logic clean
* Hide concrete classes
* Support extension
* Build flexible systems
