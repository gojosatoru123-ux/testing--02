---
title: Proxy Design Pattern
articleSlug: lld-proxy-design-pattern
---

# Proxy Design Pattern

## Overview

* Structural design pattern
* Surrogate object
* Access control layer
* Proxy stands between
* Client and real object

## Core Idea

* Intercept requests
* Forward selectively
* Add behavior
* Hide complexity
* Control access

## Why Use Proxy

* Security checks
* Lazy loading
* Remote access
* Caching results
* Logging actions
* Validation logic

## Basic Flow

* Client calls proxy
* Proxy evaluates request
* Proxy may block
* Proxy may create
* Proxy forwards request

## Main Participants

### Client

* Requests service
* Talks to proxy

### Proxy

* Intermediary object
* Controls access
* Adds extra logic

### Real Subject

* Performs real work
* Holds actual behavior

## Common Characteristics

* Same interface
* Has real reference
* Transparent substitution
* Delegation support
* Extra pre logic

## Proxy Types

### Virtual Proxy

* Lazy loading
* Delayed creation
* Heavy object startup
* On-demand instantiation

### Protection Proxy

* Permission checking
* Gatekeeper role
* Restricted access
* Authorization control

### Remote Proxy

* Remote object representation
* Network abstraction
* Local interface
* Communication hiding

## Virtual Proxy

* Expensive object delayed
* Create only when needed
* Save startup cost
* Reduce wasted work

### Example

* Large image loading
* Load on display
* Reuse loaded object

## Protection Proxy

* Check user rights
* Deny unauthorized access
* Protect sensitive resources
* Enforce permissions

### Example

* Premium document
* Admin dashboard
* Confidential file
* Paid feature

## Remote Proxy

* Represent distant object
* Hide network details
* Simplify communication
* Local-like usage

### Example

* Remote service access
* API gateway style
* Socket complexity hidden

## Structure

* Subject interface
* Proxy implementation
* Real subject
* Client usage
* Shared contract

## How It Works

* Same interface
* Proxy wraps object
* Proxy intercepts call
* Proxy delegates work
* Result returns

## Benefits

* Better access control
* Lazy initialization
* Cleaner client code
* Centralized cross-cutting logic
* Performance improvements

## Drawbacks

* Extra indirection
* More classes
* Small overhead
* Added complexity
* Harder tracing

## Proxy vs Decorator

* Proxy controls access
* Decorator adds features
* Proxy protects object
* Decorator enhances object

## Proxy vs Adapter

* Proxy keeps interface
* Adapter changes interface
* Proxy manages access
* Adapter converts formats

## Proxy vs Facade

* Proxy represents object
* Facade simplifies subsystem
* Proxy controls access
* Facade simplifies usage

## Real-World Uses

* Image viewers
* Secure documents
* Remote APIs
* Cache layers
* Audit logging

## When to Use

* Expensive object creation
* Access restrictions needed
* Remote resources involved
* Caching required
* Extra validation needed

## When Not to Use

* Simple objects
* No access control
* Low complexity
* Direct access sufficient

## Key Takeaway

* Stand-in object
* Same interface
* Controlled access
* Flexible behavior
* Clean separation
