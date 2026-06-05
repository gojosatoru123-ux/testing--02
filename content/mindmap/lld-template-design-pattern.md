---
title: Template Method Design Pattern
articleSlug: lld-template-method-design-pattern
---

# Template Method Design Pattern

## Overview

* Behavioral design pattern
* Fixed algorithm skeleton
* Customizable steps
* Controlled execution order
* Reduce duplication

## Core Idea

* Parent defines flow
* Subclasses fill details
* Structure stays same
* Steps vary safely
* Template method controls order

## Why It Matters

* Prevent wrong sequences
* Remove repeated workflow logic
* Enforce consistent process
* Support extensibility
* Improve maintainability

## Real-World Analogy

* Master recipe
* Fixed cooking steps
* Variable ingredients
* Same final structure
* Different step details

## Problem Solved

* Wrong step order
* Huge duplicate workflows
* Messy conditionals
* Inconsistent process flow
* Hard to maintain

## Main Participants

### Abstract Class

* Defines skeleton
* Holds template method
* Provides common steps

### Template Method

* Fixed workflow
* Calls steps in order
* Usually non-overridable

### Abstract Steps

* Must be implemented
* Vary by subclass
* Core differences

### Default Steps

* Shared behavior
* Base implementation
* Optional override

### Hooks

* Optional extension points
* Empty by default
* Before or after actions

### Concrete Subclass

* Specialized behavior
* Implements variations
* Keeps flow intact

## Workflow Example

* Load data
* Preprocess data
* Train model
* Evaluate model
* Save model

## State of Steps

### Abstract Step

* Required implementation
* Subclass responsibility

### Concrete Step

* Shared logic
* Base behavior

### Hook Step

* Optional customization
* No-op default

## UML Structure

* Abstract trainer
* Template pipeline
* Concrete trainers
* Shared workflow
* Custom steps

## Example Domains

* ML training
* Report generation
* Document parsing
* Payment processing
* Game levels

## Key Benefits

* Fixed order
* Reusable workflow
* Less duplication
* Easier extension
* Safer execution

## Drawbacks

* Inheritance based
* Less flexible
* More subclass overrides
* Can become rigid

## Template Method vs Strategy

* Template Method fixes flow
* Strategy swaps algorithms
* Template uses inheritance
* Strategy uses composition

## Template Method vs Factory

* Template controls steps
* Factory creates objects
* Different responsibilities

## Common Use Cases

* Training pipelines
* Export flows
* Authentication flows
* Import workflows
* Report builders

## Best When

* Process is stable
* Step order matters
* Some steps vary
* Shared workflow exists
* Subclasses differ only partly

## Avoid When

* No fixed skeleton
* Runtime algorithm swapping
* Too much inheritance
* Small simple tasks

## Common Mistakes

* Overriding template method
* Bloated base class
* Too many hooks
* Wrong abstraction
* Unclear step boundaries

## Key Takeaway

* Define flow once
* Customize selected steps
* Keep execution order
* Reuse workflow structure
* Subclasses fill details
