# Vishram Sthal Hotel Booking Platform

A luxury hotel booking platform for Vishram Sthal, beautifully located in Word No. 6, Dehra Gopipur.

## Tech Stack
- Next.js 15 (App Router, Server Components)
- Tailwind CSS 4 (Orange/Amber Palette, Dark Mode)
- Clerk Authentication
- Razorpay Payments
- Prisma ORM + PostgreSQL
- Zustand State Management
- Recharts (Admin Dashboard)

## Setup Instructions

1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Update your `.env.local` with your Database URL, Clerk Keys, Razorpay Keys, and Admin JWT Secret.
4. **Setup Database:**
   Ensure you have a PostgreSQL database running, then push the schema:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
5. **Seed Database:**
   Add `"prisma": { "seed": "ts-node prisma/seed.ts" }` to your `package.json` if it's missing, then run:
   ```bash
   npm run prisma:seed
   ```
6. **Start Development Server:**
   ```bash
   npm run dev
   ```

## Default Admin Credentials
- **Username**: `Admin`
- **Password**: `admin`
