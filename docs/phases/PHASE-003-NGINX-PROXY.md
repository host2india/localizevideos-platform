🌐 PHASE-03 — NGINX & Reverse Proxy

Project: LocalizeVideos
Phase: 03 — NGINX & Reverse Proxy
Status: ✅ Completed
Environment: Production
Owner: LocalizeVideos Core Team
Completed On: 2025-12-27

🎯 Objective

Introduce a secure, resilient reverse proxy layer that:

Acts as the single public entry point

Terminates TLS

Enforces security controls

Shields the application from direct exposure

This phase establishes NGINX as a hard security boundary, not a convenience proxy.

🧱 Role of NGINX in the Architecture

NGINX is responsible for:

Handling all inbound traffic

TLS termination

HTTP → HTTPS redirection

Reverse proxying to the application

Applying security headers

Enforcing rate limits

Blocking bots and scanners

Supporting WebSockets

The Node.js application is never exposed directly.

🔐 TLS & HTTPS Enforcement
HTTPS Strategy

All traffic must use HTTPS

HTTP requests are permanently redirected (301)

TLS Configuration

Allowed versions:

TLS 1.2

TLS 1.3

Deprecated protocols disabled

Strong ciphers enforced

Certificates are managed automatically via Let’s Encrypt (Certbot).

🔒 Security Headers

The following headers are enforced at the proxy level:

Strict-Transport-Security (HSTS)

X-Frame-Options

X-Content-Type-Options

Referrer-Policy

Permissions-Policy

These protections apply globally, regardless of application behavior.

🔁 Reverse Proxy Configuration
Internal Routing

Public HTTPS → NGINX

NGINX → Application (127.0.0.1:3100)

Internal traffic never leaves the host

Headers Passed to Application

Host

X-Real-IP

X-Forwarded-For

X-Forwarded-Proto

These ensure:

Correct client IP logging

Accurate protocol detection

Secure cookie handling

🔌 WebSocket Support

NGINX is configured to support WebSockets, required for:

Next.js runtime features

Streaming / real-time behavior (if introduced later)

Upgrade headers are explicitly enabled.

🚦 Rate Limiting at Proxy Level
Implemented Controls

/api/* → general rate limiting

/api/auth/* → stricter rate limits

Benefits

Blocks brute-force attempts early

Reduces load on application layer

Prevents abuse and scanning

Rate limiting is applied before requests reach Node.js.

🤖 Bot & Scanner Mitigation

NGINX integrates with:

Fail2Ban filters

Bot detection patterns

This allows automatic banning of:

Aggressive scanners

Credential stuffing attempts

Malicious crawlers

📂 Configuration Management
Key Files

Main NGINX config: /etc/nginx/nginx.conf

Site config: /etc/nginx/sites-available/localizevideos

⚠️ These files are production-critical.

Rules

Never edit without backup

Always test configuration before reload

Reload, do not restart, when possible

🧪 Validation & Testing

Phase-03 was validated by:

HTTPS-only access confirmed

HTTP redirects verified

Proxy routing verified

WebSockets tested

Rate limits triggered intentionally

Headers verified via curl

All tests passed.

🚫 Explicitly Forbidden Actions

Exposing Node.js ports publicly

Disabling TLS

Removing security headers

Bypassing NGINX for “debugging”

Editing configs without testing

Violations constitute a production incident.

🧊 Proxy Invariants (DO NOT BREAK)

NGINX is always the entry point

TLS termination happens at NGINX

Application remains private

Rate limiting remains active

Security headers remain enforced

Any change requires a new documented phase.

🔗 Related Phases

PHASE-01 — Infrastructure Foundation

PHASE-02 — Security Hardening

PHASE-07 — Application Security

🏆 Outcome

NGINX now operates as a hardened, production-grade reverse proxy providing:

Security

Stability

Control

Observability

This layer ensures the application can evolve without increasing risk.
