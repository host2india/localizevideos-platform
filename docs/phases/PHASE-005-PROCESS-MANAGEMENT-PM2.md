⚙️ PHASE-05 — Process Management (PM2)

Project: LocalizeVideos
Phase: 05 — Process Management (PM2)
Status: ✅ Completed
Environment: Production
Owner: LocalizeVideos Core Team
Completed On: 2025-12-27

🎯 Objective

Establish a reliable, restart-safe, and observable process management layer for the LocalizeVideos application using PM2.

This phase ensures the application:

Runs continuously

Recovers from crashes

Survives server reboots

Loads environment variables correctly

Produces manageable logs

🧱 Why PM2

PM2 was selected for production because it provides:

Stable Node.js process supervision

Automatic restarts on failure

systemd integration (boot-time start)

Built-in log handling

Operational transparency

PM2 is intentionally preferred over:

npm start

background shell processes

custom systemd scripts

⚙️ PM2 Configuration
Execution Model

Mode: fork

User: deploy (non-root)

Single application instance

Environment loaded from .env.production

Application Identity

Process name: localizevideos-app

Managed exclusively by PM2

The application must never be run outside PM2 in production.

🔁 Application Lifecycle
Start (via ecosystem)
pm2 start ecosystem.config.js

Restart (SAFE RESTART)
pm2 restart localizevideos-app --update-env


⚠️ This is mandatory after:

Builds

Environment variable changes

Secret rotation

Stop (Controlled Only)
pm2 stop localizevideos-app


Stopping the app is permitted only during:

Maintenance windows

Incident response

🔌 Auto-Start on Boot

PM2 is integrated with systemd to ensure:

Application starts on server reboot

Last known good process list is restored

Persist process list
pm2 save


⚠️ Re-running pm2 startup is forbidden unless rebuilding the server.

📜 Logging Strategy
Log Sources

Application output log

Application error log

Log Rotation

Managed via pm2-logrotate

Automatic rotation enabled

Old logs pruned

Disk exhaustion prevented

No manual log cleanup is required.

🧪 Validation & Testing

This phase was validated by:

Manual restarts

Forced restarts

Environment variable updates

Server reboot simulation

Log inspection

All tests confirmed:

App returns online correctly

Environment reloads properly

No orphan processes exist

🚫 Explicitly Forbidden Actions

Running npm start in production

Running Node.js outside PM2

Running PM2 as root

Killing Node processes manually

Editing .env.production without restart

Violations constitute a production incident.

🧊 Process Management Invariants (DO NOT BREAK)

PM2 is mandatory

App runs as deploy user

Restarts use --update-env

Auto-start remains enabled

Log rotation remains active

Any deviation requires a new documented phase.

🔗 Related Phases

PHASE-01 — Infrastructure Foundation

PHASE-03 — NGINX & Reverse Proxy

PHASE-07 — Application Security

🏆 Outcome

LocalizeVideos now runs with production-grade process management that is:

Stable

Restart-safe

Observable

Operationally simple

This guarantees uptime and predictability under real-world conditions
