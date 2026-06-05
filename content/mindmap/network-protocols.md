---
title: Network Protocols in High Level Design
articleSlug: network-protocols
---

# Network Protocols in High Level Design

## Overview

* Network communication rules
* Distributed system communication
* Data transmission standards
* Message handling rules
* Connection behavior

## Why It Matters

* Affects latency
* Affects reliability
* Affects scalability
* Affects security
* Affects performance

## Real-World Analogy

* TCP: courier delivery
* UDP: loudspeaker notice
* HTTP: office mail
* WebSocket: phone call
* gRPC: strict contract
* DNS: phonebook lookup

## Protocol Stack

### Application Layer

* HTTP
* HTTPS
* WebSocket
* gRPC
* DNS
* SMTP

### Transport Layer

* TCP
* UDP

### Internet Layer

* IP
* Routing
* Addressing

### Network Access Layer

* Ethernet
* WiFi
* Physical transmission

## Transport Layer Protocols

### TCP

* Connection oriented
* Reliable delivery
* Ordered packets
* Retransmission
* Flow control
* Congestion control

#### TCP Handshake

* SYN
* SYN-ACK
* ACK

#### TCP Use Cases

* Web APIs
* Databases
* Payments
* File transfer

### UDP

* Connectionless
* Fast transfer
* No ordering
* No guarantees
* Minimal overhead

#### UDP Use Cases

* Video streaming
* Online gaming
* Voice calls
* DNS queries

## Application Layer Protocols

### HTTP

* Request response
* Web foundation
* Stateless protocol
* Text based

#### HTTP Methods

* GET
* POST
* PUT
* PATCH
* DELETE

### HTTPS

* HTTP plus TLS
* Encrypted traffic
* Integrity protection
* Server authentication

### WebSocket

* Persistent connection
* Bidirectional communication
* Real-time updates
* Server push

#### WebSocket Use Cases

* Chat apps
* Live dashboards
* Multiplayer games
* Notifications

### gRPC

* High-performance RPC
* HTTP/2 based
* Protobuf format
* Binary serialization
* Streaming support

#### gRPC Strengths

* Smaller payloads
* Parallel requests
* Fast service calls

### DNS

* Name resolution
* Domain to IP
* Resolver lookup
* Hierarchical system

### SMTP

* Email sending
* Mail transfer
* Recipient delivery

## Protocol Selection

### Reliable APIs

* HTTP
* TCP

### Real-Time Messaging

* WebSocket

### Microservices

* gRPC

### Streaming

* UDP

### Domain Lookup

* DNS

## Microservices Communication

* Client to gateway
* Gateway to services
* Service to service
* Internal discovery

### Common Choices

* HTTPS
* HTTP
* gRPC
* DNS

## Performance Comparison

### TCP

* Medium speed
* High reliability

### UDP

* Very high speed
* Low reliability

### HTTP

* Medium speed
* High reliability

### WebSocket

* High speed
* High reliability

### gRPC

* Very high speed
* High reliability

## Real-World Architecture

* CDN layer
* Edge servers
* Video servers
* Storage systems
* Mixed protocol usage

## Key Takeaways

* Protocols define communication
* TCP for reliability
* UDP for speed
* HTTP for web APIs
* WebSocket for real-time
* gRPC for microservices
* DNS for resolution
