---
title: Bridge Design Pattern
articleSlug: lld-bridge-design-pattern
---

# Bridge Design Pattern

## Core Idea

* Decouple abstraction
* Decouple implementation
* Vary independently
* Use composition
* Avoid inheritance rigidity

## Problem

* Class explosion
* Multiple variation axes
* Too many combinations
* Duplicate logic
* Hard maintenance

### Car Example

* Car types
* Engine types
* Sedan
* Hatchback
* SUV
* Petrol
* Diesel
* Electric

### Explosion Outcome

* m times n classes
* Rapid growth
* Poor scalability
* Tight coupling

## Bridge Structure

* Abstraction layer
* Implementation layer
* Independent hierarchies
* Connected by composition
* Delegated behavior

### Roles

* Abstraction
* Refined abstraction
* Implementor
* Concrete implementor

### Car Mapping

* Car
* Sedan
* SUV
* Engine
* PetrolEngine
* DieselEngine
* ElectricEngine

## How It Works

* Abstraction holds implementor
* Client uses abstraction
* Abstraction delegates work
* Implementor handles details
* Both evolve separately

## Benefits

* Fewer classes
* Better reuse
* Easier extension
* Cleaner design
* Flexible combinations

### Scalability

* Add new car type
* Add new engine type
* No class explosion
* Minimal changes

## Real-World Examples

* Remote and TV
* GUI and renderer
* Shapes and drawing API
* Messaging and transport

### Remote Control

* Remote abstraction
* TV implementation
* Many remote types
* Many TV types

### GUI Widgets

* Widget abstraction
* OS renderer
* Platform-specific drawing
* Generic widget logic

## Bridge vs Strategy

* Bridge: structure
* Strategy: behavior
* Bridge: two hierarchies
* Strategy: interchangeable algorithms
* Bridge: design choice
* Strategy: runtime choice

## Bridge vs Adapter

* Bridge: planned design
* Adapter: compatibility fix
* Bridge: separation
* Adapter: interface conversion

## When to Use

* Multiple variation dimensions
* Inheritance causes explosion
* Abstraction and implementation differ
* Composition preferred
* Independent evolution needed

## When Not to Use

* Single variation axis
* Simple problem
* Unnecessary abstraction
* Low complexity design

## Advantages

* Avoid class explosion
* Independent changes
* Reusable implementations
* Open for extension
* Maintainable structure

## Drawbacks

* More classes
* More upfront design
* Extra abstraction
* Possible overuse

## Common Mistakes

* Confusing with Strategy
* Using inheritance only
* Overengineering simple cases
* Breaking decoupling
* Too many layers

## Implementations

* C++
* Java
* Python

### Key Elements

* Car abstraction
* Engine interface
* Concrete car types
* Concrete engine types
* Delegation logic

## Final Takeaway

* Separate what and how
* Connect with composition
* Support independent change
* Reduce subclass growth
* Improve scalability
