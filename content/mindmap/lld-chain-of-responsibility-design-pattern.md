---
title: Chain of Responsibility Design Pattern
articleSlug: lld-chain-of-responsibility-design-pattern
---

# Chain of Responsibility Design Pattern

## Core Idea

* Pass request along chain
* Multiple possible handlers
* Handler decides responsibility
* Forward or process
* Loose coupling

## Main Problem

* Unknown handler
* Large if-else blocks
* Tight coupling
* Hard maintenance
* Rigid request flow

## Request Flow

* Client sends request
* First handler receives
* Handler checks capability
* Process if possible
* Otherwise forward

## Handler Structure

* Next handler reference
* Handle method
* Processing logic
* Forwarding logic
* Chain connection

## Main Participants

* Client
* Request
* Handler
* Concrete handler
* Chain structure

## ATM Example

* Cash withdrawal
* Denomination handlers
* Sequential processing
* Remaining amount forwarding
* Partial handling possible

### ATM Handlers

* ThousandHandler
* FiveHundredHandler
* TwoHundredHandler
* OneHundredHandler

### ATM Flow

* Start largest note
* Dispense possible amount
* Calculate remaining amount
* Forward remaining
* Finish or reject

## Withdrawal Example

* Request ₹4000
* Dispense ₹1000 notes
* Forward remainder
* Dispense ₹500 notes
* Request completed

## Partial Handling Example

* Request ₹150
* Skip larger handlers
* Dispense ₹100
* ₹50 remaining
* Request incomplete

## Why Useful

* Cleaner code
* Modular handlers
* Easier extension
* Better separation
* Flexible pipelines

## SOLID Principles

* Single Responsibility
* Open Closed Principle
* Loose coupling
* Independent handlers
* Easier testing

## Common Use Cases

* ATM systems
* Logging systems
* Leave approvals
* Tech support
* Middleware pipelines
* Event processing

### Logging Example

* Debug handler
* Info handler
* Warning handler
* Error handler

### Approval Example

* Team lead
* Manager
* Director
* Escalation chain

### Support Example

* L1 support
* L2 support
* L3 support
* Escalation routing

## Middleware Pipeline

* Authentication
* Validation
* Authorization
* Logging
* Request processing

## Chain Characteristics

* Sequential handlers
* Dynamic flow
* Optional processing
* Flexible order
* Request delegation

## Chain vs Linked List

* Linked list stores data
* Chain processes requests
* Behavioral focus
* Handler-specific logic
* Responsibility delegation

## Chain vs Command

* Chain routes request
* Command encapsulates request
* Processing pipeline
* Request object focus

## Chain vs Decorator

* Chain finds handler
* Decorator adds behavior
* Request delegation
* Object enhancement

## Advantages

* Loose coupling
* Cleaner organization
* Easier extension
* Reusable handlers
* Reduced conditionals
* Flexible request flow

## Drawbacks

* Harder debugging
* Order dependency
* Unhandled requests
* Complex long chains
* Indirect flow

## Common Mistakes

* Oversized handlers
* Missing chain links
* Wrong chain order
* Business logic in client
* Ignoring chain end

## Handler Responsibilities

* Check request
* Process request
* Forward request
* Maintain next reference
* Isolate logic

## Implementations

* C++
* Java
* Python

### Shared Concepts

* Abstract handler
* Concrete handlers
* setNext method
* handle method
* Request delegation

## When to Use

* Multiple handlers possible
* Unknown receiver
* Dynamic processing flow
* Avoid if-else chains
* Extensible pipelines

## When Not to Use

* Single clear handler
* Very simple logic
* Unnecessary abstraction
* Fixed processing path

## Final Takeaway

* Requests travel chain
* Handlers decide responsibility
* Client stays decoupled
* Flexible processing pipeline
* Easier scalability
