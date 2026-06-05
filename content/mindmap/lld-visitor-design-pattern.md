---
title: Visitor Design Pattern
articleSlug: lld-visitor-design-pattern
---

# Visitor Design Pattern

## Overview

* Behavioral design pattern
* Separate operations from objects
* Stable structure
* Changing algorithms
* Double dispatch

## Core Idea

* Keep elements stable
* Move operations out
* Add new visitors
* Avoid modifying elements
* Visit object types

## Why It Exists

* Growing operations
* Bloated classes
* Repeated method additions
* Hard maintenance
* OCP violation
* SRP violation

## Problem

* TextFile methods grow
* Image methods grow
* Video methods grow
* Class responsibilities expand
* Code becomes fragile

## Main Parts

### Element

* Stable object structure
* Accept visitor method

### Visitor

* Operation interface
* Visit each element type

### Concrete Element

* TextFile
* Image
* Video

### Concrete Visitor

* Compress visitor
* Size visitor
* Virus scan visitor

## Double Dispatch

* Two runtime decisions
* Element type matters
* Visitor type matters
* Correct overload selected
* Core mechanism

## Accept and Visit Flow

* Client calls accept
* Element calls visit
* Visitor executes logic
* Correct method chosen
* Operation completed

## Element Hierarchy

* Represents data objects
* Rarely changes
* Stable classes
* Document types
* Tree nodes

## Visitor Hierarchy

* Represents algorithms
* Changes often
* New operations
* Separate class family

## Example Domains

### Documents

* TextFile
* Image
* Video
* Compress
* Export
* Scan

### Compiler AST

* IfStatement
* WhileLoop
* FunctionCall
* Type check
* Code generation

### Game Engines

* Player
* Enemy
* Tree
* Render
* Physics

## Benefits

* Easy new operations
* Cleaner element classes
* Better organization
* Supports OCP
* Good for collections

## Drawbacks

* Hard new elements
* More boilerplate
* Strong coupling
* Complex learning
* Many visit methods

## Visitor vs Strategy

* Visitor adds operations
* Strategy swaps algorithms
* Visitor uses double dispatch
* Strategy uses composition

## Visitor vs Command

* Visitor across structures
* Command encapsulates requests
* Visitor type-based behavior
* Command action-based behavior

## Best Use Cases

* Stable object hierarchy
* Many operations
* Tree traversal
* Document processing
* Compilers

## Poor Fit

* Frequent element changes
* Small systems
* Simple polymorphism enough
* Unstable hierarchy

## Real-World Analogies

* Doctor visiting patients
* Tax inspector checking places
* Operation per object type
* Different logic per element

## Key Takeaway

* Separate operations
* Keep structure stable
* Add visitors freely
* Use double dispatch
* Preserve clean classes
