🏗️ LocalizeVideos – System Architecture

Status: 🟢 Production
Environment: Production
Last Updated: 2025-12-27
Owner: LocalizeVideos Core Team

This document describes the high-level architecture of the LocalizeVideos platform.
It explains how components interact, where responsibilities lie, and what must not be violated.

🎯 Architecture Goals

Security-first design

Minimal public attack surface

Clear separation of concerns

Predictable deployment & operations

Easy future scaling without rewrites

🧱 High-Level Architecture
┌──────────────┐
│   Browser    │
│  (User)      │
└──────┬───────┘
       │ HTTPS (443)
       ▼
┌──────────────┐
│   NGINX      │
│ Reverse Proxy│
│ + TLS        │
│ + Rate Limit │
└──────┬───────┘
       │ Internal HTTP
       ▼
┌──────────────┐
│  Next.js     │
│ Application  │
│ (PM2)        │
│ Port: 3100   │
└──────┬───────┘
       │ Prisma
       ▼
┌──────────────┐
│ PostgreSQL   │
│ (Managed)    │
└──────────────┘

🌐 Edge Layer (NGINX)
Responsibilities

TLS termination (HTTPS)

HTTP → HTTPS redirect

Reverse proxy to application

Rate limiting

Security headers

Bot & scanner mitigation

Key Properties

Only ports 80 / 443 exposed publicly

No direct access to Node.js

WebSocket-safe configuration

TLS restricted to v1.2 / v1.3

⚠️ NGINX is part of the security boundary and must not be bypassed.

⚙️ Application Layer (Next.js)
Stack

Framework: Next.js 15.4.10

Router: App Router

Runtime: Node.js

Process Manager: PM2

Internal Port: 3100

Responsibilities

Render UI (SSR + static)

Handle API routes (/api/*)

Authentication & authorization

Business logic

Input validation

Secure cookie handling

Key Rules

App is never exposed directly

All traffic flows through NGINX

App runs as non-root deploy user

Environment loaded from .env.production

🔐 Authentication & Authorization
Authentication Model

JWT-based authentication

Tokens stored in httpOnly, secure cookies

No tokens in localStorage or headers

Security Controls

CSRF protection via Origin checks

Zod-based request validation

Role-based authorization at API level

No sensitive fields returned in responses

Auth Flow (Simplified)
Login → JWT issued → httpOnly cookie set
Request → Cookie validated → User context resolved

🗄️ Data Layer (PostgreSQL + Prisma)
Database

PostgreSQL (Managed service)

Not publicly accessible

Accessed only from application layer

ORM

Prisma

Schema migrations tracked

No raw SQL in API routes (unless explicitly documented)

Rules

No direct DB access from outside the app

No schema changes without migration

Production data treated as sensitive

🛡️ OS & Infrastructure Security
Server

Ubuntu 22.04

DigitalOcean droplet

Non-root operations (deploy user)

Protections

UFW firewall (22, 80, 443 only)

Fail2Ban enabled

SSH brute-force protection active

Bot & scanner blocking via NGINX

⚠️ Disabling any of these is a production violation.

🔁 Process Management (PM2)
Responsibilities

Run and supervise Node.js process

Restart on failure

Auto-start on reboot

Log management & rotation

Rules

PM2 is mandatory in production

App must not be run via npm start

PM2 must not be run as root

📦 Deployment Model
Deployment Type

Single-node production deployment

Manual build + restart (controlled)

Deployment Flow
Code change
→ npm run build
→ pm2 restart --update-env
→ Verification checks

Rollback Strategy

Revert code

Rebuild

Restart via PM2

Verify health endpoints

🚫 Explicit Non-Goals (By Design)

The following are intentionally not implemented (yet):

Horizontal auto-scaling

Kubernetes

Serverless functions

Public DB access

Multi-region deployment

These may be added only with new phase documentation.

🧊 Architectural Invariants (DO NOT BREAK)

NGINX always in front

No public Node.js ports

Auth via httpOnly cookies only

Prisma is the only DB access layer

PM2 is mandatory

Security > convenience

If any invariant changes, this document must be updated first.

📘 Related Documents

docs/PRODUCTION-RUNBOOK.md

docs/phases/PHASE-01-INFRA.md

docs/phases/PHASE-02-SECURITY.md

docs/phases/PHASE-07-APP-SECURITY.md

🏆 Captain’s Note

This architecture is:

Simple

Secure

Operable

Scalable when needed

No unnecessary complexity.
No accidental exposure.
