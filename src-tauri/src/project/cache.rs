use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectCache {
    pub(crate) name: String,
    pub(crate) file: String,
    pub(crate) is_pinned: bool,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub(crate) last_opened: DateTime<Utc>,
}

impl ProjectCache {
    pub fn new(name: &str, file: &str) -> Self {
        Self {
            name: name.into(),
            file: file.into(),
            is_pinned: false,
            last_opened: Utc::now(),
        }
    }
}
