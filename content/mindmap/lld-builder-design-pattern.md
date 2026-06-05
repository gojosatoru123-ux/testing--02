---
title: Builder Design Pattern
articleSlug: lld-builder-design-pattern
---

# Builder Design Pattern

## Core Idea

* Step-by-step construction
* Separate construction logic
* Separate final object
* Fluent creation
* Controlled initialization

## Main Problems

* Telescoping constructors
* Too many overloads
* Inconsistent state
* Excessive setters
* Mutable objects

## Telescoping Constructors

* Constructor overload chains
* Hard readability
* Wrong parameter order
* Difficult maintenance
* Poor scalability

### HttpRequest Example

* URL required
* Method required
* Headers optional
* Body optional
* Timeout optional

## Setter Problems

* Partial objects
* Invalid state
* Runtime failures
* Null checks everywhere
* Poor encapsulation

## Mutability Issues

* State changes later
* Accidental modifications
* Concurrency risks
* Unpredictable behavior
* Unsafe shared objects

## Builder Solution

* Builder collects data
* Configure incrementally
* Validate in build
* Create final object
* Immutable result

## Builder Structure

* Product class
* Builder class
* Fluent methods
* build method
* Validation logic

### Main Components

* Product
* Builder
* Required fields
* Optional fields
* Final object

## Fluent Interface

* Method chaining
* Readable syntax
* Self-returning methods
* Compact code
* Natural configuration

### Example Flow

* withUrl
* withMethod
* withHeader
* withBody
* build

## Validation

* Centralized checks
* Required field validation
* Reject invalid combinations
* Normalize values
* Safe construction

## Immutability

* No public setters
* Fixed state
* Thread safety
* Predictable objects
* Safer APIs

## HttpRequest Example

* URL field
* Method field
* Header map
* Body content
* Timeout setting

### Builder Responsibilities

* Store temporary state
* Configure values
* Validate data
* Build final object
* Return immutable object

## Step Builder

* Ordered construction
* Compile-time guidance
* Step interfaces
* Restricted method flow
* Safer sequence

### Step Flow

* start
* withUrl
* withMethod
* Optional settings
* build

## Builder vs Step Builder

* Builder flexible
* Step Builder strict
* Builder simpler
* Step Builder safer
* Compile-time ordering

## Builder vs Constructor

* Builder readable
* Constructor overloaded
* Builder scalable
* Constructor rigid
* Builder supports options

## Builder vs Setter

* Builder validated
* Setter unsafe
* Builder immutable
* Setter mutable
* Builder centralized

## Builder vs Factory

* Factory selects object
* Builder assembles object
* Factory creation focus
* Builder configuration focus

## Real-World Use Cases

* HTTP requests
* Query builders
* Configuration objects
* UI components
* Test data builders
* Document generation

## Advantages

* Readable APIs
* Flexible configuration
* Centralized validation
* Immutable objects
* Easier maintenance
* Cleaner code

## Drawbacks

* More classes
* More boilerplate
* Higher complexity
* Overkill sometimes

## Common Mistakes

* Using for tiny objects
* Missing validation
* Mutable final objects
* Shared mutable builders
* Exposing setters

## When to Use

* Many optional fields
* Complex construction
* Validation needed
* Immutable objects desired
* Ordered setup required

## When Not to Use

* Simple objects
* Few parameters
* Clear constructors
* Minimal setup logic

## Implementations

* C++
* Java
* Python

### Key Concepts

* Builder class
* Product class
* Method chaining
* Validation
* Immutable output

## Final Takeaway

* Build step by step
* Avoid constructor explosion
* Avoid incomplete objects
* Improve readability
* Improve maintainability
