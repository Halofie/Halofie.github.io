create table if not exists public.galleries (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  title text not null default 'Private gallery',
  description text,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  storage_path text not null,
  alt text,
  sort_order integer not null default 0,
  unique (gallery_id, storage_path)
);

alter table public.galleries enable row level security;
alter table public.gallery_images enable row level security;

-- The Edge Function uses the service-role key and is the only read path.
revoke all on public.galleries from anon, authenticated;
revoke all on public.gallery_images from anon, authenticated;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', false)
on conflict (id) do update set public = false;

drop policy if exists "Gallery files are never public" on storage.objects;
create policy "Gallery files are never public"
  on storage.objects for all
  to anon, authenticated
  using (false)
  with check (false);
