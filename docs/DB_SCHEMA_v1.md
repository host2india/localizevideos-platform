# Database Schema v1 – Credits & Jobs

## Overview
Purpose of credits system and audit guarantees.

## Tables
- credits_wallet
- credits_ledger
- credit_reservations
- jobs

## Enums
- CreditType
- CreditAction
- ReservationStatus
- JobStatus

## Relationships
User ↔ Wallet
User ↔ Ledger
User ↔ Jobs

## Credit Flow
Reserve → Commit → Ledger → Wallet

## Constraints
- One wallet per user
- One active reservation per job
- Ledger append-only

## Notes
- Server recalculates credits
- Desktop values are advisory only
