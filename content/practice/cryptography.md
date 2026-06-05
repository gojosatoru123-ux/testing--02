---
title:  Cryptography
articleSlug: cryptography
difficulty: Intermediate
estimatedTime: 20 mins
---
<!-- QUESTION -->
difficulty: Hard
tags: cryptography, distributed-systems, security

Why is cryptography foundational in large-scale distributed systems?

<!-- ANSWER -->
Distributed systems communicate over:
- untrusted networks
- public internet
- third-party infrastructure

Without cryptography:

```text
Attackers may intercept or modify data
```

Core goals of cryptography:

| Goal            | Purpose                     |
| --------------- | --------------------------- |
| Confidentiality | Prevent unauthorized access |
| Integrity       | Detect tampering            |
| Authentication  | Verify identity             |
| Non-repudiation | Prevent denial of actions   |

Examples:

* HTTPS
* JWT signatures
* encrypted databases

Cryptography is essential for securing modern distributed architectures.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: symmetric-encryption, scalability, cryptography

Why is symmetric encryption significantly faster than asymmetric encryption?

<!-- ANSWER -->
Symmetric encryption uses:

```text
Single shared secret key
```

Algorithms:

* AES
* ChaCha20

Benefits:

| Benefit                    | Explanation                       |
| -------------------------- | --------------------------------- |
| Extremely fast computation | Efficient mathematical operations |
| Lower CPU overhead         | Suitable for bulk encryption      |
| Better scalability         | High-throughput communication     |

Asymmetric encryption involves:

* public/private key mathematics
* expensive computations

Example:

```text id="6m2xqc"
HTTPS encrypts bulk traffic using symmetric session keys
```

Symmetric cryptography is optimized for performance-sensitive systems.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: asymmetric-encryption, public-key-cryptography, authentication

Why is asymmetric cryptography critical for secure internet communication?

<!-- ANSWER -->
Symmetric encryption requires secure key sharing.

Problem:

```text
How do two strangers safely exchange secret keys?
```

Asymmetric cryptography solves this using:

* public keys
* private keys

Workflow:

```text id="6p1qxt"
Public Key encrypts
Private Key decrypts
```

Benefits:

| Benefit              | Explanation                 |
| -------------------- | --------------------------- |
| Secure key exchange  | No pre-shared secret needed |
| Digital signatures   | Identity verification       |
| Internet-scale trust | Public key infrastructure   |

Examples:

* RSA
* ECC
* Diffie-Hellman

Asymmetric cryptography enables secure communication across untrusted networks.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: hashing, password-security, cryptography

Why should passwords never be stored using plain cryptographic hashes alone?

<!-- ANSWER -->
Fast hashes are vulnerable to:
- brute-force attacks
- rainbow tables
- GPU acceleration

Problem:

```text
Attackers can rapidly test billions of password guesses
```

Unsafe algorithms:

* MD5
* SHA1
* plain SHA256

Secure password hashing requires:

* salting
* computational cost
* memory hardness

Recommended algorithms:

* bcrypt
* Argon2
* scrypt

Example:

```text id="5m2xqc"
Each password stored with unique random salt
```

Password hashing must intentionally slow attackers.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: tls, https, cryptography

Why does HTTPS combine both asymmetric and symmetric cryptography?

<!-- ANSWER -->
Asymmetric cryptography is secure but computationally expensive.

Symmetric cryptography is fast but requires shared secrets.

HTTPS combines both.

Workflow:

| Step | Purpose |
|---|---|
| Asymmetric handshake | Securely exchange session key |
| Symmetric encryption | Encrypt actual traffic efficiently |

Architecture:

```text id="clt6p5"
TLS Handshake → Shared Session Key → Fast Encrypted Communication
```

Benefits:

| Benefit             | Explanation               |
| ------------------- | ------------------------- |
| Secure key exchange | Public key cryptography   |
| High performance    | Symmetric bulk encryption |

