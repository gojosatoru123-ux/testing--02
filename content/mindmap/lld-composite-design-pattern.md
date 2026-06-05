---
title: Composite Design Pattern
articleSlug: lld-composite-design-pattern
---

# Composite Design Pattern

## Core Idea

* Part-whole hierarchy
* Tree structures
* Uniform treatment
* Single and group
* Same interface

## Problem

* Files and folders
* Different object types
* Repeated type checks
* If-else everywhere
* Hard maintenance

## File System Analogy

* File
* Folder
* Nested folders
* Total size
* Recursive display

## Solution

* Common component
* Leaf objects
* Composite objects
* Child collection
* Delegated operations

## Participants

* Component
* Leaf
* Composite

### Component

* Shared interface
* Common operations
* getName
* getSize
* display

### Leaf

* No children
* Individual item
* Direct behavior
* File example

### Composite

* Contains children
* Stores components
* Delegates work
* Folder example

## Tree Structure

* Root node
* Child nodes
* Nested children
* Recursive hierarchy
* Uniform calls

## Recursion

* Composite calls children
* Children call children
* Stops at leaves
* Natural tree traversal
* Summed results

## File System Example

* Root folder
* Text files
* Docs folder
* Resume file
* Notes file

## Behavior

* Get size
* Display tree
* Move subtree
* Delete subtree
* Same method calls

## Client Simplicity

* No type checks
* One interface
* Cleaner code
* Shorter logic
* Easier usage

## Advantages

* Uniformity
* Simplicity
* Extensibility
* Recursion support
* Reusability
* Less branching

## Drawbacks

* Overly generic
* Harder rules
* Recursive complexity
* Overuse risk
* Extra abstraction

## Common Mistakes

* Separate interfaces
* No recursion
* Too much generality
* Complex child rules
* Unneeded composite

## Real-World Examples

* File systems
* Menus
* Graphic groups
* Organization charts
* UI panels

### Menu System

* Menu item
* Submenu
* Nested options
* Uniform display
* Recursive menu

### Graphics System

* Shape
* Group shape
* Move all
* Draw all
* Nested graphics

## Composite vs Decorator

* Composite: hierarchy
* Decorator: behavior
* Composite: part-whole
* Decorator: add features
* Different intent

## When to Use

* Tree structures
* Nested objects
* Uniform operations
* Recursive behavior
* Part-whole systems

## When Not to Use

* Flat data
* No hierarchy
* No shared behavior
* Simple collections
* Unnecessary complexity

## Implementations

* C++
* Java
* Python

### Shared Design

* FileSystemItem
* File
* Folder
* Children list
* Recursive methods

## Final Takeaway

* Treat single and group equally
* Build tree structures
* Use common interface
* Delegate recursively
* Simplify client code
