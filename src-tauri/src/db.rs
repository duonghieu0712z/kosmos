use std::str::FromStr;

use sqlx::sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePool, SqlitePoolOptions};

use crate::constants::{DB_MAX_CONNECTIONS, SCHEMA_SQL};
use crate::error::{KosmosError, KosmosResult};

pub async fn init_pool<P: AsRef<std::path::Path>>(
    custom_path: Option<P>,
) -> KosmosResult<SqlitePool> {
    let path = custom_path.ok_or(KosmosError::InvalidPath)?;
    let path = path.as_ref();

    let db_path = format!("sqlite:{}", path.to_str().ok_or(KosmosError::InvalidPath)?);

    let connection_options = SqliteConnectOptions::from_str(&db_path)?
        .create_if_missing(true)
        .journal_mode(SqliteJournalMode::Wal)
        .foreign_keys(true);

    let pool = SqlitePoolOptions::new()
        .max_connections(DB_MAX_CONNECTIONS)
        .connect_with(connection_options)
        .await?;

    sqlx::query(SCHEMA_SQL).execute(&pool).await?;

    Ok(pool)
}