Hybrid cryptographic design enables scalable secure internet communication.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: digital-signatures, integrity, authentication

Why are digital signatures critical in distributed systems?

<!-- ANSWER -->
Digital signatures verify:
- authenticity
- integrity
- sender identity

Workflow:

```text
Private Key signs
Public Key verifies
```

Benefits:

| Benefit          | Explanation                   |
| ---------------- | ----------------------------- |
| Tamper detection | Data modifications detectable |
| Authentication   | Verify sender identity        |
| Non-repudiation  | Sender cannot deny action     |

Example:

```text id="4q2xmc"
JWT signed by authentication server
```

Without signatures:

```text id="uq86fi"
Attackers may forge trusted messages
```

Digital signatures are foundational for secure distributed communication.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: key-management, cryptography, security-engineering

Why is key management often harder than encryption itself?

<!-- ANSWER -->
Encryption security depends entirely on:
- key secrecy
- key rotation
- secure storage

Problem:

```text
Compromised keys invalidate encryption security
```

Challenges:

| Challenge          | Impact                       |
| ------------------ | ---------------------------- |
| Secure storage     | Prevent unauthorized access  |
| Key rotation       | Minimize compromise duration |
| Distributed access | Multi-service coordination   |
| Backup protection  | Prevent key loss             |

Solutions:

* HSMs
* KMS systems
* Vault services

Examples:

* AWS KMS
* HashiCorp Vault
* Google Cloud KMS

Cryptographic systems are only as secure as their key management practices.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: forward-secrecy, tls, cryptography

Why is Perfect Forward Secrecy important in modern secure communication?

<!-- ANSWER -->
Without Forward Secrecy:

```text
Compromised long-term private key decrypts past traffic
```

Perfect Forward Secrecy uses:

* temporary session keys
* ephemeral key exchange

Example:

```text id="6m3qpd"
Ephemeral Diffie-Hellman session keys
```

Benefits:

| Benefit                          | Explanation                |
| -------------------------------- | -------------------------- |
| Past traffic protection          | Old sessions remain secure |
| Reduced breach impact            | Limited compromise scope   |
| Better long-term confidentiality | Historical data protected  |

Modern TLS systems strongly prefer forward secrecy-enabled cipher suites.

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: encryption-at-rest, data-security, compliance

Why is encryption at rest important even when network traffic is encrypted?

<!-- ANSWER -->
HTTPS protects:

```text
Data in transit
```

But stored data remains vulnerable to:

* disk theft
* database compromise
* backup leakage

Encryption at rest protects stored information.

Examples:

* encrypted databases
* encrypted disks
* encrypted backups

Benefits:

| Benefit               | Explanation               |
| --------------------- | ------------------------- |
| Data theft protection | Stolen storage unreadable |
| Compliance support    | Regulatory requirements   |
| Reduced insider risk  | Raw storage inaccessible  |

Example:

```text id="1q8vza"
Encrypted cloud storage bucket
```

Secure systems require both:

* encryption in transit
* encryption at rest

<!-- END -->

<!-- QUESTION -->
difficulty: Hard
tags: cryptography, security, trade-offs

What are the major trade-offs when applying cryptography in large-scale systems?

<!-- ANSWER -->
Cryptography improves security but introduces operational and performance costs.

Advantages:

| Advantage | Explanation |
|---|---|
| Confidentiality | Prevent unauthorized access |
| Integrity protection | Detect tampering |
| Strong authentication | Verify identity |

Trade-offs:

| Trade-off | Explanation |
|---|---|
| CPU overhead | Encryption/decryption cost |
| Key management complexity | Rotation and storage challenges |
| Increased latency | Cryptographic operations |
| Operational risk | Misconfiguration consequences |

Example:

```text id="7v2xpd"
Strong encryption may increase API response latency
```

Cryptographic system design fundamentally balances:

* security
* scalability
* performance
* operational complexity

<!-- END -->