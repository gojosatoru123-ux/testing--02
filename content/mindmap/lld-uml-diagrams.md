---
title: UML Diagrams
articleSlug: lld-uml-diagrams
---

# UML Diagrams

## Definition

* Unified modeling language
* Visual system representation
* Standard design language
* Software modeling tool
* Architecture communication

## Purpose

* System understanding
* Design before coding
* Team communication
* Architecture documentation
* LLD interview support

## Benefits

* Visual clarity
* Design consistency
* Reduced ambiguity
* Easier collaboration
* Better documentation

## Diagram Categories

### Structural Diagrams

* Static system structure
* Components relationships
* Class organization
* Deployment structure
* Module boundaries

### Behavioral Diagrams

* System dynamic behavior
* Interaction flows
* State transitions
* Workflow representation
* Runtime communication

## Structural UML Diagrams

### Class Diagram

#### Purpose

* Static class structure
* Attributes representation
* Methods definition
* Relationships mapping

#### Elements

* Class name
* Attributes fields
* Methods operations
* Relationships links
* Multiplicity notation

#### Relationships

##### Association

* Basic class connection
* Interaction relationship
* No ownership

##### Inheritance

* Parent child relation
* Is-a relationship
* Behavior reuse

##### Aggregation

* Weak has-a relation
* Shared ownership
* Independent lifecycle

##### Composition

* Strong part-of relation
* Strong ownership
* Dependent lifecycle

### Object Diagram

#### Purpose

* Runtime object snapshot
* Instance relationships
* Example object states

#### Characteristics

* Concrete instances
* Attribute values
* Runtime representation

### Component Diagram

#### Purpose

* System module view
* Service dependencies
* Application components

#### Use Cases

* Microservices architecture
* Backend modules
* Frontend backend separation

### Package Diagram

#### Purpose

* Logical grouping
* Module organization
* Dependency structure

#### Benefits

* Large system organization
* Cleaner architecture view

### Deployment Diagram

#### Purpose

* Infrastructure layout
* Hardware nodes
* Software deployment

#### Elements

* Client device
* Web server
* Application server
* Database server

### Composite Structure Diagram

#### Purpose

* Internal component structure
* Part collaborations
* Complex object composition

#### Example Structure

* Car internal parts
* Engine module
* Wheel components

### Profile Diagram

#### Purpose

* Domain specific extensions
* Custom stereotypes
* Specialized modeling

#### Example Stereotypes

* Entity stereotype
* Service stereotype
* Repository stereotype
* Controller stereotype

## Behavioral UML Diagrams

### Use Case Diagram

#### Purpose

* User system interaction
* Functional system view
* Actor perspective

#### Elements

* Actor role
* Use case function
* System boundary
* Interaction association

### Activity Diagram

#### Purpose

* Workflow modeling
* Business processes
* Control flow

#### Elements

* Start node
* Action step
* Decision branch
* End node
* Parallel fork join

### Sequence Diagram

#### Purpose

* Time ordered interactions
* Object communication
* Method call flow

#### Core Elements

* Actor participant
* Object lifeline
* Message arrow
* Activation bar

#### Message Types

* Synchronous call
* Asynchronous call
* Return message
* Self message
* Create object
* Destroy object

#### Interaction Blocks

* Alt condition branch
* Opt optional flow
* Loop repeated action

### State Machine Diagram

#### Purpose

* Object lifecycle states
* State transitions
* Event driven behavior

#### Elements

* State node
* Transition arrow
* Trigger event
* Initial state
* Final state

### Communication Diagram

#### Purpose

* Object relationships
* Interaction messages
* Collaboration view

#### Characteristics

* Focus on connections
* Message numbering

### Interaction Overview Diagram

#### Purpose

* High level interaction
* Complex workflow overview
* Combined activity interactions

### Timing Diagram

#### Purpose

* State changes over time
* Real time systems
* Time based behavior

## UML Notations

### Class Notation

* Three section rectangle
* Class name
* Attributes fields
* Methods operations

### Visibility Symbols

* Plus public
* Minus private
* Hash protected
* Tilde package

### Relationship Symbols

* Line association
* Triangle inheritance
* Hollow diamond aggregation
* Filled diamond composition

## Association Types

### Simple Association

* Class interaction
* Loose connection
* Independent objects

### Aggregation Relationship

* Weak containment
* Shared ownership
* Independent parts

### Composition Relationship

* Strong containment
* Lifecycle dependency
* Whole part structure

## Class vs Object Association

### Class Association

* Design level relation
* Blueprint relationship

### Object Association

* Runtime instance relation
* Actual object connection

## Inheritance

### Concept

* Is-a relationship
* Parent child hierarchy
* Behavior reuse

### Benefits

* Code reuse
* Hierarchical design
* Polymorphism support

## Composition vs Inheritance

### Inheritance

* Is-a relation
* Hierarchical reuse

### Composition

* Has-a relation
* Object containment

## Class Types

### Abstract Class

* Cannot instantiate
* Base blueprint
* Partial implementation

### Concrete Class

* Instantiable class
* Full implementation
* Real system objects

## Sequence Diagram Concepts

### Participants

* Actors users
* System objects

### Lifelines

* Object existence
* Interaction duration

### Activations

* Processing duration
* Method execution

### Message Flow

* Request communication
* Response return

## Typical Interaction Flows

### Authentication Flow

* User input credentials
* UI request authentication
* Service validate data
* Database fetch record
* Response success failure

### ATM Withdrawal Flow

* Insert card
* Validate pin
* Check balance
* Deduct amount
* Dispense cash
