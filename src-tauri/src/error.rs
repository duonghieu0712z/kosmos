use std::ffi::OsString;

use serde::Serialize;
use thiserror::Error;

#[allow(dead_code)]
#[derive(Debug, Error)]
pub enum KosmosError {
    #[error("Tauri error: {0}")]
    Tauri(#[from] tauri::Error),

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Non-UTF8 error: {0:?}")]
    NonUtf8(OsString),

    #[error("Database error: {0}")]
    Db(#[from] sqlx::Error),

    #[error("JSON error: {0}")]
    Json(#[from] serde_json::Error),

    #[error("Not found: {0}")]
    NotFound(String),

    #[error("Already exists: {0}")]
    AlreadyExists(String),

    #[error("Invalid: {0}")]
    Invalid(String),
}

impl Serialize for KosmosError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl From<OsString> for KosmosError {
    fn from(value: OsString) -> Self {
        Self::NonUtf8(value)
    }
}

#[allow(dead_code)]
pub type KosmosResult<T> = Result<T, KosmosError>;

#[allow(dead_code)]
pub fn log_error<T>(result: KosmosResult<T>) -> KosmosResult<T> {
    match result {
        Ok(data) => Ok(data),
        Err(e) => {
            log::error!("{e}");
            Err(e)
        }
    }
}
