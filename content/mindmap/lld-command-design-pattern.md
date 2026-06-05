---
title: Command Design Pattern
articleSlug: lld-command-design-pattern
---

# Command Design Pattern

## Core Idea

* Request as object
* Encapsulate action
* Decouple sender
* Decouple receiver
* Trigger behavior

## Problem

* Hard-coded logic
* Many if-else blocks
* Many switch cases
* Tight coupling
* Poor undo support
* Poor queue support

## Smart Remote Example

* Button press
* Light action
* Fan action
* Heater action
* Uniform triggering

## Roles

* Client
* Invoker
* Command
* Receiver

### Client

* Creates objects
* Wires dependencies
* Sets commands
* Knows setup

### Invoker

* Stores command
* Triggers execute
* Calls undo
* Does not know details

### Command

* execute method
* undo method
* Wraps request
* Holds receiver

### Receiver

* Performs work
* Real action
* Business logic
* Device behavior

## Flow

* Client creates receiver
* Client creates command
* Command gets receiver
* Client assigns command
* User presses button
* Invoker calls execute
* Command calls receiver
* Receiver performs action

## Benefits

* Loose coupling
* Runtime flexibility
* Undo support
* Redo support
* Queue support
* Logging support
* Reusable commands

## Use Cases

* Smart home
* Text editor
* Keyboard shortcuts
* Task queues
* Macro recording
* Menu actions

## Undo

* execute performs action
* undo reverses action
* History tracking
* Easy rollback
* Very practical

## Macro

* Sequence of commands
* Replayed operations
* Batch actions
* Automation support
* Ordered execution

## Queues

* Store commands
* Execute later
* Deferred processing
* Background jobs
* Task scheduling

## Runtime Reconfiguration

* Remap buttons
* Swap commands
* No invoker change
* Flexible control
* Easy extension

## Design Principles

* Open Closed Principle
* Single Responsibility
* Separation of concerns
* Encapsulation
* Composition

## Command vs Strategy

* Command: requests
* Strategy: algorithms
* Command: execution
* Strategy: behavior choice

## Command vs Observer

* Command: action object
* Observer: state notifications
* Different goals
* Different triggers
* Different usage

## Advantages

* Cleaner code
* Better extensibility
* Easier testing
* History support
* Strong decoupling

## Drawbacks

* More classes
* More wiring
* More abstraction
* Overkill for simple cases

## Common Mistakes

* Invoker logic misuse
* Overgeneric commands
* Missing undo state
* Broad receivers
* Unnecessary complexity

## When to Use

* Undo needed
* Queue needed
* Replay needed
* Multiple actions
* Dynamic mapping

## When Not to Use

* Very simple action
* No history need
* No queue need
* No reconfiguration need

## Real-World Examples

* Remote controls
* GUI buttons
* Editor commands
* Game actions
* Workflow engines
* Automation tools

## Final Takeaway

* Request becomes object
* Button triggers command
* Device stays hidden
* Flexible architecture
* Practical design pattern
