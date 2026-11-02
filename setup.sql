-- KONG MOD / Supabase Postgres. Chạy toàn bộ một lần trong SQL Editor.
-- Không chứa mật khẩu. Sau đó chạy grant-admin.sql sau khi tạo tài khoản Auth.
begin;
create schema if not exists kong_private;
revoke all on schema kong_private from public, anon, authenticated;
create table if not exists kong_private.admins(user_id uuid primary key references auth.users(id) on delete cascade);
revoke all on kong_private.admins from public, anon, authenticated;
create or replace function public.is_site_admin() returns boolean
language sql stable security definer set search_path = '' as $$
 select exists(select 1 from kong_private.admins where user_id=auth.uid());
$$;
revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to anon,authenticated;

create or replace function public.kong_valid_media(media jsonb) returns boolean
language sql immutable set search_path = '' as $$
 select jsonb_typeof(media)='array' and jsonb_array_length(media)<=8
 and not exists(select 1 from jsonb_array_elements(media) x where
 coalesce(x->>'type','') not in ('image','video') or coalesce(x->>'url','') !~ '^https://[^[:space:]]+$');
$$;
create table if not exists public.kong_items(
 id uuid primary key default gen_random_uuid(),
 title text not null check(length(trim(title)) between 1 and 140),
 kind text not null check(kind in ('download','key','file','guide')),
 platform text not null check(platform in ('ios','android','all')),
 url text not null default '' check(url='' or url ~ '^https://[^[:space:]]+$'),
 image text not null default '' check(image='' or image ~ '^https://[^[:space:]]+$' or image ~ '^\./[a-zA-Z0-9_.-]+$'),
 description text not null default '' check(length(description)<=10000),
 status text not null default 'ready' check(status in ('ready','maintenance','paused')),
 maintenance_message text not null default '' check(length(maintenance_message)<=10000),
 published boolean not null default false,
 featured boolean not null default false,
 sort_order integer not null default 0 check(abs(sort_order::bigint)<=1000000),
 starts_at timestamptz, ends_at timestamptz,
 preview_enabled boolean not null default false,
 preview_media jsonb not null default '[]' check(public.kong_valid_media(preview_media)),
 changelog text not null default '' check(length(changelog)<=10000),
 version_label text not null default '' check(length(version_label)<=10000),
 deleted_at timestamptz,
 updated_at timestamptz not null default now(),revision integer not null default 1,
 check(ends_at is null or starts_at is null or ends_at>starts_at),
 check(status<>'ready' or url<>'')
);
-- Nâng cấp ràng buộc ảnh khi chạy lại từ bản dùng thư mục assets.
alter table public.kong_items drop constraint if exists kong_items_image_check;
alter table public.kong_items add constraint kong_items_image_check check(image='' or image ~ '^https://[^[:space:]]+$' or image ~ '^\./(assets/)?[a-zA-Z0-9_-][a-zA-Z0-9_.-]*\.(png|jpeg|jpg|gif|webp|svg)$');
create index if not exists kong_items_listing on public.kong_items(kind,platform,sort_order);
create table if not exists public.kong_settings(
 id integer primary key check(id=1),data jsonb not null check(jsonb_typeof(data)='object'),
 revision integer not null default 1,updated_at timestamptz not null default now()
);
insert into public.kong_settings(id,data) values(1,'{}') on conflict do nothing;
create table if not exists public.kong_audit(
 id bigint generated always as identity primary key,actor uuid,entity text not null,
 entity_id text not null,action text not null,old_data jsonb,new_data jsonb,
 created_at timestamptz not null default now()
);
create or replace function kong_private.touch_row() returns trigger language plpgsql set search_path='' as $$
begin
 new.updated_at=now();
 if TG_OP='UPDATE' then new.revision=old.revision+1;else new.revision=1;end if;
 return new;
end;$$;
create or replace function kong_private.log_change() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.kong_audit(actor,entity,entity_id,action,old_data,new_data)
 values(auth.uid(),TG_TABLE_NAME,new.id::text,TG_OP,case when TG_OP='UPDATE' then to_jsonb(old) else null end,to_jsonb(new));
 return new;
