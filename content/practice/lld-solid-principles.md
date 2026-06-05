---
title: SOLID Principles — Practice Quiz
articleSlug: lld-solid-principles
difficulty: Intermediate
estimatedTime: 25 mins
---
<!-- QUESTION -->
difficulty: Easy
tags: SRP, single-responsibility

A `UserService` class has methods: `createUser()`, `sendWelcomeEmail()`, `exportUsersToCSV()`, and `validatePassword()`. Which methods violate SRP, and how would you fix it?

<!-- ANSWER -->
**Violations:**
- `sendWelcomeEmail()` — email sending is an email concern, not a user data concern
- `exportUsersToCSV()` — report generation is a reporting concern

**Fix — split into focused classes:**

```typescript
class UserRepository {
  createUser(data: CreateUserDto): Promise<User> { /* DB only */ }
  validatePassword(password: string): boolean { /* validation only */ }
}

class EmailService {
  sendWelcomeEmail(user: User): Promise<void> { /* email only */ }
}

class UserReportExporter {
  exportToCSV(users: User[]): string { /* export only */ }
}
```

Each class now has **one reason to change**: `UserRepository` changes when the user schema changes, `EmailService` when email templates change, and `UserReportExporter` when the CSV format changes.
<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: OCP, open-closed

You have a `ShapeAreaCalculator` that uses `switch/case` for Circle, Rectangle, and Triangle. Explain why this violates OCP and refactor it.

<!-- ANSWER -->
**Violation:** Every time a new shape is added (e.g., Hexagon), you must **modify** the existing `calculateArea` function — opening it for change instead of just extension.

```typescript
// Before — violates OCP
function calculateArea(shape: { type: string; [k: string]: number }): number {
  switch (shape.type) {
    case 'circle': return Math.PI * shape.radius ** 2;
    case 'rectangle': return shape.width * shape.height;
    case 'triangle': return 0.5 * shape.base * shape.height;
    default: throw new Error('Unknown shape');
  }
}

// After — OCP compliant
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area() { return Math.PI * this.radius ** 2; }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  area() { return this.width * this.height; }
}

// Adding Hexagon = add a class, touch zero existing code
class Hexagon implements Shape {
  constructor(private side: number) {}
  area() { return (3 * Math.sqrt(3) / 2) * this.side ** 2; }
}

function totalArea(shapes: Shape[]): number {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}
```
<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: LSP, liskov

A `Bird` class has a `fly()` method. `Penguin extends Bird`. Why does this violate LSP, and how do you fix it?

<!-- ANSWER -->
**Violation:** LSP says you should be able to use any `Bird` subtype wherever a `Bird` is expected. But if you call `bird.fly()` and `bird` happens to be a `Penguin`, either the method throws an error or does nothing meaningful — the program breaks.

```typescript
// Violating
class Bird { fly() { /* ... */ } }
class Penguin extends Bird {
  fly() { throw new Error("Penguins can't fly!"); }
}

function makeBirdFly(b: Bird) { b.fly(); } // breaks for Penguin
```

**Fix — segregate the `fly` behavior:**

```typescript
abstract class Bird {
  abstract makeSound(): string;
}

interface Flyable {
  fly(): void;
}

class Sparrow extends Bird implements Flyable {
  makeSound() { return 'tweet'; }
  fly() { console.log('flap flap'); }
}

class Penguin extends Bird {
  makeSound() { return 'squawk'; }
  swim() { console.log('splash'); }
}

// makeBirdFly only accepts Flyable — Penguin never passed here
function makeBirdFly(bird: Flyable) { bird.fly(); }
```
<!-- END -->

<!-- QUESTION -->
difficulty: Easy
tags: ISP, interface-segregation

What is the "fat interface" anti-pattern, and how does ISP solve it?

<!-- ANSWER -->
A **fat interface** is one that contains methods that not all implementing classes need. Implementers are forced to provide stub implementations that may throw errors or do nothing — violating the contract callers expect.

**ISP solution:** Split the fat interface into smaller, focused interfaces. Clients only depend on the methods they actually use.

```typescript
// Fat interface — violates ISP
interface Machine {
  print(doc: Document): void;
  scan(doc: Document): void;
  fax(doc: Document): void;
  staple(doc: Document): void;
}

// ISP compliant — fine-grained interfaces
interface Printable { print(doc: Document): void; }
interface Scannable { scan(doc: Document): void; }
interface Faxable { fax(doc: Document): void; }

// SimplePrinter only implements what it supports
class SimplePrinter implements Printable {
  print(doc: Document) { /* ... */ }
}

// All-in-one machine implements all
class OfficeMachine implements Printable, Scannable, Faxable {
  print(doc: Document) { /* ... */ }
  scan(doc: Document) { /* ... */ }
  fax(doc: Document) { /* ... */ }
}
```
<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: DIP, dependency-inversion, testing

Why does DIP make unit testing easier? Demonstrate by writing a test for an `OrderService` that uses DIP vs one that doesn't.

<!-- ANSWER -->
**Without DIP:** The `OrderService` directly instantiates `MySQLDatabase`. Tests require a real database connection — slow, brittle, and non-isolated.

```typescript
// Without DIP — untestable in isolation
class OrderService {
  private db = new MySQLDatabase('prod-connection-string');
  placeOrder(order: Order) { this.db.save(order); }
}
// You can't test this without a running MySQL instance!
```

**With DIP:** The `Database` interface is injected. Tests can pass a fast in-memory mock.

```typescript
interface Database { save(data: unknown): Promise<void>; }

class OrderService {
  constructor(private db: Database) {}
  async placeOrder(order: Order) { await this.db.save(order); }
}

// Test — zero infrastructure needed
class MockDatabase implements Database {
  saved: unknown[] = [];
  async save(data: unknown) { this.saved.push(data); }
}

it('saves the order to the database', async () => {
  const mockDb = new MockDatabase();
  const service = new OrderService(mockDb);
  const order = { id: '1', total: 100 };

  await service.placeOrder(order);

  expect(mockDb.saved).toContain(order);
});
```

DIP enables **dependency injection**, which makes mocking, stubbing, and test isolation trivial.
<!-- END -->

<!-- QUESTION -->
difficulty: Medium
tags: SOLID, all-principles

Rank the SOLID principles from "most commonly violated" to "least commonly violated" in typical codebases and explain why.

<!-- ANSWER -->
This is subjective, but a common ordering:

1. **SRP (most violated)** — Classes grow organically. It's easy to add one more method rather than creating a new class. God objects are everywhere.

2. **OCP** — The `switch/case` and `instanceof` chains accumulate over time. Refactoring requires discipline.

3. **DIP** — Hard-coding dependencies (`new DatabaseService()`) is the default when people don't think about testing or flexibility.

4. **ISP** — Developers create large interfaces and then let clients only use half the methods.

5. **LSP (least violated)** — Subtype relationship violations often get caught when bugs appear, and most developers have a basic intuition that subclasses should behave like their parents.
<!-- END -->
