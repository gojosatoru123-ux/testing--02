---
title: Factory Design Pattern
articleSlug: lld-factory-design-pattern
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: factory-pattern, lld, design-patterns

What is the Factory Design Pattern?

<!-- ANSWER -->
The Factory Design Pattern provides a centralized way to create objects without exposing object creation logic.

Instead of:

```text
new Car()
new Bike()
```

Factory provides:

```text id="4m8qza"
VehicleFactory.createVehicle()
```

Benefits:

| Benefit                | Explanation                              |
| ---------------------- | ---------------------------------------- |
| Encapsulation          | Hide object creation logic               |
| Loose coupling         | Client independent from concrete classes |
| Better maintainability | Centralized creation process             |

The Factory Pattern is a creational design pattern.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: object-creation, factory-pattern, lld

What problem does the Factory Pattern solve?

<!-- ANSWER -->
Direct object creation tightly couples clients to concrete classes.

Example problem:

```text id="6m2xqc"
if(type == "car")
  return new Car()
```

Problems:

* duplicated creation logic
* difficult scalability
* tight dependencies

Factory solution:

```text id="uoeaqr"
Factory decides which object to create
```

Benefits:

| Benefit                   | Explanation          |
| ------------------------- | -------------------- |
| Centralized creation      | Cleaner architecture |
| Easier extension          | Add new types easily |
| Reduced client complexity | Simpler usage        |

Factory simplifies dynamic object creation.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: factory-pattern, polymorphism, lld

How does the Factory Pattern use polymorphism?

<!-- ANSWER -->
Factories usually return interface or abstract types instead of concrete classes.

Example:

```text id="6p1qxt"
Vehicle vehicle = Factory.create()
```

Possible objects:

* Car
* Bike
* Truck

Benefits:

| Benefit              | Explanation                     |
| -------------------- | ------------------------------- |
| Loose coupling       | Client unaware of concrete type |
| Runtime flexibility  | Dynamic object selection        |
| Better extensibility | New implementations supported   |

Polymorphism allows factories to return interchangeable objects.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: simple-factory, factory-method, design-patterns

What is the difference between Simple Factory and Factory Method?

<!-- ANSWER -->
Simple Factory centralizes creation in one class.

Factory Method delegates creation to subclasses.

Comparison:

| Simple Factory | Factory Method |
|---|---|
| Single factory class | Multiple factory subclasses |
| Easier implementation | More extensible |
| Centralized logic | Uses inheritance |

Example Simple Factory:

```text id="5m2xqc"
VehicleFactory.create("car")
```

Example Factory Method:

```text id="8w4qza"
CarFactory.createVehicle()
BikeFactory.createVehicle()
```

Factory Method follows the Open/Closed Principle more effectively.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: factory-vs-builder, design-patterns, lld

What is the difference between Factory and Builder Design Patterns?

<!-- ANSWER -->
Factory focuses on object creation.

Builder focuses on step-by-step object construction.

Comparison:

| Factory | Builder |
|---|---|
| Creates objects directly | Builds complex objects gradually |
| Usually single-step creation | Multi-step configuration |
| Focuses on object type | Focuses on construction process |

Example Factory:

```text id="clt6p5"
VehicleFactory.createCar()
```

Example Builder:

```text id="2v7qwr"
CarBuilder.setEngine().setColor().build()
```

Both are creational patterns but solve different problems.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: dependency-injection, factory-pattern, backend-architecture

How is the Factory Pattern useful in Dependency Injection systems?

<!-- ANSWER -->
Dependency Injection frameworks often use factories to create objects dynamically.

Example:

```text id="4q2xmc"
ServiceFactory → DatabaseService
```

Benefits:

| Benefit                   | Explanation                    |
| ------------------------- | ------------------------------ |
| Dynamic object creation   | Runtime dependency selection   |
| Centralized configuration | Easier dependency management   |
| Better testability        | Mock implementations supported |

Factories are commonly used for:

* service creation
* database connectors
* infrastructure providers

Dependency Injection containers internally rely heavily on factory concepts.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: abstract-factory, design-patterns, lld

What is the Abstract Factory Pattern?

<!-- ANSWER -->
Abstract Factory creates families of related objects without specifying concrete classes.

Example:

```text id="4v8qpd"
GUIFactory
 ├── WindowsFactory
 └── MacFactory
```

Each factory creates related components:

* buttons
* checkboxes
* text fields

Benefits:

| Benefit                    | Explanation                 |
| -------------------------- | --------------------------- |
| Consistent object families | Compatible components       |
| Platform independence      | Swap entire families easily |
| Better scalability         | Extend product ecosystems   |

Abstract Factory is an advanced creational pattern built on factory principles.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: factory-pattern, backend-systems, lld

How is the Factory Pattern used in backend systems?

<!-- ANSWER -->
Backend systems often create different implementations based on configuration or runtime conditions.

Examples:
- database providers
- cache providers
- message brokers

Example:

```text id="6m3qpd"
CacheFactory
 ├── RedisCache
 └── MemoryCache
```

Benefits:

| Benefit                    | Explanation                  |
| -------------------------- | ---------------------------- |
| Infrastructure abstraction | Hide implementation details  |
| Runtime flexibility        | Switch providers dynamically |
| Easier maintenance         | Centralized creation logic   |

Factories are widely used in scalable backend architectures.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: open-closed-principle, factory-pattern, software-design

How does the Factory Pattern support the Open/Closed Principle?

<!-- ANSWER -->
The Open/Closed Principle states:

```text id="1q8vza"
Open for extension, closed for modification
```

Factories support this by allowing new object types without changing client logic.

Example:

```text id="rzdmjt"
Add Truck class without changing client code
```

Benefits:

| Benefit                   | Explanation                 |
| ------------------------- | --------------------------- |
| Easier extensibility      | New products supported      |
| Reduced modification risk | Stable client code          |
| Better scalability        | Cleaner architecture growth |

Factories help isolate creation-related changes.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: factory-pattern, trade-offs, software-design

What are the trade-offs of using the Factory Pattern?

<!-- ANSWER -->
The Factory Pattern improves flexibility but introduces additional abstraction layers.

Advantages:

| Advantage | Explanation |
|---|---|
| Loose coupling | Clients depend on abstractions |
| Centralized creation | Cleaner object management |
| Better extensibility | Easy new implementations |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| More classes | Increased boilerplate |
| Additional abstraction | More architectural complexity |
| Harder debugging | Indirect object creation |

Example:

```text id="7v2xpd"
Client → Factory → Concrete Object
```

Factory is highly valuable in:

* scalable architectures
* plugin systems
* configurable backend systems

<!-- END -->