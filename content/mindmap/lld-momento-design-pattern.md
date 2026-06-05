---
title: Memento Design Pattern
articleSlug: lld-memento-design-pattern
---

# Memento Design Pattern

## Core Idea

* Save object state
* Restore later
* Snapshot approach
* Undo support
* Rollback support

## Problem

* Accidental changes
* Partial updates
* Inconsistent state
* No easy undo
* No safe recovery

## Main Roles

* Originator
* Memento
* Caretaker

### Originator

* Owns state
* Creates memento
* Restores from memento

### Memento

* State snapshot
* Opaque container
* Immutable preferred
* No external changes

### Caretaker

* Stores mementos
* Retrieves snapshots
* No state inspection
* History manager

## Analogy

* Screenshot
* Photo album
* Backup folder
* Restore point
* Save file

## Why Useful

* Undo edits
* Rollback transactions
* Save checkpoints
* Recover mistakes
* Preserve encapsulation

## Snapshot Flow

* Capture state
* Store snapshot
* Modify object
* Restore later
* Resume safely

## Encapsulation

* Internal state hidden
* Caretaker unaware
* Originator controls restore
* Safe external storage
* No state leakage

## Transaction Example

* Save before update
* Apply changes
* Check success
* Commit or rollback
* Restore snapshot

## Undo Redo

* Undo stack
* Redo stack
* Previous snapshots
* Forward snapshots
* History navigation

## Rules

* Originator knows state
* Caretaker stores only
* Memento stays opaque
* Memento usually immutable
* Restore via originator

## Benefits

* Undo support
* Rollback support
* Encapsulation preserved
* Checkpoints enabled
* Simple restoration

## Drawbacks

* Memory overhead
* More classes
* Snapshot management
* Deep copy issues
* Extra complexity

## Use Cases

* Text editors
* Graphic editors
* Database rollback
* Game saves
* Configuration restore

## Memento vs Command

* Memento saves state
* Command stores action
* Often used together
* Different intent
* Complementary patterns

## Memento vs Prototype

* Memento restores state
* Prototype clones object
* Snapshot versus clone
* Different purpose
* Different timing

## Common Mistakes

* Exposing internals
* Mutable mementos
* Too many snapshots
* Missing deep copy
* Overusing pattern

## When to Use

* Undo needed
* Rollback needed
* Checkpoints needed
* State recovery needed
* Encapsulation important

## When Not to Use

* Small state
* No history
* No rollback
* Huge snapshots
* Simple object

## Implementations

* C++
* Java
* Python

### Shared Structure

* Editor originator
* EditorMemento snapshot
* History caretaker
* save method
* restore method

## Final Takeaway

* Save snapshots
* Restore safely
* Keep internals hidden
* Support undo
* Preserve design clarity
