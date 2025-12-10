
-- 1. 방문자 통계 테이블 생성
CREATE TABLE IF NOT EXISTS daily_stats (
    date DATE PRIMARY KEY DEFAULT CURRENT_DATE,
    count INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. RLS 정책 설정 (누구나 통계를 올릴 수 있어야 함 - API 로직에서 처리하므로 public insert 허용 가능하거나, 서버 액션만 허용)
-- 여기서는 단순화를 위해 service_role을 사용하는 서버 액션을 전제로 하되,
-- 만약 클라이언트에서 직접 호출한다면 정책이 필요합니다.
-- 우리는 Server Action을 사용할 것이므로 테이블만 있어도 됩니다.

-- 3. 초기 데이터 (확인용)
INSERT INTO daily_stats (date, count) VALUES (CURRENT_DATE, 1) ON CONFLICT (date) DO NOTHING;
