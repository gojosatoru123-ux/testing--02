---
title: Database in backend
articleSlug: database-in-backend
---
# Persistence and Databases

## Persistence

### Definition

* Data survives program shutdown
* Stored beyond process lifetime
* Core backend reliability concept

### When Data Persists

* App closes safely
* Server restarts safely
* System crashes safely
* Computer powers off

### Example To Do App

* Tasks saved permanently
* Tasks remain after restart
* Users trust application memory

### Analogy

* Notebook stores information
* Memory easily forgotten
* Written notes remain safe

## Databases

### Database Definition

* Structured persistent data storage
* Organized retrieval system
* Core backend component

### Questions Databases Answer

* Existing system users
* Placed order history
* Stored account notes
* Current inventory products

### Everyday Database Examples

* Phone contacts storage
* Browser local storage
* Notes application data
* Social media profiles

## CRUD Operations

### Core Data Actions

* Create new data
* Read stored data
* Update existing data
* Delete stored data

### Library Analogy

* Add book record
* Search catalog entry
* Update book location
* Remove old records

## RAM vs Disk Storage

### RAM Characteristics

* Extremely fast access
* Limited memory capacity
* Expensive hardware resource
* Data lost on shutdown

### Disk Characteristics

* Slower data access
* Very large capacity
* Lower hardware cost
* Persistent long term storage

### Why Disk Is Used

* Data durability needed
* Large scalable storage
* Reliable long term persistence

### Analogy

* RAM like work desk
* Disk like filing cabinet
* Desk temporary workspace
* Cabinet long term archive

## Text Files As Storage

### Limitations

* Slow data searching
* Manual parsing required
* No enforced structure
* Error prone processing

### Data Consistency Problems

* Invalid data possible
* Wrong field formats stored
* Application logic breaks

### Concurrency Problems

* Multiple writers conflict
* Race conditions appear
* Lost updates possible
* Data corruption risks

### Race Condition Analogy

* Two writers same whiteboard
* Last writer overwrites data
* Correct logic ignored

## DBMS Systems

### DBMS Definition

* Software managing databases
* Handles storage operations
* Ensures safe data handling

### Common DBMS Examples

* PostgreSQL relational database
* MySQL relational database
* SQLite embedded database
* MongoDB document database
* Redis in memory store

### DBMS Capabilities

* Organized data storage
* Enforced data integrity
* Safe concurrent updates
* Access control security
* Efficient query system
* Transaction support system

## Data Organization

### Optimized Storage Structures

* Indexed record lookup
* Fast row retrieval
* Efficient filtering queries

### Library Index Analogy

* Index finds book quickly
* No manual searching required

## Data Integrity

### Enforced Data Rules

* Numeric column validation
* Non null value enforcement
* Unique constraint enforcement
* Foreign key relationships

### Example Constraint

* Unique user email required
* Duplicate emails rejected

## Concurrency Control

### Multi User Safety

* Database locking mechanisms
* Transaction isolation levels
* Conflict detection systems
* Safe parallel operations

## Database Security

### Access Management

* User authentication control
* Role based permissions
* Access restriction rules
* Secure database operations

## Persistence Flow

### Backend Data Lifecycle

* Client sends data request
* Application processes request
* Database stores information
* Disk writes persistent data
* Future reads retrieve data

## Postgres String Types

### Main String Categories

* Fixed length char
* Limited varchar
* Flexible text type

## Char Type

### Characteristics

* Fixed length strings
* Extra spaces padded
* Rare modern usage

### Typical Usage

* Very specific fixed formats

## Varchar Type

### Characteristics

* Variable length strings
* Maximum length enforced
* Rejects longer input

### When Useful

* Strict database limits required
* Controlled string sizes needed

## Text Type

### Characteristics

* Variable length strings
* No practical size limit
* Simplest default choice

### Advantages

* Flexible schema design
* Fewer future migrations
* Clean validation handling

## String Type Comparison

### Char

* Fixed length padded
* Rarely useful

### Varchar

* Limited maximum length
* Explicit constraints

### Text

* Unlimited flexible strings
* Preferred application default

## Varchar 255 Myth

### Common Misconception

* Habit from older systems
* No special Postgres benefit
* Arbitrary limit often unnecessary

### Better Approach

* Use text as default
* Validate length in application

## JSON Support In Postgres

### Flexible Data Storage

* Dynamic schema capability
* Nested structure support
* Queryable document data

## JSON Types

### Json Type

* Stored as raw text
* Preserves formatting
* Less optimized querying

### Jsonb Type

* Binary JSON storage
* Faster querying performance
* Supports indexing
* Preferred backend choice

## Jsonb Advantages

### Powerful Capabilities

* Query nested structures
* Index JSON fields
* Filter JSON values
* Store flexible content

## JSON Use Cases

### Flexible Data Scenarios

* Product metadata fields
* CMS article structures
* User preference settings
* Feature flag configuration
* Event payload storage

## Relational And JSON Together

### Hybrid Data Model

* Structured relational tables
* Flexible JSON metadata
* Unified database system

### Example Data

* Users and orders structured
* Metadata and preferences flexible

## Numeric Types

### Numeric Design Decision

* Choose accuracy or speed
* Depends on application need

## Decimal Numeric

### Characteristics

* Exact numeric representation
* Precise arithmetic operations
* Slower processing speed

### Best Use Cases

* Financial transactions
* Payment systems
* Accounting balances
* Invoice calculations

## Float Types

### Characteristics

* Approximate numeric representation
* Faster mathematical operations
* Small rounding differences possible

### Best Use Cases

* Scientific measurements
* Engineering simulations
* Graphics calculations
* Performance heavy workloads

## Numeric Comparison

### Decimal Numeric

* Exact precision values
* Slower computation speed
* Best for money

### Float

* Approximate calculations
* Faster computation speed
* Best for science

## PostgreSQL Platform Strength

### Unified Data Capabilities

* Relational structured storage
* Flexible JSON documents
* Rich data types
* Powerful indexing systems
* Query optimization engine
* Strong integrity constraints

### Operational Benefits

* Reduced system complexity
* Fewer database systems needed
* Simpler maintenance overhead
* Centralized data management

## Choosing Correct Data Types

### String Decision

* Fixed size required char
* Max length required varchar
* Flexible text use text

### Flexible Data Decision

* Queryable dynamic data jsonb
* Raw formatting preserved json

### Numeric Decision

* Exact precision decimal
* Fast approximate float

## Common Beginner Mistakes

### Persistence Mistakes

* Storing data only in RAM
* Using text files for backend

### Schema Design Mistakes

* Using varchar 255 everywhere
* Using float for money

### Architecture Mistakes

* Choosing NoSQL unnecessarily
* Ignoring database constraints
* Overcomplicated early schema

## Persistence Importance

### Why Persistence Matters

* Applications remember user data
* Systems survive restarts
* Users trust stored information
* Backend systems remain reliable
