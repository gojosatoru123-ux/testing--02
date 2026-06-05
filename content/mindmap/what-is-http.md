---
title: What is HTTP?
articleSlug: what-is-http
---

# HTTP

## Core Idea

* Web communication protocol
* Browser server conversation
* Language of the web
* Request response system

## Web Actions

* Load webpages
* Submit forms
* Fetch data
* Upload files
* User authentication

## Big Picture

### Communication Flow

* User enters URL
* Browser sends request
* Server processes data
* Server returns response
* Browser renders page

## HTTP Foundations

### Client Server Architecture

* Client sends requests
* Server returns responses

### Stateless Communication

* No memory of requests
* Each request independent

## Client

### Request Initiator

* Web browsers
* Mobile applications
* CLI tools
* IoT devices

### Client Responsibility

* Send HTTP requests
* Request resources

## Server

### Request Processor

* Hosts APIs
* Runs backend logic
* Connects databases

### Server Responsibility

* Process client requests
* Send HTTP responses

## Restaurant Analogy

### Web Mapping

* Client customer
* Server kitchen
* Request food order
* Response served meal
* Database ingredient storage

## Statelessness

### Stateless Principle

* Server stores no session
* Requests processed independently

### Example Actions

* Login request
* Dashboard request
* Like post request

### Benefits

* Easier system scaling
* Higher reliability
* Simpler architecture

### State Simulation

* Cookies browser storage
* Sessions server memory
* JWT authentication token
* Local storage data

## HTTP Interaction

### Request

* Client asks resource
* Contains method path headers

### Response

* Server returns result
* Contains status headers body

## HTTP Request Structure

### Request Components

* Method action type
* URL resource location
* Headers metadata information
* Body optional data

## HTTP Response Structure

### Response Components

* Status code result
* Headers metadata details
* Body returned data

## HTTP Evolution

### HTTP 1.0

* New connection per request
* High latency overhead

### HTTP 1.1

* Persistent connections
* Connection reuse

### HTTP 2

* Multiplexed request streams
* Parallel communication

### HTTP 3

* QUIC transport protocol
* UDP based communication

## QUIC Advantages

* Faster connection setup
* Reduced latency transmission
* Independent packet streams

## HTTP Headers

### Header Purpose

* Metadata about messages
* Describe request response

### Header Categories

* Request headers
* Response headers
* Representation headers
* Security headers

## Request Headers

### Common Examples

* User agent information
* Accept data formats
* Authorization credentials
* Cookie stored data

## Representation Headers

### Content Description

* Content type format
* Content length size
* Content encoding compression

## Security Headers

### Browser Protection

* Content security policy
* Frame embedding control
* HTTPS enforcement

## HTTP Methods

### Request Verbs

* GET retrieve resource
* POST create resource
* PUT replace resource
* PATCH partial update
* DELETE remove resource

### Idempotency Concept

* Same result repeated requests

## HTTP Status Codes

### Success Codes

* 200 request successful
* 201 resource created
* 204 empty response

### Redirection Codes

* 301 permanent redirect
* 302 temporary redirect
* 304 cached resource

### Client Error Codes

* 400 bad request
* 401 unauthorized access
* 403 forbidden request
* 404 resource not found
* 409 request conflict

### Server Error Codes

* 500 internal error
* 502 gateway error
* 503 service unavailable

## HTTPS Security

### Encryption Layer

* TLS encrypted communication
* Secure data transfer

### Security Benefits

* Data confidentiality
* Data integrity
* Server authentication

## CORS

### Same Origin Policy

* Browser security restriction

### Cross Origin Access

* Controlled external requests

## Caching

### Performance Optimization

* Store responses locally
* Reduce network requests

### Benefits

* Faster page loading
* Lower server load
* Reduced bandwidth usage

## Complete Web Flow

### Page Request Lifecycle

* User enters URL
* DNS resolves domain
* Browser sends request
* Server queries database
* Server returns response
* Browser renders page

## Key Takeaways

* HTTP powers web communication
* Client server architecture
* Stateless protocol design
* Request response model
* Headers metadata transport
* Methods define actions
* Status codes indicate results
* HTTPS secures communication

## Next Topics

### Backend Learning Path

* REST APIs
* API design principles
* Authentication systems
* Databases and ORMs
* Load balancing
* Caching architectures
* Microservices systems
