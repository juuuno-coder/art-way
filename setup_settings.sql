-- Create a table for site-wide settings (Open Graph, etc)
create table if not exists site_settings (
  id integer primary key default 1,
  og_description text default '부산 동구 문화 예술 공간',
  og_image_url text default null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Insert initial row if it doesn't exist
insert into site_settings (id, og_description)
values (1, '부산 동구 문화 예술 공간')
on conflict (id) do nothing;

-- Enable RLS
alter table site_settings enable row level security;

-- Policies
create policy "Allow public read access"
  on site_settings for select
  using (true);

create policy "Allow authenticated update access"
  on site_settings for update
  using (auth.role() = 'authenticated');
