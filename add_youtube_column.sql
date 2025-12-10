-- exhibitions 테이블에 youtube_url 컬럼 추가
alter table exhibitions 
add column if not exists youtube_url text;

-- (선택사항) 기존 main_banner 테이블이 있다면 유지하되, 
-- 홈페이지 로직에서 exhibitions 테이블의 youtube_url을 우선하게 변경할 예정입니다.
