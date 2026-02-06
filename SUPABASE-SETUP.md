# Supabase Setup Guide (No Credit Card Required)

Supabase has a **free tier** that includes **Storage** and **Authentication** with **no credit card** required.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free).
2. Click **"New Project"**.
3. Choose your organization (or create one).
4. Fill in:
   - **Name:** e.g. `valentine-app`
   - **Database Password:** choose a strong password and **save it**.
   - **Region:** pick one close to you.
5. Click **"Create new project"** and wait for it to finish (1–2 minutes).

## Step 2: Get Your API Keys

1. In the project, go to **Settings** (gear icon) → **API**.
2. Copy:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys").

## Step 3: Add Environment Variables

1. In your project root, create or edit `.env`.
2. Add (use your real URL and key):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Restart the dev server: `npm run dev`.

## Step 4: Create the Database Table

1. In Supabase, go to **SQL Editor**.
2. Click **"New query"**.
3. Paste and run this SQL:

```sql
-- Valentine pages (one row per user)
create table if not exists public.valentines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  username text unique not null,
  name text,
  email text,
  photos jsonb default '[]'::jsonb,
  music text,
  relationship_start_date text,
  milestones jsonb default '[]'::jsonb,
  love_reasons jsonb default '[]'::jsonb,
  response jsonb,
  created_at timestamptz default now()
);

-- Allow users to read/write only their own row
alter table public.valentines enable row level security (rls);

create policy "Users can do everything on own valentines row"
  on public.valentines
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Anyone can read any valentine (for public /u/username pages)
create policy "Public read for shared pages"
  on public.valentines
  for select
  using (true);
```

4. Click **"Run"**.

## Step 5: Create Storage Bucket

1. Go to **Storage** in the left sidebar.
2. Click **"New bucket"**.
3. **Name:** `valentines`
4. **Public bucket:** turn **ON** (so shared Valentine pages can load images).
5. Click **"Create bucket"**.

### Storage policies (run in SQL Editor)

1. Go to **SQL Editor** → **New query**.
2. Paste and run this SQL to allow uploads to own folder and public read:

```sql
-- Allow authenticated users to upload to their own folder
create policy "Users can upload to own folder"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'valentines'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update/delete their own files
create policy "Users can update own files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'valentines'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete own files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'valentines'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read (so shared pages can show images)
create policy "Public read"
on storage.objects for select
using (bucket_id = 'valentines');
```

If your Supabase dashboard uses the policy UI instead of raw SQL:
- **Insert:** bucket = `valentines`, condition: first folder = `auth.uid()`
- **Update/Delete:** same condition
- **Select:** bucket = `valentines` (public read)

## Step 6: Enable Auth Providers

### Email/Password (usually on by default)

1. Go to **Authentication** → **Providers**.
2. Ensure **Email** is enabled.
3. **Important:** Click **Email** and turn **OFF** “Confirm email” if you want users to log in immediately without checking their inbox. (If you leave it on, they must click the confirmation link first.)

### Google (optional)

1. **Authentication** → **Providers** → **Google**.
2. Turn **Enable** on.
3. Add your Google OAuth Client ID and Secret (from Google Cloud Console).
4. Add authorized redirect URL: `https://your-project-id.supabase.co/auth/v1/callback`

(If you skip Google, the app will still work with email/password only.)

## Step 7: Default Data for New Users

The app creates a `valentines` row when a user signs up, with default `milestones` and `love_reasons`. No extra SQL is required if you use the Signup flow as implemented.

## Summary

- **No credit card** required for the free tier.
- **Storage** works on the free plan (1GB).
- **Auth** and **Database** are included.
- After setup, use `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then run the app with `npm run dev`.

## Troubleshooting

- **"Invalid API key"** – Double-check `.env` and that you restarted the dev server.
- **"Row level security"** – Make sure the RLS policies above are created and that the anon key is used in the app.
- **Upload fails** – Ensure the `valentines` bucket exists, is public if you want public read, and that the storage policies allow insert for the user’s folder.
- **"User already registered"** – Use the Login page or reset password from Supabase Auth.
- **Can't login after signup** – In Supabase go to **Authentication** → **Providers** → **Email** and disable **Confirm email** so new users get a session right away. Or check your email for the confirmation link.