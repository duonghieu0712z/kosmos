use semver::Version;

pub const SCHEMA_VERSION: Version = Version::new(0, 0, 1);

pub const APP_EXTENSION: &str = "kosmos";

pub const COMPRESS_LEVEL: i32 = 5;

pub const UNTITLED: &str = "Untitled";

pub const PROJECT_FILE: &str = "project.json";
pub const VERSION_FILE: &str = ".version";
pub const METADATA_FILE: &str = "metadata.json";
pub const MANIFEST_FILE: &str = "manifest.json";
pub const DOCUMENT_FILE: &str = "document.json";

pub const BOOKS_DIR: &str = "books";
pub const CHAPTERS_DIR: &str = "chapters";

pub const CACHE_DIR: &str = ".caches";
pub const CACHE_FILE: &str = "app.cache";
