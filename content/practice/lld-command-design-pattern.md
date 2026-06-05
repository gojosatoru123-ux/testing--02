---
title: Command Design Pattern
articleSlug: lld-command-design-pattern
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: command-pattern, lld, design-patterns

What is the Command Design Pattern?

<!-- ANSWER -->
The Command Design Pattern encapsulates a request as an object.

Instead of directly calling methods:

```text
Button → Light.turnOn()
```

the request becomes:

```text id="4m8qza"
Button → Command → Receiver
```

Benefits:

| Benefit           | Explanation                      |
| ----------------- | -------------------------------- |
| Loose coupling    | Sender independent from receiver |
| Undo support      | Commands can be reversed         |
| Queueable actions | Store and replay operations      |

The Command Pattern is a behavioral design pattern.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: command-pattern, request-encapsulation, lld

What problem does the Command Pattern solve?

<!-- ANSWER -->
The Command Pattern separates:
- request sender
- request execution logic

Without Command:

```text id="6m2xqc"
UI Button directly calls business logic
```

With Command:

```text id="uoeaqr"
UI Button → Command Object → Business Logic
```

Benefits:

| Benefit              | Explanation               |
| -------------------- | ------------------------- |
| Better decoupling    | Independent components    |
| Flexible execution   | Delayed or queued actions |
| Easier extensibility | Add new commands easily   |

It is commonly used in UI systems and backend task processing.

<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: command-pattern, lld, object-oriented-design

What are the main components of the Command Pattern?

<!-- ANSWER -->
The Command Pattern contains:
- Command
- ConcreteCommand
- Receiver
- Invoker
- Client

Architecture:

```text
Client → Command → Receiver
         ↑
      Invoker
```

Responsibilities:

| Component       | Purpose                     |
| --------------- | --------------------------- |
| Command         | Defines execution interface |
| ConcreteCommand | Implements request logic    |
| Receiver        | Performs actual work        |
| Invoker         | Triggers command execution  |
| Client          | Creates command objects     |

This separation improves flexibility and maintainability.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: undo-redo, command-pattern, lld

How does the Command Pattern support undo and redo functionality?

<!-- ANSWER -->
Commands encapsulate operations and can store previous state.

Example:

```text id="5m2xqc"
Execute Command
↓
Store History
↓
Undo Command
```

Undo support:

| Operation | Purpose        |
| --------- | -------------- |
| execute() | Perform action |
| undo()    | Reverse action |

Example:

```text id="8w4qza"
TextEditorCommand:
- insert()
- undoInsert()
```

Benefits:

* reversible actions
* command history
* redo support

This is widely used in editors and productivity applications.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: queues, asynchronous-processing, command-pattern

How is the Command Pattern used in task queues?

<!-- ANSWER -->
Task queues store commands for asynchronous execution.

Architecture:

```text id="clt6p5"
Producer → Queue → Worker → Execute Command
```

Examples:

* email sending
* background jobs
* payment processing

Benefits:

| Benefit           | Explanation                |
| ----------------- | -------------------------- |
| Delayed execution | Run tasks later            |
| Retry mechanisms  | Re-execute failed commands |
| Scalability       | Distributed workers        |

Commands naturally represent queueable units of work.

<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: command-vs-strategy, design-patterns, lld

What is the difference between Command and Strategy Design Patterns?

<!-- ANSWER -->
Command encapsulates requests as objects.

Strategy encapsulates algorithms.

Comparison:

| Command | Strategy |
|---|---|
| Represents actions/requests | Represents interchangeable algorithms |
| Can support undo/history | Focuses on behavior selection |
| Often queued or logged | Usually selected dynamically |

Example Command:

```text id="4q2xmc"
DeleteFileCommand
```

Example Strategy:

```text id="nh6dzq"
PaymentStrategy
```

Both patterns use composition but solve different design problems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: event-sourcing, command-pattern, distributed-systems

How is the Command Pattern related to Event Sourcing?

<!-- ANSWER -->
Event Sourcing stores system changes as a sequence of events.

Commands often initiate those events.

Flow:

```text id="4v8qpd"
Command → Validation → Event Creation → Event Store
```

Example:

```text id="5w2qwc"
CreateOrderCommand
↓
OrderCreatedEvent
```

Benefits:

| Benefit                | Explanation                         |
| ---------------------- | ----------------------------------- |
| Auditability           | Complete history tracking           |
| Replay support         | Rebuild system state                |
| Decoupled architecture | Commands separate intent from state |

Commands represent user intent in event-driven architectures.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: command-pattern, cqrs, software-architecture

How does the Command Pattern fit into CQRS architecture?

<!-- ANSWER -->
CQRS separates:
- command operations
- query operations

Commands modify system state.

Architecture:

```text id="6m3qpd"
Command Side → State Changes
Query Side → Data Retrieval
```

Example commands:

* CreateUserCommand
* TransferMoneyCommand

Benefits:

| Benefit            | Explanation                    |
| ------------------ | ------------------------------ |
| Clear separation   | Reads and writes isolated      |
| Better scalability | Independent optimization       |
| Explicit intent    | Structured state modifications |

The Command Pattern is foundational in CQRS systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: macro-commands, command-pattern, lld

What are Macro Commands in the Command Pattern?

<!-- ANSWER -->
Macro Commands combine multiple commands into a single executable unit.

Example:

```text id="1q8vza"
MorningRoutineCommand:
- OpenCurtains
- StartCoffeeMachine
- TurnOnLights
```

Execution:

```text id="rzdmjt"
One command triggers multiple subcommands
```

Benefits:

| Benefit              | Explanation          |
| -------------------- | -------------------- |
| Workflow automation  | Batch operations     |
| Reusable sequences   | Common action groups |
| Simplified execution | Single trigger point |

Macro Commands are useful in:

* automation systems
* workflow engines
* batch processing

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: command-pattern, trade-offs, software-design

What are the trade-offs of using the Command Pattern?

<!-- ANSWER -->
The Command Pattern improves flexibility but introduces additional abstraction.

Advantages:

| Advantage | Explanation |
|---|---|
| Loose coupling | Sender independent from receiver |
| Undo/redo support | Reversible operations |
| Queueable commands | Delayed execution |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| More classes | Increased boilerplate |
| Higher complexity | Extra abstraction layers |
| Memory overhead | Command history storage |

Example:

```text id="7v2xpd"
Invoker → Command → Receiver
```

The Command Pattern is highly valuable in:

* task systems
* workflow engines
* event-driven architectures

<!-- END -->