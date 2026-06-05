---
title: Idempotent APIs
articleSlug: idempotent-api
---

# Idempotent APIs

## Core Concept

* Same result repeated calls
* Safe repeated execution
* Prevent duplicate side effects
* Critical distributed systems

## Elevator Analogy

* Button pressed multiple times
* Only one elevator arrives
* Request already registered

## Mathematical Idea

* Operation repeat safe
* Result unchanged
* After first execution

## Real World Examples

### Idempotent Actions

* Turn light ON
* Turn light OFF
* Delete file
* Set username value

### Non Idempotent Actions

* Increment counter
* Add money repeatedly
* Create new order
* Generate new ID

## Distributed System Reality

* Network failures
* Request timeouts
* Lost responses
* Automatic retries
* Duplicate messages

## Core Problem

* Client retries request
* Server uncertain state
* Duplicate execution risk
* Inconsistent system state

## Dangerous Domains

* Payments processing
* Order creation
* Ticket booking
* Inventory deduction
* Bank transfers

## Duplicate Request Causes

### Network Timeouts

* Response lost
* Client retries request

### User Double Clicks

* Button clicked repeatedly

### Automatic Retries

* SDK retries
* Proxy retries
* Load balancer retries

### Message Queue Redelivery

* At least once delivery
* Message redelivered

### Service Failures

* Crash after processing
* Response not returned

## Goal of Idempotency

* Safe request retries
* Consistent final state
* Prevent duplicate effects

## HTTP Method Semantics

### Idempotent Methods

* GET read only
* PUT replace resource
* DELETE remove resource
* HEAD metadata request

### Non Idempotent Methods

* POST create resource
* PATCH partial update

## PUT Idempotency

* Replace full resource
* Same final state repeated

## POST Behavior

* Creates new resource
* Multiple executions create duplicates

## Core Solution

* Idempotency key usage
* Unique request identifier
* Server stores request result

## Idempotency Key

### Client Role

* Generate unique key
* Attach request header

### Server Role

* Store processed keys
* Return stored response

## Idempotency Workflow

### First Request

* Key not found
* Execute business logic
* Store response result
* Return success response

### Retry Request

* Key already exists
* Skip business logic
* Return cached response

## Internal Processing Steps

* Extract idempotency key
* Lookup key storage
* Check processed status
* Execute if new
* Return stored response

## Storage Options

### Database Table

* Idempotency key column
* Response body stored
* Status code stored

### Redis Cache

* Fast key lookup
* Temporary storage
* TTL expiration

## Stateless API Conflict

* REST prefers stateless
* Idempotency requires storage
* Processed keys remembered

## Payment Systems

* Prevent double charges
* Handle retry safely
* Financial correctness required

## Microservices Challenges

* Multiple service hops
* Retry amplification
* Duplicate request propagation

## Microservice Architecture

* Client request
* API gateway routing
* Service processing chain
* Downstream service calls

## Message Queue Systems

### Delivery Guarantee

* At least once delivery
* Duplicate messages possible

### Consumer Requirement

* Consumers must be idempotent
* Detect processed events

## Idempotency Strategies

### Idempotency Keys

* Client generated identifiers
* Stored request responses

### Natural Idempotency

* Operations inherently safe
* State replacement operations

### Database Constraints

* Unique transaction ID
* Prevent duplicate inserts

### Distributed Locks

* Prevent concurrent execution
* Control critical sections

### Event Deduplication

* Store processed event IDs
* Ignore duplicates

## Exactly Once Myth

### Exactly Once Delivery

* Extremely difficult distributed systems

### Practical Industry Solution

* At least once delivery
* Idempotent consumers

## Idempotency Window

* Keys stored temporarily
* Prevent storage explosion

### Typical Windows

* Payments 24 hours
* Orders few hours
* APIs minutes hours

## Race Conditions

* Concurrent identical requests
* Same idempotency key

## Atomic Solutions

* Database transactions
* Unique constraints
* Redis SETNX
* Distributed locks

## Redis Approach

* SETNX command usage
* Only first request accepted

## REST API Best Practices

* Prefer PUT updates
* Use idempotency keys
* Return identical responses
* Preserve status codes

## Food Delivery Example

* Order request timeout
* Client retry request
* Duplicate order risk

## E Commerce Flow

* Place order
* Payment processing
* Inventory deduction
* Shipping initiation

## Retries and Reliability

* Retries essential systems
* Dangerous without idempotency
* Safe with idempotent design

## Event Driven Systems

* Duplicate event delivery
* Consumers ignore duplicates
* Store processed events

## Event Deduplication Storage

* Event ID primary key
* Check before processing

## Common Mistakes

### Weak Key Generation

* Non unique identifiers
* Collision risks

### Timestamp Keys

* Collision possible

### Concurrent Execution

* Race conditions possible

### Infinite Storage

* Idempotency store growth

### Response Inconsistency

* Different responses duplicates

## Idempotency vs Transactions

### Transactions

* Database atomic operations
* Prevent partial writes

### Idempotency

* Distributed retry safety
* Prevent duplicate execution

## Performance Costs

* Extra storage usage
* Duplicate lookup checks
* Cache infrastructure
* Cleanup jobs required

## Advanced Architecture

* Client request
* API gateway validation
* Redis key store
* Business service execution
* Database persistence

## Financial System Importance

* Banking transactions
* Card payments
* Wallet deductions
* UPI transfers
* Trading systems

## Mental Model

* Request already processed
* If yes return stored result
* Avoid executing again

## Critical Usage Domains

* Payment systems
* Order processing
* Inventory systems
* Banking infrastructure
* Messaging systems
* Distributed workflows

## Final Workflow

* Client generate key
* Server check key store
* Execute if new request
* Store response result
* Return cached response

## Key Takeaways

* Idempotency ensures retry safety
* Prevents duplicate operations
* Uses unique request keys
* Essential distributed systems
* Critical financial reliability
