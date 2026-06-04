# Effy Tech Admin Panel V1 — Setup Guide

Follow these steps to set up the foundation for the internal team admin panel.

## 1. Configure Environment Variables
Locally, copy `.env.local.example` or update your existing `.env.local` to include:

```env
NEXT_PUBLIC_SUPABASE_URL=https://doinvqmxpdrmdqmbpovq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE
```
> [!IMPORTANT]
> Never commit real secrets to Git. Make sure `.env.local` is added to `.gitignore`.

---

## 2. Deploy Schema to Supabase
Open your Supabase Dashboard, go to the **SQL Editor**, and create a new query.
Copy and paste the entire contents of [admin_v1_schema.sql](file:///d:/work/effy%20tech/web%20site/supabase/admin_v1_schema.sql) and click **Run**.

This query will:
- Create `admin_profiles`, `work_assignments`, `work_sessions`, and `daily_work_logs` tables.
- Set up performance and relational indexes.
- Create dynamic `updated_at` triggers.
- Define a `public.is_admin(uid uuid)` helper function with `SECURITY DEFINER` (to prevent RLS infinite recursion).
- Enable RLS policies guarding all access.

---

## 3. Seed Admin and Member Users
Because we do not use public sign-ups for security reasons, users must be created manually:

1. Go to **Supabase Dashboard** -> **Authentication** -> **Users**.
2. Click **Add User** -> **Create User**.
3. Enter work email and password. Confirm or set as verified.
4. Copy the newly created User ID (`UUID`).

---

## 4. Insert Profile Rows Manually
Once you have the authentication `UUID` values, go back to the **SQL Editor** and run the following queries to create the corresponding profile records (replace `AUTH_USER_UUID_HERE` with the actual User IDs):

### Insert Admin Profile:
```sql
insert into public.admin_profiles (id, name, email, role)
values
('AUTH_USER_UUID_HERE', 'Adnan', 'adnan@example.com', 'admin');
```

### Insert Member Profile:
```sql
insert into public.admin_profiles (id, name, email, role)
values
('AUTH_USER_UUID_HERE', 'Member 1', 'member1@example.com', 'member');
```

> [!NOTE]
> Since RLS is enabled, the first profile insert is allowed directly from the Supabase SQL Editor because it runs as a superuser (`postgres`), completely bypassing Row Level Security.

---

## 5. Running the Site Locally
To run the Next.js development server:
```bash
npm install
npm run dev
```

---

## 6. How to Test and Verify
1. Access the admin interface at `http://localhost:3000/admin`.
   - If not authenticated, you will be redirected to `http://localhost:3000/admin/login`.
2. Sign in with the **Admin** credentials:
   - You should be successfully redirected to `/admin/dashboard`.
   - Verify that "My Work", "Dashboard", and "Reports" links are visible.
3. Logout and sign in with the **Member** credentials:
   - You should be redirected to `/admin/my-work`.
   - Verify that "Dashboard" and "Reports" links are hidden.
4. Attempt to access `/admin/dashboard` or `/admin/reports` directly in the URL bar while signed in as a Member:
   - The server component security guard will trigger and immediately redirect you back to `/admin/my-work`.
