-- Cloudflare D1 Database Schema for Blanc Data
-- Projects Table

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  sector TEXT NOT NULL,
  question TEXT NOT NULL DEFAULT '',
  data_source TEXT NOT NULL DEFAULT '',
  tools TEXT NOT NULL DEFAULT '[]', -- JSON string array of tools, e.g. ["Databricks", "PySpark"]
  status TEXT NOT NULL DEFAULT 'in-progress' CHECK(status IN ('complete', 'in-progress', 'hidden')),
  summary TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '{}', -- JSON stringified ProjectDetail object
  disclaimer TEXT DEFAULT '',
  demo_url TEXT DEFAULT '',
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Index for fast lookups by slug and status
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
