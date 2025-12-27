# LocalizeVideos – Production Runbook

**Status:** 🟢 Production Live  
**Environment:** Production  
**Last Updated:** 2025-12-27  
**Owner:** LocalizeVideos Core Team

This document is the **single source of truth** for operating the
LocalizeVideos production system.

⚠️ If it is not written here, assume it is **NOT safe** to do in production.

---

## 1. SYSTEM OVERVIEW

### Domain
- https://localizevideos.com
- HTTPS enforced (HTTP → HTTPS redirect)

### Server
- Provider: DigitalOcean
- OS: Ubuntu 22.04
- User: `deploy` (non-root)
- Firewall: UFW (22, 80, 443 only)

### Application
- Framework: Next.js 15.4.10 (App Router)
- Runtime: Node.js (PM2 managed)
- Internal Port: 3100
- Public access via NGINX reverse proxy only

### Database
- PostgreSQL (Managed)
- ORM: Prisma
- Migrations applied and tracked

---

## 2. SECURITY BASELINE (DO NOT BYPASS)

### Edge & Network
- NGINX reverse proxy
- TLS v1.2 / v1.3 only
- Security headers enabled:
  - HSTS
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy

### Rate Limiting
- `/api/*` → rate-limited
- `/api/auth/*` → stricter rate limits

### OS-Level Protection
- Fail2Ban enabled
  - SSH brute-force protection
  - NGINX bot/scanner protection

### Application Security
- JWT authentication in **httpOnly secure cookies**
- CSRF protection via Origin checks
- Input validation via Zod
- No sensitive data exposed in API responses

---

## 3. PM2 PROCESS MANAGEMENT

PM2 is the **only supported process manager** for production.

The application must always be running under PM2 as the `deploy` user.

---

### View status
```bash
pm2 status

“Known Issues / Non-Incidents”:
### Next.js Server Action Warning (Benign)

Error:
Failed to find Server Action "x"

Cause:
Occurs when a client/browser triggers a Server Action from an older deployment
after a new build has been deployed.

Impact:
- No security risk
- No data loss
- No authentication failure
- User refresh resolves it

Action:
No action required.
This is expected behavior in Next.js production deployments.

