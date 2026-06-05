---
title: Strategy Pattern
articleSlug: lld-strategy-design-pattern
---

# Strategy Pattern

## Overview

* Behavioral design pattern
* Interchangeable algorithms
* Runtime behavior swapping
* Composition over inheritance
* Flexible system design

## Core Idea

* Separate changing behavior
* Keep stable context
* Plug in strategies
* Swap behavior easily
* Avoid rigid hierarchies

## Why It Matters

* Reduces `if/else`
* Prevents subclass explosion
* Lowers coupling
* Improves extensibility
* Simplifies maintenance

## Problem With Inheritance

* Behavior changes often
* Deep class trees
* Duplicate logic
* Rigid hierarchy
* Hard to scale

## Stable vs Changing

### Stable

* Core object
* Coordination logic
* Identity
* Shared structure

### Changing

* Algorithms
* Actions
* Policies
* Modes

## Main Participants

### Context

* Uses strategy
* Holds reference
* Delegates work
* Stays simple

### Strategy

* Behavior contract
* Common interface
* Algorithm family

### Concrete Strategy

* Actual implementation
* Specific behavior
* Swappable object

## Composition Over Inheritance

* Has-a relationship
* Strategy as field
* Easier replacement
* Better reuse
* Less hierarchy

## “Main Object” Role

* Coordinates only
* No heavy logic
* No behavior details
* Calls strategy methods
* Keeps stability

## Null Behavior

* Valid no-op strategy
* Avoids null checks
* Avoids special cases
* Cleaner design

## Real-World Examples

### Payment Systems

* UPI
* Card
* Wallet
* Net banking
* COD

### Sorting Systems

* Quick sort
* Merge sort
* Heap sort
* Insertion sort

### Routing Systems

* Fastest route
* Shortest path
* Avoid tolls
* Avoid highways

### Compression Systems

* Zip
* Gzip
* LZ4
* No compression

## Robot Example

* Walk behavior
* Talk behavior
* Fly behavior
* Swappable actions
* Different robot types

## Pattern Structure

### Client

* Chooses context
* Uses object

### Context

* Holds strategies
* Delegates calls

### Strategy Interface

* Common contract

### Concrete Strategies

* Different algorithms

## When To Use

* Runtime swapping
* Multiple algorithms
* Long conditionals
* Behavior isolation
* Avoid class explosion

## When Not To Use

* One behavior only
* No variation needed
* Tiny systems
* Unnecessary abstraction

## Benefits

* Flexible behavior
* Better reuse
* Easier testing
* Cleaner code
* Open for extension
* Closed for modification

## Drawbacks

* More classes
* More objects
* More abstraction
* Verbose for small cases

## Strategy vs Inheritance

* Strategy uses composition
* Inheritance fixes behavior
* Strategy swaps easily
* Inheritance grows rigid

## Strategy vs State

* Strategy chosen externally
* State changes internally
* Strategy is algorithm
* State is lifecycle

## Strategy vs Template Method

* Strategy uses objects
* Template uses inheritance
* Strategy runtime-swappable
* Template fixed structure

## Design Principles

* OCP friendly
* LSP friendly
* Composition focused
* Single responsibility

## Common Signs

* Repeated `if/else`
* Many subclasses
* Type-based logic
* Feature variation
* Duplicate algorithms

## Key Takeaway

* Separate what changes
* Keep context stable
* Swap strategies freely
* Favor composition
* Design for change
