
PRAGMA application_id = 1263489869;
PRAGMA user_version = 0;

CREATE TABLE IF NOT EXISTS project_info (
    key TEXT PRIMARY KEY,
    value BLOB
) STRICT;

CREATE TABLE IF NOT EXISTS nodes (
    id BLOB PRIMARY KEY,
    parent_id BLOB,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    sort_order REAL DEFAULT 0.0,
    sort_config BLOB,
    query_filter BLOB,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    deleted_at INTEGER,
    FOREIGN KEY(parent_id) REFERENCES nodes(id)
) STRICT;

CREATE TABLE IF NOT EXISTS categories (
    id BLOB PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    default_props BLOB,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS documents (
    id BLOB PRIMARY KEY,
    node_id BLOB NOT NULL UNIQUE,
    content_json TEXT,
    word_count INTEGER DEFAULT 0,
    FOREIGN KEY(node_id) REFERENCES nodes(id)
) STRICT;

CREATE TABLE IF NOT EXISTS entities (
    id BLOB PRIMARY KEY,
    node_id BLOB NOT NULL UNIQUE,
    category_id BLOB,
    props BLOB,
    summary TEXT,
    FOREIGN KEY(node_id) REFERENCES nodes(id),
    FOREIGN KEY(category_id) REFERENCES categories(id)
) STRICT;

CREATE TABLE IF NOT EXISTS relationships (
    id BLOB PRIMARY KEY,
    from_id BLOB NOT NULL,
    to_id BLOB NOT NULL,
    rel_type TEXT NOT NULL,
    props BLOB,
    FOREIGN KEY(from_id) REFERENCES entities(id),
    FOREIGN KEY(to_id) REFERENCES entities(id)
) STRICT;

CREATE TABLE IF NOT EXISTS tags (
    id BLOB PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    color TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS node_tags (
    node_id BLOB NOT NULL,
    tag_id BLOB NOT NULL,
    PRIMARY KEY (node_id, tag_id),
    FOREIGN KEY(node_id) REFERENCES nodes(id),
    FOREIGN KEY(tag_id) REFERENCES tags(id)
) STRICT;

CREATE TABLE IF NOT EXISTS assets (
    id BLOB PRIMARY KEY,
    path TEXT NOT NULL,
    mime_type TEXT,
    size INTEGER,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS link_graph (
    source_id BLOB NOT NULL,
    target_id BLOB NOT NULL,
    PRIMARY KEY (source_id, target_id),
    FOREIGN KEY(source_id) REFERENCES nodes(id),
    FOREIGN KEY(target_id) REFERENCES nodes(id)
) STRICT;

CREATE TABLE IF NOT EXISTS snapshots (
    id BLOB PRIMARY KEY,
    document_id BLOB NOT NULL,
    content_zstd BLOB NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY(document_id) REFERENCES documents(id)
) STRICT;
