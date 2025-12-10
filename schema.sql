-- 1. 전시장 (Exhibitions) 테이블
create table public.exhibitions (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  title text not null,
  artist text null,
  description text null,
  start_date date null,
  end_date date null,
  is_active boolean null default true,
  poster_url text null,
  is_main_slider boolean null default false,
  constraint exhibitions_pkey primary key (id)
);

-- 2. 보도자료 (Media Releases) 테이블
create table public.media_releases (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  title text not null,
  press_name text null,
  link_url text null,
  content text null,
  image_url text null,
  published_date date null,
  constraint media_releases_pkey primary key (id)
);

-- 3. 메인 배너 (Main Banner) 테이블
create table public.main_banner (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  youtube_url text not null,
  is_active boolean null default true,
  constraint main_banner_pkey primary key (id)
);

-- 4. Storage Bucket 설정 (SQL로 버킷 생성이 불가능할 경우, Supabase 대시보드 Storage 메뉴에서 'images', 'media_images' 버킷을 Public으로 생성해주세요)
-- insert into storage.buckets (id, name, public) values ('images', 'images', true);
-- insert into storage.buckets (id, name, public) values ('media_images', 'media_images', true);

-- 5. RLS (Row Level Security) 설정
-- 기존 코드 구조상 RLS가 켜져 있으면 서버 액션에서 쓰기가 실패할 수 있으므로(인증 토큰 미전달 이슈), 
-- 일단 RLS를 끄거나 모든 사용자에게 권한을 엽니다. (보안을 위해 추후 개선 권장)

alter table public.exhibitions enable row level security;
create policy "Enable read for all users" on public.exhibitions for select using (true);
create policy "Enable insert for all users" on public.exhibitions for insert with check (true);
create policy "Enable update for all users" on public.exhibitions for update using (true);
create policy "Enable delete for all users" on public.exhibitions for delete using (true);

alter table public.media_releases enable row level security;
create policy "Enable read for all users" on public.media_releases for select using (true);
create policy "Enable insert for all users" on public.media_releases for insert with check (true);
create policy "Enable update for all users" on public.media_releases for update using (true);
create policy "Enable delete for all users" on public.media_releases for delete using (true);

alter table public.main_banner enable row level security;
create policy "Enable read for all users" on public.main_banner for select using (true);
create policy "Enable insert for all users" on public.main_banner for insert with check (true);
create policy "Enable update for all users" on public.main_banner for update using (true);
create policy "Enable delete for all users" on public.main_banner for delete using (true);
