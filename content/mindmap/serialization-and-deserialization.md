---
title: Serialization / De-Serialization
articleSlug: serialization-and-deserialization
---

# Serialization Deserialization JSON

## Communication Problem

### Different Programming Languages

* javascript objects
* rust structs
* python dictionaries
* kotlin data classes

### Network Data Limitation

* network understands bytes
* cannot send native objects
* requires universal format

## Serialization

### Core Idea

* convert object to transport format
* prepare data for network
* language independent structure

### Purpose

* send data across systems
* enable cross language communication
* standard data packaging

### Analogy

* packing items in box
* standardized shipping package
* transport friendly format

## Deserialization

### Core Idea

* convert format to object
* reconstruct native data
* restore program structure

### Purpose

* interpret received data
* enable program logic
* access object properties

### Analogy

* open delivered package
* unpack original items
* use received objects

## JSON Format

### Definition

* javascript object notation
* text based data format
* internet data language

### Popularity Reasons

* human readable format
* simple lightweight structure
* easy debugging tools

### Cross Language Support

* javascript built in support
* python json module
* rust serde json
* java jackson library
* go encoding json

## JSON Structure

### Object Structure

* enclosed with braces
* key value pairs
* hierarchical representation

### Key Rules

* keys must be strings
* double quoted keys
* consistent formatting rules

## JSON Data Types

### String

* textual data values
* enclosed in quotes

### Number

* integers and decimals
* numeric values

### Boolean

* true or false
* logical state values

### Null

* empty value placeholder
* absence of data

### Array

* ordered value list
* multiple elements collection

### Object

* nested structured data
* hierarchical relationships

## Text Serialization Formats

### Characteristics

* human readable data
* easier debugging
* moderate performance

### Examples

* json format
* xml format
* yaml format

## Binary Serialization Formats

### Characteristics

* compact data size
* faster processing speed
* machine optimized structure

### Examples

* protocol buffers
* avro format
* messagepack format

## API Data Flow

### Client Side Process

* create application object
* serialize object to json
* send http request

### Network Transfer

* data travels internet
* transmitted as bytes
* delivered to server

### Server Side Process

* receive json payload
* deserialize json data
* process server logic
* send json response

### Client Response Handling

* receive server response
* deserialize json data
* update user interface

## JSON Usage

### APIs

* rest api responses
* client server communication

### Configuration

* application config files
* package json settings

### Logging Systems

* structured log entries
* machine readable logs

### Databases

* document based storage
* mongodb json documents

### Messaging Systems

* event payloads
* message queue data

## Distributed Systems Role

### System Communication

* browser server interaction
* microservice communication
* mobile api requests

### Infrastructure Usage

* event driven systems
* message queues
* data storage layers

## Core Concept Summary

* serialization prepares data
* deserialization reconstructs data
* json common internet format
* enables cross language communication
