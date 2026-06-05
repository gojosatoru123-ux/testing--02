---
title: Backend Security Fundamentals
articleSlug: backend-security
---

# Backend Security Fundamentals

## Core Security Concepts

### Security Definition

* Fundamental architecture property
* Continuous protection
* Trust boundary defense

### External Interactions

* Browsers
* Mobile apps
* Databases
* Operating systems
* Third-party APIs

### Main Principle

* Separate code and data

### Trust Boundaries

* User input crossing
* System communication
* External integrations

## Injection Attacks

### Definition

* Input treated as code
* Executable interpretation
* Command manipulation

### Root Cause

* String concatenation
* Unsafe interpolation
* Mixed code and data

### Common Targets

* SQL databases
* Operating systems
* Browsers

### Attack Goal

* Execute malicious commands
* Bypass restrictions
* Access sensitive data

## SQL Injection

### Definition

* SQL query manipulation
* Database command injection

### Vulnerable Pattern

* Raw query strings
* User-controlled SQL

### Happy Path

* Valid email lookup
* Expected query behavior

### Attack Payloads

* OR conditions
* Comment operators
* Query termination

### Common Techniques

* Login bypass
* Data extraction
* Table deletion
* Privilege escalation

### Dangerous Payloads

* OR '1'='1'
* DROP TABLE
* UNION SELECT

## SQL Injection Consequences

### Authentication Bypass

* Unauthorized login
* Account access

### Data Theft

* Database dumping
* Sensitive exposure

### Data Manipulation

* Modify records
* Delete information

### Infrastructure Damage

* Destroy tables
* Corrupt databases

## Parameterized Queries

### Purpose

* Separate code and data
* Prevent execution injection

### Core Idea

* Fixed query structure
* Data-only parameters

### Benefits

* Safe SQL execution
* Automatic escaping
* Injection prevention

### Secure Approaches

* Prepared statements
* ORM query builders
* Parameter binding

## Command Injection

### Definition

* OS command manipulation
* Shell execution abuse

### Vulnerable Pattern

* String-built shell commands

### Common Targets

* File processing
* Media conversion
* System utilities

### Attack Effects

* File deletion
* Server compromise
* Remote execution

### Secure Solution

* Argument arrays
* Fixed commands
* Native libraries

## Password Security

### Core Principle

* Never store plaintext

### Security Layers

* Hashing
* Salting
* Slow hashing

## Password Hashing

### Purpose

* One-way transformation
* Password protection

### Stored Data

* Hash values
* Non-reversible output

### Login Verification

* Compare hashes
* Match validation

## Rainbow Tables

### Definition

* Precomputed hash databases

### Purpose

* Reverse common passwords
* Crack stolen hashes

### Risk

* Fast password recovery
* Weak hash exposure

## Salting

### Definition

* Random unique values
* Added before hashing

### Benefits

* Unique hashes
* Rainbow table protection

### Key Effects

* Same passwords differ
* Harder cracking

## Slow Hashing

### Purpose

* Prevent brute force
* Increase attack cost

### Recommended Algorithms

* Argon2id
* bcrypt
* scrypt

### Unsafe Algorithms

* MD5
* SHA256

### Security Features

* CPU expensive
* Memory intensive
* Slower cracking

## Authentication vs Authorization

### Authentication

* Identity verification
* Login validation

### Authorization

* Permission checking
* Resource access control

### Key Difference

* Who you are
* What you access

## Broken Object Level Authorization

### Definition

* Missing ownership checks
* Unauthorized resource access

### Vulnerable Pattern

* ID-only queries
* No user verification

### Risks

* Cross-user access
* Data leakage

### Secure Pattern

* Ownership validation
* User-based filtering

## Authorization Security

### Ownership Checks

* Resource ownership
* User ID verification

### Secure Queries

* User-based conditions
* Scoped access

### Protection Goals

* Prevent enumeration
* Restrict access

## HTTP Response Security

### 403 Forbidden

* Resource existence revealed

### 404 Not Found

* Hide resource existence
* Prevent enumeration

### Information Leakage

* Exposed valid IDs
* Discovery attacks

## Security Best Practices

### Treat Input Hostile

* Never trust input
* Validate everything

### Protected Inputs

* Form data
* Headers
* Cookies
* Query params
* File uploads

### Use Parameterized Queries

* Prepared statements
* ORM builders

### Avoid Shell Commands

* Prefer native libraries
* Reduce OS exposure

### Strong Password Storage

* bcrypt
* Argon2id
* scrypt

### Database-Level Authorization

* Ownership filtering
* Scoped queries

## Security Layers

### Input Validation

* Sanitize data
* Validate formats

### Authentication Layer

* Identity checks
* Session validation

### Authorization Layer

* Permission enforcement
* Resource protection

### Business Logic

* Safe processing
* Rule enforcement

### Database Layer

* Secure queries
* Ownership checks

## Common Vulnerabilities

### Injection Flaws

* SQL injection
* Command injection

### Credential Weaknesses

* Plaintext passwords
* Weak hashing

### Authorization Failures

* Missing ownership checks
* Insecure endpoints

### Information Leakage

* Detailed errors
* Resource discovery

## Security Mindset

### Core Philosophy

* Never trust users
* Input is hostile

### Critical Questions

* Mixing code and data
* Crossing trust boundaries
* Parameterized alternatives

### Professional Thinking

* Defensive mindset
* Paranoid validation
* Principle of least trust

## Trust Boundaries

### Examples

* User to API
* API to database
* Server to OS

### Main Risks

* Unsafe interpretation
* Command execution
* Data exposure

### Protection Methods

* Validation
* Escaping
* Parameterization

## Final Takeaways

### Core Principle

* Separate code and data

### Critical Protections

* Parameterized queries
* Safe password hashing
* Authorization checks

### Security Goals

* Prevent injections
* Protect credentials
* Restrict access
* Avoid leakage

### Professional Mindset

* Validate everything
* Trust nothing
* Secure every layer
