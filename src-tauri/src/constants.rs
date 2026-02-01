// --- App Global ---
pub const APPLICATION_ID: u32 = 0x4B4F534D;
pub const MAX_RECENT_PROJECTS: usize = 10;
pub const CONFIG_FILE: &str = "config.json";

// --- Project Structure ---
pub const ASSETS_DIR: &str = "assets";
pub const DB_FILE: &str = "project.db";
pub const METADATA_FILE: &str = "metadata.json";
pub const COMPRESSION_LEVEL: i64 = 3;

// --- Database Configuration ---
pub const DB_MAX_CONNECTIONS: u32 = 5;
pub const DB_META_KEY: &str = "metadata";
pub const SCHEMA_VERSION: u32 = 0;

// --- Resources ---
pub const SCHEMA_SQL: &str = include_str!("resources/schema.sql");