end;$$;
revoke all on function kong_private.touch_row() from public,anon,authenticated;
revoke all on function kong_private.log_change() from public,anon,authenticated;
drop trigger if exists kong_touch on public.kong_items;
create trigger kong_touch before insert or update on public.kong_items for each row execute function kong_private.touch_row();
drop trigger if exists kong_log on public.kong_items;
create trigger kong_log after insert or update on public.kong_items for each row execute function kong_private.log_change();
drop trigger if exists kong_touch on public.kong_settings;
create trigger kong_touch before insert or update on public.kong_settings for each row execute function kong_private.touch_row();
drop trigger if exists kong_log on public.kong_settings;
create trigger kong_log after insert or update on public.kong_settings for each row execute function kong_private.log_change();
alter table public.kong_items enable row level security;
alter table public.kong_settings enable row level security;
alter table public.kong_audit enable row level security;
revoke all on public.kong_items,public.kong_settings,public.kong_audit from anon,authenticated;
grant select on public.kong_items,public.kong_settings to anon,authenticated;
grant insert,update on public.kong_items to authenticated;
grant update on public.kong_settings to authenticated;
grant select on public.kong_audit to authenticated;
drop policy if exists kong_public on public.kong_items;
create policy kong_public on public.kong_items for select to anon,authenticated using(
 public.is_site_admin() or (published and deleted_at is null and (starts_at is null or starts_at<=now()) and (ends_at is null or ends_at>now()))
);
drop policy if exists kong_insert on public.kong_items;
create policy kong_insert on public.kong_items for insert to authenticated with check(public.is_site_admin());
drop policy if exists kong_update on public.kong_items;
create policy kong_update on public.kong_items for update to authenticated using(public.is_site_admin()) with check(public.is_site_admin());
drop policy if exists kong_settings_read on public.kong_settings;
create policy kong_settings_read on public.kong_settings for select to anon,authenticated using(true);
drop policy if exists kong_settings_update on public.kong_settings;
create policy kong_settings_update on public.kong_settings for update to authenticated using(public.is_site_admin()) with check(public.is_site_admin());
drop policy if exists kong_audit_read on public.kong_audit;
create policy kong_audit_read on public.kong_audit for select to authenticated using(public.is_site_admin());

-- Nhập gộp nguyên tử: tất cả thành công hoặc không thay đổi gì. Không xóa mục ngoài file.
create or replace function public.import_kong_bundle(bundle jsonb) returns integer
language plpgsql security invoker set search_path='' as $$
declare x jsonb; r public.kong_items; n integer:=0;
begin
 if not public.is_site_admin() then raise exception 'Admin required';end if;
 if coalesce(bundle->>'schema','')<>'1' or jsonb_typeof(bundle->'items') is distinct from 'array'
 or jsonb_typeof(bundle->'settings') is distinct from 'object' then raise exception 'Invalid backup';end if;
 if jsonb_array_length(bundle->'items')>500 then raise exception 'Too many items';end if;
 for x in select value from jsonb_array_elements(bundle->'items') loop
  r:=jsonb_populate_record(null::public.kong_items,x);
  insert into public.kong_items(id,title,kind,platform,url,image,description,status,maintenance_message,published,featured,sort_order,starts_at,ends_at,preview_enabled,preview_media,changelog,version_label,deleted_at)
  values(r.id,r.title,r.kind,r.platform,r.url,r.image,r.description,r.status,r.maintenance_message,r.published,r.featured,r.sort_order,r.starts_at,r.ends_at,r.preview_enabled,r.preview_media,r.changelog,r.version_label,r.deleted_at)
  on conflict(id) do update set title=excluded.title,kind=excluded.kind,platform=excluded.platform,url=excluded.url,image=excluded.image,description=excluded.description,status=excluded.status,maintenance_message=excluded.maintenance_message,published=excluded.published,featured=excluded.featured,sort_order=excluded.sort_order,starts_at=excluded.starts_at,ends_at=excluded.ends_at,preview_enabled=excluded.preview_enabled,preview_media=excluded.preview_media,changelog=excluded.changelog,version_label=excluded.version_label,deleted_at=excluded.deleted_at;
  n:=n+1;
 end loop;
 update public.kong_settings set data=bundle->'settings' where id=1;
 return n;
end;$$;
revoke all on function public.import_kong_bundle(jsonb) from public,anon;
grant execute on function public.import_kong_bundle(jsonb) to authenticated;
commit;
