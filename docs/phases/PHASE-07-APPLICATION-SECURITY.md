🔐 PHASE-07 — Application Security

Project: LocalizeVideos
Phase: 07 — Application Security
Status: ✅ Completed
Environment: Production
Owner: LocalizeVideos Core Team
Completed On: 2025-12-27

🎯 Objective

Establish a robust, production-grade application security model that protects:

User authentication & sessions

APIs and server actions

Sensitive data

Internal business logic

This phase ensures security is enforced by design, not by convention.

🧠 Security Philosophy

LocalizeVideos follows these principles:

Deny by default

Trust nothing from the client

Stateless authentication

Server-controlled sessions

Explicit validation everywhere

If something is not explicitly allowed, it is rejected.

🔑 Authentication Model
Method

JWT-based authentication

Tokens stored in httpOnly cookies

No localStorage / sessionStorage usage

Properties

httpOnly: prevents XSS token theft

secure: enabled in production

sameSite=lax: protects against CSRF

Path scoped to /

Outcome

Tokens inaccessible to JavaScript

Session fixation attacks mitigated

Browser-enforced protections active

🪪 Authorization Model
Role-Based Access Control (RBAC)

Roles include (example):

USER

ADMIN

Authorization is enforced:

Server-side only

Inside API routes and server logic

Never trusted from client input

Client-side checks are UX only — never security.

🛡️ CSRF Protection

CSRF is mitigated via multiple layers:

httpOnly cookies

sameSite cookie policy

Origin / Host validation in sensitive routes

No token-based CSRF bypasses

Requests without valid origin context are rejected.

🧪 Input Validation
Validation Library

Zod

Where Validation Happens

API routes

Auth endpoints

Server actions

Any user-supplied payload

Rules

No unvalidated input reaches business logic

No implicit type coercion

All schemas are explicit

Invalid input returns controlled errors — never stack traces.

🔒 API Security
API Characteristics

All APIs are server-only

No public mutation endpoints without authentication

Sensitive routes protected by auth middleware

Protections

Rate limiting at NGINX + app level

Auth checks before DB access

No sensitive fields returned in responses

🗄️ Database Security

Access only via Prisma ORM

No raw SQL exposed to clients

Credentials stored only in .env.production

No credentials logged

No admin DB access from frontend

🔐 Secrets Management

Secrets include:

JWT secret

Database URL

Internal keys

Rules:

Stored only in .env.production

Never committed to Git

Rotated via redeploy

Loaded into runtime only via PM2 --update-env

🧯 Error Handling & Leakage Prevention

No stack traces returned to clients

Generic error messages for auth failures

Detailed errors logged server-side only

Production logs reviewed regularly

Security errors do not reveal internal state.

🚨 Known Benign Warning (Documented)
Next.js Server Action Warning
Failed to find Server Action "x"


Cause

Client invokes server action from an older deployment

Impact

No security risk

No auth bypass

No data loss

Action

None required

User refresh resolves issue

This is expected behavior in Next.js production deployments.

🚫 Explicitly Forbidden Practices

Storing tokens in localStorage

Trusting client-provided roles

Skipping validation “temporarily”

Logging secrets

Bypassing auth for convenience

Debug endpoints in production

Violations are treated as security incidents.

🔍 Verification Checklist

Application security is considered healthy if:

Login sets httpOnly cookie

Logout clears cookie

/api/me requires auth

Invalid input is rejected

No secrets appear in logs

CSRF attempts fail

Rate limits activate under abuse

🧊 Security Invariants (DO NOT BREAK)

Auth is server-enforced

Cookies are httpOnly + secure

Validation is mandatory

Secrets are never exposed

Production ≠ development shortcuts

Any change requires a new documented phase.

🔗 Related Documents

PHASE-02 — Security (Infrastructure)

PHASE-03 — NGINX & Proxy

PHASE-06 — Deployment & Release Flow

PRODUCTION-RUNBOOK

🏆 Outcome

LocalizeVideos now operates with defense-in-depth application security that is:

Modern

Auditable

Hardened against common attacks

Ready for scale
