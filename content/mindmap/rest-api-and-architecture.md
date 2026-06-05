---
title: REST API
articleSlug: rest-api-and-architecture
---
# REST Architecture

## REST Overview

### Representational State Transfer

* Architectural style
* Web system design rules
* Focus on scalability
* Simplicity and reliability
* Easy system evolution

## Web Scalability Problem

### Early Web Growth

* Rapid internet expansion
* Many clients and servers
* Increasing traffic loads
* Need scalable architecture

### Role of Roy Fielding

* Defined REST constraints
* Formalized web architecture
* Explained scalable design
* Foundation of modern APIs

## Six REST Constraints

### Core Architectural Rules

* Client Server separation
* Stateless communication model
* Cacheable responses allowed
* Uniform interface design
* Layered system architecture
* Code on demand optional

## Client Server Constraint

### System Separation

* Client handles UI
* Server handles logic
* Independent system evolution
* Multiple client platforms

### Benefits

* Separate development teams
* Easier system maintenance
* Flexible client applications
* Better scaling strategies

## Stateless Constraint

### Request Independence

* No server session memory
* Every request self contained
* Includes authentication data
* Contains all parameters

### Benefits

* Easier horizontal scaling
* Load balancing simplicity
* Improved system reliability
* Faster failure recovery

## Cacheable Constraint

### Response Reusability

* Responses marked cacheable
* Reduce repeated requests
* Store frequently accessed data
* Improve performance speed

### Benefits

* Reduced server workload
* Faster user responses
* Lower network traffic
* Better user experience

## Uniform Interface Constraint

### Consistent Communication

* Standard API interaction style
* Predictable request structure
* Simplifies client implementation
* Reduces architectural complexity

### Resource Identification

* Each resource unique URI
* Clear addressable endpoints
* Consistent resource naming
* Predictable API paths

### Resource Representation

* Client receives resource representation
* Usually JSON structured data
* Client modifies representations
* Server handles internal logic

### Self Descriptive Messages

* Messages include metadata
* Content type clearly defined
* Clients understand responses
* Easier interoperability

### HATEOAS Principle

* Responses include action links
* Clients discover next actions
* Reduced client hardcoding
* Dynamic API navigation

## Layered System Constraint

### Multi Layer Architecture

* Client application layer
* API gateway or proxy
* Load balancer layer
* Backend service logic
* Database storage layer

### Benefits

* Improved security layers
* Better scalability control
* Modular system components
* Flexible architecture changes

## Code On Demand Constraint

### Optional Capability

* Server sends executable code
* Often JavaScript scripts
* Enhances client functionality
* Temporary feature extension

### Usage Scenarios

* Dynamic web applications
* Interactive browser widgets
* Custom client behaviors
* Frontend feature enhancements

## REST API Flow

### Typical Request Path

* Client sends HTTP request
* Gateway forwards request
* API processes logic
* Database returns data
* Response returned to client

## Custom Actions With POST

### When CRUD Is Not Enough

* Archive organization action
* Reset user password
* Publish project draft
* Cancel order operation

### Why POST Works Best

* Flexible action execution
* Non idempotent operations
* Clear action endpoints
* Supports custom workflows

## UI First API Design

### Design Driven Development

* Start from UI wireframes
* Analyze user interactions
* Determine required data
* Design API endpoints

### Benefits

* APIs match real usage
* Better developer experience
* Cleaner response structure
* More practical endpoints

## Resource Based Thinking

### REST Resource Model

* Users resource entity
* Orders resource entity
* Posts resource entity
* Organizations resource entity

### Resource Endpoints

* Collection resource endpoints
* Individual resource endpoints
* Nested resource relationships
* Predictable API structure

## Good REST Practices

### Design Guidelines

* Use nouns for resources
* Correct HTTP method usage
* Consistent response structure
* Predictable endpoint patterns
* Proper HTTP status codes

## Common REST Mistakes

### Frequent Problems

* Verbs inside URL paths
* State changing GET requests
* Misusing PATCH actions
* Ignoring caching opportunities
* Designing from database first

## REST Key Takeaways

### Core Principles

* Architectural design style
* Constraint driven systems
* Resource oriented APIs
* Scalable web architecture
* Foundation of modern APIs
