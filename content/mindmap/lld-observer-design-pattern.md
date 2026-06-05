---
title: Observer Design Pattern
articleSlug: lld-observer-design-pattern
---

# Observer Design Pattern

## Core Idea

* One-to-many relation
* State change notifications
* Automatic updates
* Loose coupling
* Event driven

## Problem

* Repeated polling
* Wasted resources
* Tight coupling
* Hard maintenance
* Poor scalability

## Polling vs Push

* Polling checks repeatedly
* Push notifies on change
* Polling wastes effort
* Push is efficient
* Push is reactive

## Main Roles

* Subject
* Observer

### Subject

* Holds state
* Maintains observers
* Notifies changes
* Manages subscriptions

### Observer

* Receives updates
* Reacts to changes
* Follows subject
* Updates itself

## Workflow

* Observer subscribes
* Subject stores observer
* State changes
* Subject notifies
* Observers update

## YouTube Analogy

* Channel is subject
* Subscribers are observers
* New video uploaded
* Notifications sent
* Users react

## Benefits

* Loose coupling
* Automatic updates
* Easy extension
* Cleaner design
* Dynamic subscriptions

## Use Cases

* YouTube alerts
* Stock dashboards
* GUI buttons
* Weather sensors
* Order tracking

## Push and Pull

* Push notification
* Pull extra details
* Lightweight updates
* Flexible response
* Common design

## Observer Structure

* Subject interface
* Concrete subject
* Observer interface
* Concrete observers
* Subscription list

## Observer vs Polling

* Observer waits passively
* Polling checks actively
* Observer saves resources
* Polling wastes cycles
* Observer scales better

## Observer vs Publish Subscribe

* Observer direct relation
* Pub-sub broker based
* Observer simpler
* Pub-sub more distributed
* Different communication styles

## Observer vs Mediator

* Observer broadcasts changes
* Mediator coordinates interactions
* Observer state focused
* Mediator collaboration focused
* Different intent

## Advantages

* Easy notifications
* Runtime flexibility
* Strong separation
* Scalable reactions
* Reusable observers

## Drawbacks

* Notification overhead
* Debugging harder
* Update order issues
* Unsubscribe mistakes
* Cascading reactions

## Common Mistakes

* Forgetting unsubscribe
* Strong subject dependency
* Heavy observer logic
* Using unnecessarily
* Ignoring errors

## When to Use

* Many dependents
* Frequent changes
* Event driven systems
* Dynamic subscribers
* Decoupled design

## When Not to Use

* Single dependent
* Rare updates
* Simple logic
* Direct communication enough
* Overengineering risk

## Implementations

* C++
* Java
* Python

### Shared Structure

* Subject class
* Observer class
* Notify method
* Update method
* Subscriber list

## Real World Examples

* YouTube channel
* Social feeds
* Stock alerts
* Weather apps
* UI events

## Final Takeaway

* One subject changes
* Many observers react
* Updates happen automatically
* Coupling stays low
* Design stays clean
