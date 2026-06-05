---
title: Routing
articleSlug: backend-routing
---

# Backend Routing

## Routing Concept

* maps request to handler
* method plus path mapping
* request traffic controller
* backend request navigation

## Request Components

### HTTP Method

* GET read resource
* POST create resource
* PUT update resource
* DELETE remove resource

### URL Path

* endpoint location
* resource identifier
* hierarchical structure

## Request Flow

### Incoming Request

* client sends HTTP request
* server receives request
* router reads method path

### Route Matching

* compare defined routes
* find matching handler
* unmatched returns 404

## Route Types

### Static Routes

* fixed endpoint paths
* exact path matching
* same resource always

### Dynamic Routes

* variable path segments
* path parameter variables
* reusable route patterns

## Path Parameters

* inside URL path
* identify resource id
* example users id
* direct resource lookup

## Query Parameters

* appear after question mark
* key value pairs
* filtering and pagination
* optional request modifiers

## Routing Patterns

### Nested Routes

* hierarchical resources
* parent child relationships
* users posts example
* structured resource tree

### API Versioning

* maintain backward compatibility
* versioned endpoints
* v1 v2 APIs
* gradual API evolution

### Catch All Routes

* unmatched route handler
* default fallback logic
* return 404 response
* unknown path handling

## Routing Best Practices

### Resource Naming

* use nouns not verbs
* resource based URLs
* consistent naming style

### Predictable URLs

* clear resource meaning
* intuitive endpoint structure
* easy API navigation

### Avoid Deep Nesting

* limit route depth
* maintain readability
* simpler endpoint structure

### Consistent Resources

* plural resource names
* users products orders
* uniform API style

## Framework Routing

### Node Ecosystem

* Express framework routing
* Fastify high performance

### Python Ecosystem

* Django URL routing
* Flask lightweight routing

### Other Frameworks

* Spring Boot Java
* Laravel PHP framework

## Large Scale Routing

### Modular Routes

* route module separation
* feature based routes
* scalable organization

### Controllers

* business logic separation
* handler function grouping
* maintainable architecture

### Middleware

* request preprocessing
* authentication checks
* logging and validation

### Route Groups

* grouped endpoints
* shared middleware
* organized route structure

## Core Idea Summary

* routing connects HTTP backend
* method path handler mapping
* foundation of APIs
* backbone of backend systems
