use std::{ffi::OsString, io, sync};

use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum KosmosError {
    #[error("Tauri error: {0}")]
    Tauri(#[from] tauri::Error),

    #[error("IO error: {0}")]
    Io(#[from] io::Error),

    #[error("JSON error: {0}")]
    Json(#[from] serde_json::Error),

    #[error("Version error: {0}")]
    Version(#[from] semver::Error),

    #[error("Mutex error: {0}")]
    Mutex(String),

    #[error("OsString error: {0:?}")]
    OsString(OsString),

    #[error("Already exists error: {0}")]
    AlreadyExists(String),

    #[error("Invalid error: {0}")]
    Invalid(String),

    #[error("Not found error: {0}")]
    NotFound(String),
}

impl Serialize for KosmosError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        log::error!("{self}");
        serializer.serialize_str(&self.to_string())
    }
}

impl<T> From<sync::PoisonError<T>> for KosmosError {
    fn from(err: sync::PoisonError<T>) -> Self {
        Self::Mutex(err.to_string())
    }
}

impl From<OsString> for KosmosError {
    fn from(err: OsString) -> Self {
        Self::OsString(err)
    }
}

pub type KosmosResult<T> = Result<T, KosmosError>;
