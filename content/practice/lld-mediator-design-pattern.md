---
title: Mediator Design Pattern
articleSlug: lld-mediator-design-pattern
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: mediator-pattern, lld, design-patterns

What is the Mediator Design Pattern?

<!-- ANSWER -->
The Mediator Design Pattern centralizes communication between multiple objects using a mediator object.

Instead of objects communicating directly:

```text
Object A ↔ Object B ↔ Object C
```

Mediator provides:

```text id="4m8qza"
Objects → Mediator → Objects
```

Benefits:

| Benefit                   | Explanation                                  |
| ------------------------- | -------------------------------------------- |
| Reduced coupling          | Objects do not depend directly on each other |
| Centralized communication | Easier interaction management                |
| Better maintainability    | Simplified object relationships              |

The Mediator Pattern is a behavioral design pattern.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: mediator-pattern, object-communication, lld

What problem does the Mediator Pattern solve?

<!-- ANSWER -->
Direct communication between many objects creates tightly coupled systems.

Example problem:

```text id="6m2xqc"
Chat users directly connected to every other user
```

Problems:

* complex dependencies
* difficult maintenance
* hard scalability

Mediator solution:

```text id="uoeaqr"
Centralized communication coordinator
```

Benefits:

| Benefit                  | Explanation             |
| ------------------------ | ----------------------- |
| Simplified communication | One interaction hub     |
| Loose coupling           | Independent components  |
| Easier extensibility     | Add participants easily |

Mediator reduces communication complexity in large systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: mediator-pattern, components, lld

What are the main components of the Mediator Pattern?

<!-- ANSWER -->
The Mediator Pattern contains:
- Mediator
- ConcreteMediator
- Colleague objects

Architecture:

```text
Colleagues ↔ Mediator
```

Responsibilities:

| Component        | Purpose                         |
| ---------------- | ------------------------------- |
| Mediator         | Defines communication interface |
| ConcreteMediator | Coordinates interactions        |
| Colleague        | Communicates via mediator       |

Example:

```text id="6p1qxt"
Button → DialogMediator → TextBox
```

Colleagues avoid direct references to one another.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: ui-systems, mediator-pattern, lld

How is the Mediator Pattern used in UI systems?

<!-- ANSWER -->
UI components often interact in complex ways.

Example:

```text id="5m2xqc"
Button click updates:
- TextBox
- Dropdown
- Checkbox
```

Without Mediator:

```text id="8w4qza"
Every component directly communicates with others
```

Mediator solution:

```text id="vz0mxa"
DialogMediator coordinates all interactions
```

Benefits:

| Benefit                        | Explanation           |
| ------------------------------ | --------------------- |
| Reduced component dependencies | Cleaner UI logic      |
| Centralized workflows          | Easier maintenance    |
| Better scalability             | Add components easily |

GUI frameworks commonly use Mediator internally.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: chat-systems, mediator-pattern, distributed-systems

How is the Mediator Pattern useful in chat systems?

<!-- ANSWER -->
In chat systems, users should not directly manage communication with every participant.

Without Mediator:

```text id="clt6p5"
Every user connected to every other user
```

Mediator solution:

```text id="2v7qwr"
Users → ChatRoomMediator
```

Benefits:

| Benefit                  | Explanation                            |
| ------------------------ | -------------------------------------- |
| Simplified communication | Central message routing                |
| Better scalability       | Easier participant management          |
| Reduced coupling         | Users unaware of each other internally |

Chat rooms are classic real-world examples of the Mediator Pattern.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: mediator-vs-observer, design-patterns, lld

What is the difference between Mediator and Observer Design Patterns?

<!-- ANSWER -->
Mediator centralizes communication logic.

Observer distributes event notifications to subscribers.

Comparison:

| Mediator | Observer |
|---|---|
| Centralized coordination | Publish-subscribe mechanism |
| Controls object interactions | Broadcasts state changes |
| Colleagues communicate indirectly | Observers react independently |

Example Mediator:

```text id="4q2xmc"
DialogMediator controls UI interactions
```

Example Observer:

```text id="nh6dzq"
Subscribers notified about stock updates
```

Both reduce coupling but solve different communication problems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: workflow-orchestration, mediator-pattern, backend-systems

How is the Mediator Pattern useful in workflow orchestration?

<!-- ANSWER -->
Backend workflows often require coordination between multiple services.

Example:

```text id="4v8qpd"
OrderService
↓
PaymentService
↓
InventoryService
↓
NotificationService
```

Mediator solution:

```text id="5w2qwc"
WorkflowMediator coordinates all interactions
```

Benefits:

| Benefit                      | Explanation          |
| ---------------------------- | -------------------- |
| Centralized workflow logic   | Easier orchestration |
| Reduced service dependencies | Better modularity    |
| Improved maintainability     | Cleaner coordination |

Mediator is useful in complex orchestration systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: mediator-pattern, microservices, software-architecture

How does the Mediator Pattern help in microservices architecture?

<!-- ANSWER -->
Microservices often require coordination across multiple independent services.

Without Mediator:

```text id="6m3qpd"
Every service directly communicates with many others
```

Problems:

* service dependency explosion
* difficult monitoring
* tight coupling

Mediator solution:

```text id="2p8qza"
Orchestrator Service / Event Coordinator
```

Benefits:

| Benefit                     | Explanation                |
| --------------------------- | -------------------------- |
| Centralized coordination    | Easier workflow management |
| Reduced direct dependencies | Cleaner service boundaries |
| Better observability        | Simplified monitoring      |

API orchestration layers often resemble Mediator implementations.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: mediator-pattern, coupling, software-design

How does the Mediator Pattern reduce coupling?

<!-- ANSWER -->
Without Mediator:

```text id="1q8vza"
Objects directly reference each other
```

With Mediator:

```text id="rzdmjt"
Objects only know the mediator
```

Benefits:

| Benefit              | Explanation                     |
| -------------------- | ------------------------------- |
| Fewer dependencies   | Cleaner architecture            |
| Easier modifications | Components evolve independently |
| Better testability   | Mock mediator interactions      |

Mediator isolates communication logic from business objects.

This significantly improves maintainability in complex systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: mediator-pattern, trade-offs, software-design

What are the trade-offs of using the Mediator Pattern?

<!-- ANSWER -->
The Mediator Pattern improves communication management but may centralize too much logic.

Advantages:

| Advantage | Explanation |
|---|---|
| Reduced coupling | Independent components |
| Centralized communication | Easier coordination |
| Better maintainability | Cleaner relationships |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| Complex mediator | Risk of God Object |
| Centralized bottleneck | Single coordination layer |
| Harder debugging | Indirect interactions |

Example:

```text id="7v2xpd"
Many colleagues depend on one mediator
```

Mediator works best when:

* communication complexity is high
* interactions are difficult to manage directly
* centralized coordination improves clarity

<!-- END -->