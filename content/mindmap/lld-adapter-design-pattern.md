---
title: Adapter Design Pattern
articleSlug: lld-adapter-design-pattern
---

# Adapter Design Pattern

## Core Idea

* Interface translation
* Compatibility bridge
* Integration helper
* External system wrapper
* Legacy system bridge

## Real-World Analogy

### Power Adapter

* Different socket shapes
* Compatibility conversion
* No charger modification
* No socket modification

### Universal Translator

* Language conversion
* Communication bridge
* Isolated translation

## Main Purpose

* Connect incompatible interfaces
* Hide external differences
* Protect application code
* Enable reuse
* Reduce coupling

## Problems Solved

### Interface Mismatch

* Different method names
* Different data formats
* Legacy APIs
* Third-party libraries

### Common Scenarios

* XML to JSON
* Old API integration
* Payment gateway wrapping
* File format conversion

## Core Principle

* Convert interface
* Preserve existing code
* Isolate incompatibility
* Stable application boundary

## Key Components

### Client

* Uses target interface
* Application code
* Business logic consumer

### Target

* Expected interface
* Standard contract
* Stable abstraction

### Adaptee

* Existing incompatible class
* External dependency
* Legacy implementation

### Adapter

* Translation layer
* Interface bridge
* Delegation component

## Adapter Workflow

### Request Flow

* Client calls adapter
* Adapter calls adaptee
* Adapter converts result
* Client receives expected format

### Translation Responsibilities

* Data conversion
* Interface mapping
* Request delegation
* Response transformation

## Tight Coupling Problem

### Direct Dependency Issues

* Hard provider replacement
* Difficult migration
* Poor testability
* Ripple-effect changes

### Adapter Solution

* Stable abstraction layer
* External isolation
* Cleaner architecture
* Easier maintenance

## Adapter Types

### Object Adapter

#### Characteristics

* Composition-based
* Holds adaptee reference
* Delegates operations
* Most common approach

#### Benefits

* Flexible design
* Easy replacement
* Better maintainability
* Language independent

### Class Adapter

#### Characteristics

* Inheritance-based
* Multiple inheritance usage
* Direct adaptee extension

#### Limitations

* Less flexible
* Rigid structure
* Language restrictions

## Composition vs Inheritance

### Composition

* Has-a relationship
* Higher flexibility
* Easier extension
* Preferred approach

### Inheritance

* Is-a relationship
* Tighter coupling
* Less adaptable

## XML to JSON Example

### Client Expectation

* getJsonData()

### Existing Provider

* getXmlData()

### Adapter Role

* Fetch XML
* Convert format
* Return JSON

## Legacy System Integration

### Common Uses

* Old backend systems
* Legacy databases
* Outdated APIs
* Monolithic migrations

### Benefits

* Gradual modernization
* Reduced rewrites
* Safer migration

## Third-Party Integration

### Examples

* Payment providers
* SMS gateways
* Email services
* Analytics SDKs

### Adapter Benefits

* Unified interfaces
* Provider swapping
* Vendor isolation

## Real System Use Cases

### Payment Systems

* Stripe wrapper
* PayPal integration
* Unified payment API

### Notification Services

* SMS abstraction
* Email provider adapters
* Push notification wrappers

### File Converters

* XML → JSON
* CSV → objects
* Binary → readable format

### Hardware Drivers

* Protocol translation
* Device compatibility
* Command conversion

## Adapter vs Other Patterns

### Adapter vs Factory

* Factory creates objects
* Adapter translates interfaces

### Adapter vs Decorator

* Adapter changes interface
* Decorator adds behavior

### Adapter vs Proxy

* Adapter enables compatibility
* Proxy controls access

## Benefits

### Compatibility

* Connects incompatible systems
* Interface standardization

### Reusability

* Existing code reuse
* Legacy preservation

### Decoupling

* Stable client interface
* External isolation

### Flexibility

* Easy provider swapping
* Simplified upgrades

### Cleaner Architecture

* Centralized translation
* Reduced scattered logic

## Drawbacks

### Extra Abstraction

* Additional layer
* More indirection

### Increased Complexity

* Additional classes
* More navigation

### Maintenance Overhead

* Multiple adapters
* Conversion management

## Common Mistakes

### Business Logic Inside Adapter

* Violates responsibility
* Bloated adapters

### Overusing Adapters

* Unnecessary abstraction
* Architecture clutter

### Exposing Adaptee

* Breaks encapsulation
* Reduces decoupling

### Generic Adapters

* Reduced clarity
* Weak specialization

## Best Practices

### Keep Adapters Focused

* Translation only
* No business rules

### Depend on Interfaces

* Stable contracts
* Flexible integrations

### Use Composition

* Better maintainability
* Easier replacement

### Isolate External APIs

* Vendor independence
* Safer migrations

## When to Use

### Ideal Cases

* Interface mismatch
* Third-party integration
* Legacy compatibility
* Data conversion
* API standardization

## When Not to Use

### Avoid If

* Interfaces already compatible
* Conversion trivial
* Unnecessary abstraction
* No long-term value

## Design Goals

### Maintainability

* Cleaner boundaries
* Easier upgrades

### Flexibility

* Replaceable providers
* Independent systems

### Scalability

* Modular integrations
* Reusable connectors

## Key Takeaways

### Adapter Purpose

* Interface translator
* Compatibility layer
* Decoupling mechanism

### Core Strength

* Reuse existing systems
* Protect application code
* Simplify integrations

### Architectural Value

* Stable boundaries
* Cleaner dependencies
* Safer migrations

## Final Insight

* Software power converter
* Connects incompatible pieces
* No internal modification
* Seamless interoperability
