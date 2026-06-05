---
title: Prototype Design Pattern
articleSlug: lld-prototype-design-pattern
---

# Prototype Design Pattern

## Overview

* Creational design pattern
* Clone existing objects
* Avoid fresh construction
* Reuse object templates
* Faster similar object creation

## Core Idea

* Create once
* Clone many times
* Customize afterward
* Save construction cost
* Reduce setup duplication

## When Useful

* Expensive object creation
* Heavy initialization logic
* Many similar objects
* Minor object differences
* Repeated setup work

## Problem

* `new` can be costly
* Constructors may be heavy
* Repeated initialization wastes time
* Startup becomes slower
* Scalability suffers

## Example Scenarios

* Game NPCs
* Weapons
* UI components
* Templates
* Configuration objects

## Main Participants

### Prototype

* Declares clone operation
* Cloning contract

### Concrete Prototype

* Implements cloning
* Copies internal state

### Client

* Requests clones
* Customizes objects

### Prototype Registry

* Stores prototypes
* Returns reusable templates

## Workflow

* Create prototype
* Store prototype
* Clone prototype
* Modify clone
* Use object

## Clone Method

* Heart of pattern
* Returns copied object
* Copies state
* May use constructors

## Copy Constructor

* Copies same type
* Duplicates object data
* Common in C++
* Controls copy behavior

## Copy Types

### Shallow Copy

* Copies primitive values
* Shares references
* Faster cloning
* Risky with nested data

### Deep Copy

* Copies nested objects
* Independent copies
* Safer cloning
* Slightly slower

## Prototype Registry

* Central prototype storage
* Easy lookup
* Faster reuse
* Common in large systems

## Benefits

* Faster creation
* Less setup cost
* Reusable templates
* Easy variants
* Simplified construction

## Drawbacks

* Deep copy complexity
* Shared-state bugs
* Extra registry management
* Not for unique objects

## Real-World Analogy

* Form template
* Copy first version
* Fill changed fields
* Reuse structure
* Save effort

## Game Example

* Base alien
* Clone variants
* Change health
* Change speed
* Change weapon

## UML Structure

* Prototype interface
* Concrete prototype
* Client dependency
* Optional registry
* Clone relationship

## Prototype vs Factory

* Prototype: clone existing
* Factory: create from logic
* Prototype: similar objects
* Factory: type-based creation

## Prototype vs Builder

* Prototype: copy object
* Builder: construct stepwise
* Prototype: faster reuse
* Builder: controlled assembly

## Best Use Cases

* Expensive setup
* Repeated objects
* Template-based systems
* Variant generation
* Cached defaults

## Avoid When

* Objects are unique
* Creation is simple
* Copying is risky
* State is hard
* No reuse needed

## Common Mistakes

* Shallow copy misuse
* Nested data sharing
* Forgetting deep copy
* Cloning too often
* Weak registry design

## Key Takeaway

* Clone instead of recreate
* Reuse object templates
* Customize after copying
* Prefer deep copy when needed
