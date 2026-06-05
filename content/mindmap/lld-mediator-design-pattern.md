---
title: Mediator Design Pattern
articleSlug: lld-mediator-design-pattern
---

# Mediator Design Pattern

## Core Idea

* Centralized communication
* Encapsulate interactions
* Reduce direct dependencies
* Coordinate object behavior
* Simplify relationships

## Problem

* Many direct links
* Tight coupling
* Complex dependencies
* Hard maintenance
* Poor scalability

## Chaos Analogy

* Busy intersection
* No traffic lights
* Conflicting decisions
* Traffic controller
* Coordinated movement

## Solution

* Introduce mediator
* Colleagues talk through mediator
* Central rules
* Fewer references
* Cleaner design

## Participants

* Mediator
* Concrete mediator
* Colleague
* Concrete colleague

### Mediator

* Communication contract
* Coordinates interactions
* Routes requests
* Applies rules

### Colleague

* Knows mediator only
* Sends requests
* Receives responses
* No direct peer links

## Chat Room Example

* Users in room
* Messages routed centrally
* Broadcast easily
* Private rules possible
* Mute support

## Benefits

* Loose coupling
* Centralized logic
* Easier maintenance
* Better scalability
* Simpler objects

## Drawbacks

* Mediator can grow
* More indirection
* Possible bottleneck
* Central complexity
* Harder tracing

## Use Cases

* Chat apps
* GUI forms
* Air traffic
* Workflow engines
* Matchmaking systems

## GUI Example

* Text fields
* Buttons
* Validation rules
* Enable disable logic
* Form controller

## Mediator vs Observer

* Mediator coordinates
* Observer notifies
* Mediator manages interactions
* Observer broadcasts changes
* Different intent

## Mediator vs Facade

* Mediator coordinates peers
* Facade hides subsystem
* Mediator manages communication
* Facade simplifies access
* Different goals

## Good Practices

* Keep mediator focused
* Avoid direct peer links
* Centralize interaction rules
* Prefer abstraction
* Maintain clear responsibilities

## Common Mistakes

* God mediator
* Direct colleague coupling
* Overusing pattern
* Mixing responsibilities
* Confusing with observer

## SOLID Support

* SRP improved
* OCP easier extension
* DIP via abstraction
* Cleaner collaboration
* Better reuse

## Implementations

* C++
* Java
* Python

### Shared Structure

* Mediator interface
* Concrete mediator
* User class
* send method
* receive method

## Final Takeaway

* Centralize communication
* Reduce object chaos
* Keep colleagues simple
* Improve maintainability
* Coordinate interactions
