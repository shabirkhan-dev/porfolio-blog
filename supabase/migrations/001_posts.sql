-- Run this in the Supabase SQL editor (or via Supabase CLI).

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  excerpt text not null,
  summary text not null,
  standfirst text,
  takeaways text[] default '{}',
  body text not null default '',
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc);

create index if not exists posts_slug_idx on public.posts (slug);

create or replace function public.set_posts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_posts_updated_at();

alter table public.posts enable row level security;

-- Public (anon + signed-in) visitors may only read published posts.
-- Note: `TO anon, authenticated` is correct here because published posts are
-- intentionally public; there is no per-row ownership to enforce.
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
on public.posts
for select
to anon, authenticated
using (status = 'published');

-- This portfolio app only READS published posts (publishable/anon key). Any
-- writes (create/update/delete) and draft reads are handled by a separate
-- dashboard project using the server-side secret key (`sb_secret_...` / legacy
-- service_role), which bypasses RLS. No mutation policy is exposed to the
-- anon/authenticated roles here.
--
-- The deprecated `auth.role() = 'authenticated'` pattern is intentionally NOT
-- used: it breaks silently when anonymous sign-ins are enabled.
