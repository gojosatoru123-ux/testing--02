---
title: State Design Pattern
articleSlug: lld-state-design-pattern
---

# State Design Pattern

## Overview

* Behavioral pattern
* State-driven behavior
* Internal state changes
* Behavior appears class-based

## Core Idea

* Behavior depends on state
* Separate state classes
* Context delegates actions
* Transition changes behavior

## When Useful

* Multiple object states
* State-specific behavior
* Large conditional blocks
* Clean SRP design
* Better OCP support

## Problem Solved

* Huge if-else chains
* Repeated state checks
* Messy monolithic classes
* Hard transitions
* Difficult maintenance

## Example: Vending Machine

* No coin
* Has coin
* Dispensing
* Sold out

## Main Participants

### Context

* Holds current state
* Forwards requests
* Updates transitions
* Example: vending machine

### State Interface

* Declares operations
* Common behavior contract
* Shared method set

### Concrete States

* Specific state behavior
* Handle one state
* Decide transitions

## State Behavior

* Allow action
* Reject action
* Change state
* Stay same state

## Common Operations

* Insert coin
* Select item
* Dispense item
* Return coin
* Refill machine

## State Transitions

* No coin to coin
* Coin to dispense
* Dispense to no coin
* Sold out to ready

## Why Context Stays Simple

* Stores state only
* Delegates logic
* No big conditions
* Cleaner responsibilities

## Real-World Analogy

* Human behavior changes
* Resting
* Working
* Sleeping
* Eating

## Other Examples

* ATM states
* Document states
* Media player states
* Order processing states

## Benefits

* Cleaner code
* Better readability
* Easier maintenance
* Fewer conditionals
* SRP friendly
* OCP friendly

## Drawbacks

* More classes
* More boilerplate
* Harder setup
* Overkill for small cases

## State vs Strategy

* State changes internally
* Strategy chosen externally
* State driven by lifecycle
* Strategy driven by selection

## State vs Simple Field

* Field stores value
* State stores behavior
* State models transitions
* Field alone is not enough

## Design Principles

* SRP support
* OCP support
* DIP support
* Encapsulated transitions
* Modular behavior

## Common Mistakes

* Logic in context
* Too many responsibilities
* Missing transitions
* Overengineering small problems
* Confusing with strategy

## Key Takeaway

* State controls behavior
* Behavior changes dynamically
* Separate classes per state
* Cleaner state machines
