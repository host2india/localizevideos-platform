🚀 PHASE-06 — Deployment & Release Flow

Project: LocalizeVideos
Phase: 06 — Deployment & Release Flow
Status: ✅ Completed
Environment: Production
Owner: LocalizeVideos Core Team
Completed On: 2025-12-27

🎯 Objective

Define a predictable, low-risk, repeatable deployment process that:

Avoids accidental downtime

Ensures environment correctness

Supports fast recovery (rollback)

Keeps production changes auditable

This phase formalizes how code reaches production.

🧭 Release Philosophy

LocalizeVideos follows a controlled, single-node release model:

No rolling deploys

No hot code edits

No partial restarts

Every release is build → restart → verify

Simplicity is a feature.

📦 Deployment Model
Type

Single production server

Manual but disciplined deployment

PM2-managed runtime

Why This Model

Full control

Clear failure boundaries

Easy rollback

Minimal moving parts

Automation can be added later without changing fundamentals.

🔁 Standard Deployment Flow
1️⃣ Prepare

Ensure working tree is clean

Confirm .env.production is correct

Confirm no pending infra changes

2️⃣ Build
npm run build


Rules

Build must succeed

Warnings reviewed

No ignored errors

If build fails → deployment stops immediately.

3️⃣ Restart (with environment reload)
pm2 restart localizevideos-app --update-env


This ensures:

Fresh build is loaded

Updated secrets are applied

No stale state remains

4️⃣ Verification (MANDATORY)

After restart, verify all of the following:

pm2 status → app is online

https://localizevideos.com
 loads

Login works

Logout works

/api/me returns authenticated user

No unexpected errors in PM2 logs

❌ If any check fails → rollback immediately

🔙 Rollback Strategy

Rollback is fast and explicit.

Steps

Revert code to last known good state

Rebuild:

npm run build


Restart:

pm2 restart localizevideos-app --update-env


Verify health checks again

Rollback always prefers stability over investigation.

🚑 Hotfix Flow (Emergency Only)

Used only for:

Security vulnerabilities

Production-breaking bugs

Hotfix Rules

Minimal code change

No refactors

No feature work

Steps

Apply fix

Build

Restart with --update-env

Smoke test:

Home page

Login

/api/me

Document the incident and fix

🧪 Post-Release Monitoring

Immediately after any deployment:

Watch PM2 logs

Observe error rate

Confirm no auth regressions

Check memory usage stability

Deployments are not complete until monitoring passes.

🚫 Explicitly Forbidden Practices

Editing files directly in production without build

Restarting without --update-env

Deploying without verification

Skipping rollback on failure

“Quick fixes” in live code

Violations are treated as production incidents.

🧊 Release Invariants (DO NOT BREAK)

Every deploy includes a build

Every deploy includes a restart

Every deploy includes verification

PM2 is the only runtime controller

Rollback is always available

Any change requires a new documented phase.

🔗 Related Phases

PHASE-05 — Process Management (PM2)

PHASE-07 — Application Security

PRODUCTION-RUNBOOK

🏆 Outcome

LocalizeVideos now has a disciplined, production-safe release flow that is:

Predictable

Recoverable

Auditable

Stress-resistant

This ensures changes reach users without risking stability.
