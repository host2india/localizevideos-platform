🚀 LocalizeVideos – Production Runbook

Status: 🟢 Production Live
Environment: Production
Last Updated: 2025-12-27
Owner: LocalizeVideos Core Team

This document is the single source of truth for operating the LocalizeVideos production system.

⚠️ If it is not written here, assume it is NOT safe to do in production.

1️⃣ SYSTEM OVERVIEW
🌐 Domain

https://localizevideos.com

HTTPS enforced (HTTP → HTTPS redirect)

🖥️ Server

Provider: DigitalOcean

OS: Ubuntu 22.04

User: deploy (non-root)

Firewall: UFW (22, 80, 443 only)

⚙️ Application

Framework: Next.js 15.4.10 (App Router)

Runtime: Node.js (managed by PM2)

Internal Port: 3100

Public Access: NGINX reverse proxy only

❌ No direct public Node.js port exposure

🗄️ Database

PostgreSQL (Managed)

ORM: Prisma

Migrations applied and tracked

Direct DB access only from application

2️⃣ SECURITY BASELINE (DO NOT BYPASS)
🔐 Edge & Network

NGINX reverse proxy

TLS v1.2 / v1.3 only

Security headers enforced:

HSTS

X-Frame-Options

X-Content-Type-Options

Referrer-Policy

Permissions-Policy

🚦 Rate Limiting

/api/* → rate-limited

/api/auth/* → stricter rate limits

🛡️ OS-Level Protection

Fail2Ban enabled

SSH brute-force protection active

NGINX bot / scanner protection enabled

🔑 Application Security

JWT authentication in httpOnly, secure cookies

CSRF protection via Origin checks

Input validation via Zod

No sensitive data exposed in API responses

⚠️ Disabling or bypassing any of the above is prohibited in production.

3️⃣ PM2 PROCESS MANAGEMENT

PM2 is the only supported process manager for production.

The application must always run under PM2 as the deploy user.

📊 View status
pm2 status


Expected:

localizevideos-app → online

Mode: fork

User: deploy

📜 View logs
pm2 logs localizevideos-app --lines 50


Used to:

Verify startup health

Inspect runtime behavior

Confirm expected warnings only

🔁 Restart application (SAFE RESTART)

⚠️ Mandatory after any build or environment change

pm2 restart localizevideos-app --update-env


Ensures:

New .env.production values are loaded

No stale secrets remain in memory

🔌 PM2 auto-start on reboot

PM2 is configured to:

Start automatically on server boot (systemd)

Restore the last saved process list

Verification (informational only):

pm2 startup
pm2 save


⚠️ Do NOT re-run pm2 startup unless rebuilding the server.

🧹 Log rotation

Enabled via pm2-logrotate

Logs rotate automatically

Old logs are pruned

Disk exhaustion protection active

No manual action required.

❌ What NOT to do with PM2

❌ Do NOT:

Run npm start directly

Kill Node.js processes manually

Run PM2 as root

Delete PM2 processes without restarting them

PM2 is part of the production contract.

4️⃣ STANDARD DEPLOYMENT PROCEDURE

Used for all normal deployments.

npm run build
pm2 restart localizevideos-app --update-env

✅ Mandatory verification after deployment

pm2 status → app is online

https://localizevideos.com
 loads

Login works

Logout works

/api/me returns user when authenticated

❌ If any check fails → rollback immediately

5️⃣ HOTFIX PROCEDURE (URGENT ONLY)

Used only for:

Security fixes

Critical production bugs

Steps

Apply minimal code change

Build:

npm run build


Restart:

pm2 restart localizevideos-app --update-env


Smoke test:

Home page

Login

/api/me

Record reason, date, and change

6️⃣ INCIDENT RESPONSE (QUICK REFERENCE)
🚨 Application not responding
pm2 restart localizevideos-app --update-env

📈 High CPU / memory usage

Restart application

Review recent deployments

Inspect PM2 logs

🔐 Authentication issues

Test login

Test logout

Test /api/me

Verify cookies in browser

Roll back last auth change if required

🕵️ Suspected attack

Check Fail2Ban status

Review NGINX access logs

❌ Do NOT disable protections

7️⃣ KNOWN ISSUES / NON-INCIDENTS
⚠️ Next.js Server Action Warning (Benign)

Error:

Failed to find Server Action "x"


Cause:
Triggered when a browser calls a Server Action from an older deployment after a new build.

Impact:

No security risk

No data loss

No authentication failure

Page refresh resolves it

Action:
No action required.
This is expected behavior in Next.js production deployments.

8️⃣ ROUTINE CHECKS
🗓️ Daily

pm2 status

Site loads

Login / logout works

📆 Weekly

Review Fail2Ban bans

Check disk usage

Confirm SSL auto-renewal

Review logs for anomalies

9️⃣ PRODUCTION FREEZE RULE

Production is frozen by default.

Changes allowed only for:

Security fixes

Critical bug fixes

Planned releases following this runbook

⚠️ If it is not documented here, it is NOT approved.

🔟 DOCUMENT OWNERSHIP

This runbook must be updated when:

Architecture changes

Security posture changes

Deployment procedures change
