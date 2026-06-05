---
title: Anti-Patterns and Null Object Pattern
articleSlug: lld-anti-and-null-design-pattern
---
# Anti-Patterns and Null Object Pattern

## Introduction

* wrong design habits
* long term issues
* seem useful initially

## Anti-Pattern Concept

* short term fix
* long term damage
* increases system complexity

## Impact

* harder debugging
* poor maintainability
* tight coupling issues
* fragile codebase growth

## Categories

* organizational anti-patterns
* developmental anti-patterns
* architectural anti-patterns

## Common Anti-Patterns

### Spaghetti Code

* tangled control flow
* unreadable logic structure
* hard maintenance

### God Object

* too many responsibilities
* central system hub
* difficult testing

### Hard Coding

* fixed inline values
* low flexibility
* painful updates

### DRY Violation

* duplicated logic
* inconsistent updates
* more bug risk

### Gold Plating

* unnecessary features
* over engineered design
* wasted effort

## Spaghetti Code Issues

* nested logic chaos
* unclear execution flow
* debugging difficulty

## God Object Issues

* single massive class
* multiple responsibilities
* high dependency risk

## Hard Coding Issues

* static embedded values
* poor configurability
* deployment rigidity

## DRY Violation Issues

* repeated implementations
* inconsistent behavior
* higher maintenance cost

## Gold Plating Issues

* excessive complexity
* unused features
* slow delivery

## Recognition Signs

* large classes
* repeated code blocks
* complex conditionals
* scattered constants
* over engineered modules

## Prevention Principles

* single responsibility principle
* extract reusable logic
* use configuration layers
* continuous refactoring
* composition over inheritance

## Null Object Pattern

### Core Idea

* replaces null checks
* uses polymorphism
* safe default object

### Problem with Null

* runtime null errors
* repeated condition checks
* fragile code behavior

### Solution Approach

* return default object
* implement same interface
* eliminate null checks

### Benefits

* cleaner client code
* safer execution flow
* better maintainability
* consistent behavior

### Usage Examples

* empty logger object
* no operation command
* null payment handler
* default fallback behavior

### Comparison

* null requires checks
* null object safe calls
* polymorphism based design

### Design Principle

* replace conditionals
* use polymorphism
* simplify client logic

## Summary

* avoid harmful patterns
* prefer clean structure
* use safe abstractions
