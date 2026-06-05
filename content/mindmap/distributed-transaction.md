---
title: Distributed Transactions
articleSlug: distributed-transaction
---

# Distributed Transactions

## Core Idea

* Multiple services one transaction
* Cross database consistency
* Coordinated commit operations
* Atomic distributed workflow

## Traditional Transactions

* Single database system
* ACID guarantees
* Begin commit rollback
* Strong consistency model

### Example Operation

* Money transfer scenario
* Debit account A
* Credit account B
* Single DB transaction

## Distributed System Problem

* Multiple services involved
* Separate service databases
* Network communication required
* Partial failure risk

### Example Services

* Account service
* Payment service
* Ledger service
* Notification service

## Distributed Transaction Definition

* All services succeed together
* Or all services fail
* Atomic cross system operations
* Coordinated transaction outcome

### ACID Properties

* Atomicity all or nothing
* Consistency valid data state
* Isolation concurrent safety
* Durability persistent changes

## Distributed System Challenges

* Network failures possible
* Partial success scenarios
* High latency coordination
* Service crash during execution

## Distributed Transaction Approaches

* Two phase commit
* Three phase commit
* Saga pattern
* Compensation transactions

## Two Phase Commit

* Strong consistency protocol
* Coordinator based system
* Two step transaction process
* Synchronous coordination model

### Components

* Transaction coordinator
* Participant services
* Distributed databases
* Network communication

### Phase One Prepare

* Coordinator ask readiness
* Participants prepare transaction
* Resources temporarily locked
* Vote commit readiness

### Phase Two Commit

* Coordinator sends commit
* All participants commit changes
* Transaction finalized globally
* Or rollback issued

### Advantages

* Strong consistency guarantee
* Deterministic transaction outcome
* Clear coordination protocol
* Atomic distributed commit

### Problems

* Blocking protocol design
* Coordinator failure issue
* High network overhead
* Reduced scalability

## Saga Pattern

* Sequence local transactions
* Event driven workflow
* Eventual consistency model
* Compensation based recovery

### Saga Flow Example

* Reserve funds step
* Create order step
* Reserve inventory step
* Confirm payment step

### Failure Handling

* Undo completed operations
* Execute compensating actions
* Restore system consistency
* Reverse transaction effects

## Saga Architecture

* Independent service transactions
* Event driven coordination
* Local database operations
* Asynchronous service communication

## Saga Execution

* Service executes transaction
* Publish success event
* Next service triggered
* Failure triggers compensation

## Saga Implementation Types

### Choreography Based

* Event driven communication
* No central controller
* Services react events
* Decentralized workflow logic

#### Advantages

* Highly scalable architecture
* Loose service coupling
* No central bottleneck

#### Drawbacks

* Hard debugging flows
* Complex event chains
* Hidden dependencies

### Orchestration Based

* Central workflow controller
* Explicit execution steps
* Service calls orchestrator
* Managed transaction flow

#### Advantages

* Clear workflow control
* Easier monitoring debugging
* Centralized transaction logic

#### Drawbacks

* Orchestrator dependency
* Potential central bottleneck

## Compensation Transactions

* Reverse previous operations
* Restore system consistency
* Logical undo actions
* Failure recovery mechanism

### Examples

* Debit compensation credit
* Inventory release action
* Cancel created order
* Refund payment operation

## E Commerce Example

### Transaction Steps

* Create order
* Charge payment
* Reserve inventory
* Schedule shipment

### Failure Scenario

* Shipment scheduling failure

### Compensation Actions

* Cancel inventory reservation
* Refund customer payment
* Cancel created order

## Eventual Consistency

* Temporary inconsistent state
* System eventually consistent
* Asynchronous updates propagation
* Delayed data synchronization

### Example Scenario

* Order created first
* Payment processed later
* Inventory updated afterward

## Reliable Design Principles

* Idempotent operations design
* Retry mechanisms support
* Message queue communication
* Timeout failure protection
* Monitoring observability systems

## Real World Architecture

* Client API gateway
* Order service entry
* Event bus messaging
* Downstream service processing

### Services

* Payment service
* Inventory service
* Shipping service
* Notification service

## Mental Model

* Group trip planning
* Multiple booking steps
* Flights hotels transport
* Failure cancel bookings
