---
title: Facade Design Pattern
articleSlug: lld-facade-design-pattern
---

# Facade Design Pattern

## Core Idea

* Simple unified interface
* Complex subsystem hidden
* Front door access
* Client uses one entry
* Internal complexity stays private

## Problem

* Many subsystem classes
* Complex call order
* Too many dependencies
* Hard client usage
* Fragile integration

## Computer Analogy

* Power button
* CPU startup
* Memory check
* BIOS boot
* OS load

## Solution

* Facade class
* Simplified API
* Orchestrates subsystem
* Hides internal steps
* Reduces client burden

## Participants

* Client
* Facade
* Subsystem classes

### Client

* Uses facade
* Avoids internals
* Calls simple methods
* Stays decoupled

### Facade

* Entry point
* Workflow controller
* Delegates operations
* Hides complexity

### Subsystem

* CPU
* Memory
* BIOS
* Hard drive

## Benefits

* Simpler APIs
* Less coupling
* Better readability
* Easier maintenance
* Cleaner integration

## Principle of Least Knowledge

* Know less
* Interact with facade
* Avoid deep chains
* Reduce dependencies
* Lower ripple effects

## Facade vs Adapter

* Facade simplifies
* Adapter converts
* Facade hides complexity
* Adapter fixes incompatibility
* Different intents

## Facade vs Proxy

* Facade simplifies access
* Proxy controls access
* Different goals
* Different usage
* Different structure

## Facade vs Decorator

* Facade simplifies
* Decorator adds behavior
* Facade hides details
* Decorator wraps features
* Distinct purpose

## Use Cases

* Computer startup
* Payment flow
* Game launch
* Movie mode
* Order placement
* Media conversion

## Examples

* Power button
* Payment gateway
* Start game
* Place order
* Start computer

## Advantages

* Encapsulation
* Loose coupling
* Stable API
* Reusable access
* Clear boundaries

## Drawbacks

* Extra layer
* Oversimplification risk
* God facade risk
* Hidden flexibility
* Possible duplication

## Common Mistakes

* Bloated facade
* Client bypasses facade
* Wrong pattern choice
* Hiding too much
* Using without complexity

## When to Use

* Complex subsystem
* One entry point
* Stable simple API
* Reduced client complexity
* Workflow orchestration

## When Not to Use

* Simple system
* No real complexity
* No workflow hiding
* Unneeded abstraction
* Minimal subsystem

## Implementations

* C++
* Java
* Python

### Shared Structure

* Facade class
* Subsystem classes
* Simple method
* Ordered workflow
* Client access

## Final Takeaway

* One simple interface
* Complex system hidden
* Client stays simple
* Internals stay flexible
* Easy system usage
