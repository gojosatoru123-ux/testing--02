---
title: Domain Name System
articleSlug: dns
---

# Domain Name System

## Core Idea

* Domain to IP mapping
* Internet phonebook system
* Human readable addresses
* Machine readable IPs

## Purpose

* Easy website access
* Hide numeric IPs
* Simplify internet navigation
* Name based communication

### Human Friendly Names

* google.com
* amazon.com
* github.com

### Network Addresses

* IPv4 numeric address
* IPv6 numeric address
* Machine communication format

## DNS Architecture

* Distributed hierarchical system
* Global name resolution
* Multiple server layers
* Delegated authority model

### DNS Hierarchy

* Root DNS servers
* TLD DNS servers
* Authoritative DNS servers
* DNS resolvers

## DNS Components

### DNS Resolver

* Client query handler
* Recursive lookup process
* Cache DNS responses
* Usually ISP provided

### Root Servers

* Top DNS hierarchy
* Direct TLD servers
* Global distributed nodes
* Internet entry point

### TLD Servers

* Manage top level domains
* .com domain servers
* .org domain servers
* .net domain servers

### Authoritative Servers

* Store domain records
* Provide final answers
* Domain owner controlled
* Source of truth

## DNS Resolution Flow

* User enters domain
* Browser queries resolver
* Resolver contacts root
* Root refers TLD
* TLD refers authoritative
* Authoritative returns IP
* Browser connects server

## Cache Layers

### Browser Cache

* Recent DNS lookups
* Fast local resolution
* Avoid network queries

### OS Cache

* Operating system cache
* Shared application lookup
* Faster DNS responses

### Resolver Cache

* ISP resolver cache
* Shared user queries
* Reduced internet traffic

## DNS Records

### Address Records

* A record IPv4 mapping
* AAAA record IPv6 mapping

### Alias Records

* CNAME domain alias
* Canonical name mapping

### Mail Records

* MX mail routing
* Mail server priority

### Metadata Records

* TXT verification records
* NS name server records

## CNAME Alias

* Domain alias mapping
* Redirect domain names
* Common CDN usage
* Simplified domain management

## DNS Caching

* Reduce lookup latency
* Minimize server load
* Improve resolution speed

### TTL Time To Live

* Cache expiration time
* Seconds based lifetime
* Controls cache duration

## Load Distribution

### Round Robin DNS

* Multiple IP responses
* Simple load balancing
* Rotate returned addresses

### Limitations

* No health checks
* No latency routing
* Basic load distribution

## Geo DNS

* Location based routing
* Regional server selection
* Reduced user latency
* Geographic traffic routing

## CDN Integration

* DNS directs edge server
* User nearest CDN node
* Cached content delivery
* Origin fallback requests

## Large Scale DNS Usage

* Global traffic routing
* Multi region services
* Failover routing
* Service discovery

## DNS Failover

* Detect server failure
* Redirect traffic backup
* Maintain availability
* Automatic DNS updates

## DNS Propagation

* Record update spread
* Resolver cache refresh
* TTL expiration impact
* Gradual global update

## Security Risks

### DNS Spoofing

* Fake DNS responses
* Redirect malicious servers

### Cache Poisoning

* Corrupt resolver cache
* Incorrect domain mapping

### DNS DDoS

* Overload DNS servers
* Service availability disruption

## DNSSEC

* Cryptographic verification
* Signed DNS records
* Authentic response validation
* Prevent spoofing attacks

## Scalability Principles

* Hierarchical delegation
* Aggressive caching
* Global replication
* Distributed infrastructure

## Anycast DNS

* Same IP multiple servers
* Route nearest node
* Global DNS distribution
* Improved availability

## Mental Model

* Internet navigation system
* Domain name lookup
* Find server location
* Connect correct destination
