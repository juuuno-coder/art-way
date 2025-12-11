-- [1] 사이트 설정(site_settings) 보안 정책 재설정
-- 기존 정책 충돌 방지를 위해 삭제 후 재생성
drop policy if exists "Allow public read access" on site_settings;
drop policy if exists "Allow authenticated update access" on site_settings;
drop policy if exists "Enable all for authenticated users only" on site_settings;

alter table site_settings enable row level security;

-- 누구나 읽기 가능
create policy "Allow public read access" 
on site_settings for select 
using (true);

-- 로그인한 관리자는 모든 작업(입력/수정) 가능
create policy "Enable all for authenticated users only" 
on site_settings for all 
using (auth.role() = 'authenticated');


-- [2] 방문자 통계(daily_stats) 테이블 및 권한 설정
create table if not exists daily_stats (
  date date primary key,
  visitor_count integer default 0
);

alter table daily_stats enable row level security;

-- 기존 정책 삭제
drop policy if exists "Allow public access" on daily_stats;

-- 누구나 조회 및 업데이트 가능 (방문자 수 증가를 위해 필수)
create policy "Allow public access" 
on daily_stats for all 
using (true);


-- [3] 스토리지 버킷 설정 ('images')
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- 스토리지 정책 (기존 정책과 이름 충돌 주의 - 'on conflict' 구문 없으므로 에러 날 수 있음. 기 존재 시 무시됨)
-- 읽기는 누구나
create policy "Public Access Images" 
on storage.objects for select 
using (bucket_id = 'images');

-- 업로드는 관리자만
create policy "Auth Upload Images" 
on storage.objects for insert 
with check (bucket_id = 'images' and auth.role() = 'authenticated');

-- 수정도 관리자만
create policy "Auth Update Images" 
on storage.objects for update 
with check (bucket_id = 'images' and auth.role() = 'authenticated');
