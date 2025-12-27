🛡️ PHASE-02 — Security Hardening

Project: LocalizeVideos
Phase: 02 — Security
Status: ✅ Completed
Environment: Production
Owner: LocalizeVideos Core Team
Completed On: 2025-12-27

🎯 Objective

Establish a defense-in-depth security posture across:

Network edge

Operating system

Reverse proxy

Application surface

This phase ensures that no single failure compromises the system.

🔐 Security Strategy

The platform follows a layered security model:

Internet
 → NGINX (TLS, headers, rate limits)
 → OS (Firewall, Fail2Ban)
 → Application (Auth, CSRF, validation)
 → Database (isolated, managed)


Each layer assumes the previous one may fail and enforces its own protections.

🌐 Edge & Network Security (NGINX)
TLS Hardening

HTTPS enforced

HTTP permanently redirected to HTTPS

TLS versions restricted to:

TLS 1.2

TLS 1.3

Weak ciphers disabled

Security Headers

The following headers are enforced globally:

Strict-Transport-Security (HSTS)

X-Frame-Options

X-Content-Type-Options

Referrer-Policy

Permissions-Policy

These protect against:

Clickjacking

MIME sniffing

XSS vectors

Data leakage

🚦 Rate Limiting
API-Level Controls

/api/* → general rate limiting

/api/auth/* → stricter rate limits

Purpose

Prevent brute-force attacks

Limit automated abuse

Reduce impact of scanners & bots

Rate limiting is enforced at the edge, before traffic reaches the application.

🖥️ OS-Level Security
Firewall (UFW)

Enabled and enforced

Allowed ports:

22 (SSH)

80 (HTTP → HTTPS redirect)

443 (HTTPS)

All other ports denied by default

Fail2Ban

Fail2Ban is enabled and actively banning attackers.

Protected Services

SSH (brute-force protection)

NGINX bot & scanner detection

Behavior

Automatically bans IPs after repeated failures

Protects against:

Credential stuffing

SSH brute-force

Automated scanning

Fail2Ban operates independently of the application.

⚙️ Application-Level Security
Authentication

JWT-based authentication

Tokens stored in httpOnly, secure cookies

No tokens in:

LocalStorage

SessionStorage

Authorization headers

CSRF Protection

Enforced via Origin checks

Requests without valid origin rejected

Input Validation

All API inputs validated using Zod

Invalid or malformed requests rejected early

Data Exposure Rules

No sensitive fields returned in responses

Password hashes never exposed

Error messages sanitized

🗄️ Database Security

PostgreSQL is managed and isolated

No public database access

Access only from application layer

Prisma used as the sole DB interface

🚫 Explicitly Prohibited Actions

The following actions are forbidden in production:

Disabling rate limits

Disabling Fail2Ban

Lowering TLS standards

Exposing Node.js ports publicly

Storing auth tokens outside httpOnly cookies

Bypassing input validation

Violations require incident handling and documentation.

✅ Validation & Exit Criteria

Phase-02 was considered complete when:

HTTPS fully enforced

Security headers verified

Rate limits active and tested

Fail2Ban banning confirmed

Auth flows secured

No sensitive data leakage detected

All criteria met.

🧊 Security Invariants (DO NOT BREAK)

HTTPS is mandatory

NGINX is the only public entry point

Auth tokens are httpOnly cookies only

Rate limiting must remain active

Fail2Ban must remain enabled

Any change requires a new phase and documentation.

🔗 Related Phases

PHASE-01 — Infrastructure Foundation

PHASE-03 — NGINX & Reverse Proxy

PHASE-07 — Application Security

🏆 Outcome

LocalizeVideos now operates with a production-grade security posture that is:

Layered

Enforced

Auditable

Resilient against common attack vectors
