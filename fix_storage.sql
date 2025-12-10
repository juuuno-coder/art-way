-- Supabase Storage 복구 및 권한 설정 스크립트
-- 모든 버킷(images, media_images, posters)을 생성하고 public으로 설정하며, 누구나 접근/업로드 가능하게 합니다.

-- 1. images 버킷 (전체용/에디터용)
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do update set public = true;

-- 2. media_images 버킷 (보도자료 썸네일용)
insert into storage.buckets (id, name, public)
values ('media_images', 'media_images', true)
on conflict (id) do update set public = true;

-- 3. posters 버킷 (전시 포스터용) - *새로 추가됨*
insert into storage.buckets (id, name, public)
values ('posters', 'posters', true)
on conflict (id) do update set public = true;


-- 4. 권한 정책 초기화 (기존 정책 삭제)
drop policy if exists "Images Policy" on storage.objects;
drop policy if exists "Media Images Policy" on storage.objects;
drop policy if exists "Posters Policy" on storage.objects;
drop policy if exists "Public Access" on storage.objects;

-- 5. 새 권한 정책 생성 (누구나 읽기/쓰기/삭제 가능)

-- images 버킷 정책
create policy "Images Policy"
on storage.objects for all
using ( bucket_id = 'images' )
with check ( bucket_id = 'images' );

-- media_images 버킷 정책
create policy "Media Images Policy"
on storage.objects for all
using ( bucket_id = 'media_images' )
with check ( bucket_id = 'media_images' );

-- posters 버킷 정책
create policy "Posters Policy"
on storage.objects for all
using ( bucket_id = 'posters' )
with check ( bucket_id = 'posters' );
