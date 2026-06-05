---
title: OAuth Open Authorization
articleSlug: oauth
---

# OAuth Open Authorization

## Purpose

* delegated authorization framework
* token based access
* avoid password sharing
* secure API access

## Core Problem

### Password Sharing Model

* third party credential storage
* full account access
* difficult access revocation
* major security risk

### OAuth Solution

* delegated permission model
* limited access tokens
* revocable permissions
* scoped API access

## Real World Analogy

### Temporary Key Card

* limited room access
* time restricted entry
* revocable anytime
* scoped permissions

## Core Actors

### Resource Owner

* user owning data
* grant permissions

### Client Application

* requesting resource access
* third party service

### Authorization Server

* authenticate user
* issue tokens

### Resource Server

* host protected APIs
* validate tokens

## Authorization Process

### Step One

* client requests access
* redirect user auth

### Step Two

* user authenticates
* approve permissions

### Step Three

* authorization code issued
* temporary credential

### Step Four

* client exchanges code
* obtain access token

### Step Five

* client calls API
* token authorization

## OAuth Tokens

### Access Token

* API request authorization
* short lifetime

### Refresh Token

* renew access tokens
* longer lifetime

### ID Token

* user identity data
* authentication layer

## Token Format

### JWT Tokens

* signed JSON payload
* self contained claims
* stateless verification

## OAuth Scopes

### Permission Control

* define allowed operations
* limit data access

### Example Scopes

* read profile data
* read email address
* modify files data

## Authorization Flows

### Authorization Code Flow

* backend web apps
* secure token exchange

### Authorization Code PKCE

* mobile applications
* SPA security protection

### Client Credentials Flow

* service to service
* machine authentication

### Device Code Flow

* smart TV login
* limited input devices

## Authorization Code Flow

### Initial Request

* user login action
* redirect authorization server

### User Authentication

* user credentials validation
* permission approval

### Code Issued

* temporary authorization code
* short lifetime credential

### Token Exchange

* backend server request
* access token returned

## PKCE Flow

### Security Need

* public clients insecure
* no client secret

### PKCE Mechanism

* code verifier value
* code challenge hash

### Protection Benefit

* prevent code interception
* secure mobile login

## Client Credentials Flow

### Machine Authentication

* no user interaction
* service authentication

### Token Request

* client id authentication
* receive access token

### API Access

* service calls API
* token authorization

## Token Lifecycle

### Token Creation

* issued authorization server
* initial access token

### Token Expiration

* short lifetime tokens
* security protection

### Token Refresh

* refresh token usage
* obtain new token

## Authentication vs Authorization

### Authentication

* verify user identity
* who the user is

### Authorization

* permission verification
* what user can access

## OpenID Connect

### Identity Layer

* built on OAuth
* authentication protocol

### ID Token

* user identity claims
* profile information

## Token Validation

### JWT Validation

* signature verification
* local token validation

### Token Introspection

* server validation call
* centralized verification

## System Architecture

### Client Layer

* frontend application
* backend application

### Authorization System

* authorization server
* token issuing service

### Resource APIs

* protected data services
* resource access control

## Microservices Integration

### API Gateway

* token validation layer
* centralized security

### Service Communication

* gateway forwards request
* services trust gateway

## Security Practices

### HTTPS Requirement

* encrypted communication
* prevent token interception

### Token Expiration

* short token lifetime
* reduce leak impact

### Scope Restriction

* least privilege access
* limited API permissions

### PKCE Usage

* secure public clients
* protect auth codes

## Security Risks

### Token Leakage

* exposed tokens logs
* unauthorized access

### Redirect URI Attack

* malicious redirect targets
* token theft risk

### CSRF Attack

* forged auth requests
* unauthorized approvals

### Token Replay

* reused stolen tokens
* duplicated requests

## Common Usage

### Third Party Login

* login with Google
* login with GitHub

### API Authorization

* GitHub API access
* cloud service APIs

### Microservice Security

* internal API protection
* service authentication

### Delegated Access

* user data access
* external integrations

## Key Benefits

### Secure Delegation

* no password sharing
* controlled permissions

### Flexible Integration

* cross platform access
* third party apps

### Scalable Security

* token based model
* distributed architectures

## Summary

### Core Principle

* delegated authorization model
* token based security

### System Workflow

* user authorization grant
* token issuance
* API token usage

### Modern Internet Usage

* third party login
* API integrations
* distributed systems security
