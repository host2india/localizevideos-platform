## Environment Configuration

The worker runs as an independent process and uses its own `.env` file
located at:

saas-backend/worker/.env

It shares the same PostgreSQL database as the SaaS backend but does NOT
share environment variables with the Next.js application.
