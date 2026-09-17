# Anant's Cybersecurity Roadmap

A 16-week cybersecurity roadmap site with progress tracking (checkboxes, progress bars, and a study-hours log). Progress saves to your browser right away, and syncs across devices when you sign in with an email magic link (Supabase).

Plain HTML/CSS/JS. There's no build step.

```
index.html          page layout + static sections
styles.css          styling (light/dark)
data.js             phases, weeks, tasks, resources  ← edit content here
app.js              rendering, progress, Supabase sync
config.js           your Supabase URL + anon key     ← fill this in
supabase/schema.sql database table + security rules
```

---

## 1. Set up Supabase (about 5 min)

1. Sign up at https://supabase.com and create a **New project** (Free plan; pick the Mumbai region).
2. Open **SQL Editor → New query**, paste everything from `supabase/schema.sql`, and click **Run**.
3. Go to **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL` in `config.js`
   - **anon public** key → `SUPABASE_ANON_KEY` in `config.js`
   (Never use the `service_role` key here.)

## 2. Put it on GitHub

1. Create a new repository on GitHub, e.g. `cyber-roadmap` (public or private, either works).
2. Upload all these files (drag and drop on github.com works), or:
   ```bash
   git init
   git add .
   git commit -m "Cyber roadmap site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/cyber-roadmap.git
   git push -u origin main
   ```

## 3. Deploy on Vercel

1. Go to https://vercel.com, sign in with GitHub, and click **Add New → Project**.
2. Import the `cyber-roadmap` repo.
3. Framework preset: **Other**. Leave Build Command and Output Directory empty.
4. Click **Deploy**. You'll get a URL like `https://cyber-roadmap-xyz.vercel.app`.

From now on, every push to GitHub redeploys automatically.

## 4. Connect login to your Vercel URL (important)

In Supabase → **Authentication → URL Configuration**:

- **Site URL:** `https://cyber-roadmap-xyz.vercel.app`
- **Redirect URLs:** add `https://cyber-roadmap-xyz.vercel.app/**`
  (also add `http://localhost:8000/**` if you test locally)

Without this, the magic link will send you to the wrong page.

## 5. Use it

1. Open your Vercel URL → **Sign in to sync** → enter your email.
2. Open the link from the email **on the same device/browser**.
3. Repeat once on your phone, laptop, or anywhere else. They all show the same progress.

Progress you made before signing in on a device gets merged into your cloud copy the first time you sign in there.

### Lock it to just you (recommended)

After you've signed in once, go to Supabase → **Authentication → Sign In / Providers** and turn off **Allow new users to sign up**. Even without this, other people could only ever see their own progress, never yours. That's enforced by Row Level Security in `schema.sql`.

---

## Good to know

- **Magic link emails:** Supabase's built-in email sender allows only a few emails per hour. That's fine for one person. If a link doesn't arrive, wait a bit and check spam.
- **Free projects pause** after about a week with no activity. If sync stops working, open the Supabase dashboard and click **Restore**. Your data is kept.
- **Editing content:** change task text, resources, etc. in `data.js`. Don't change a task's `id` (like `"w3-b"`) after you've started ticking, or that tick gets lost. Adding new tasks with new ids is fine.
- **Test locally:** run `python -m http.server 8000` in this folder and open http://localhost:8000.
- **Is the anon key safe in a public repo?** Yes. It's designed to be public. Your data is protected by the RLS policies, which only let a signed-in user read or write their own row.
