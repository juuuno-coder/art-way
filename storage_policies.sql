-- Storage 버킷에 대한 권한 설정 (업로드/수정/삭제 허용)
-- SQL Editor에서 실행해주세요.

-- 1. 기존 정책 정리 (충돌 방지)
drop policy if exists "Images Policy" on storage.objects;
drop policy if exists "Media Images Policy" on storage.objects;
drop policy if exists "Allow Public Access" on storage.objects;

-- 2. 'images' 버킷 권한 설정 (모든 사용자 읽기/쓰기 허용)
-- 보안을 위해 'to authenticated'를 쓸 수도 있지만, 
-- 지금 DB 초기화 후 빠른 복구를 위해 'public' 하게 엽니다.
create policy "Images Policy"
on storage.objects for all
using ( bucket_id = 'images' )
with check ( bucket_id = 'images' );

-- 3. 'media_images' 버킷 권한 설정 (모든 사용자 읽기/쓰기 허용)
create policy "Media Images Policy"
on storage.objects for all
using ( bucket_id = 'media_images' )
with check ( bucket_id = 'media_images' );
