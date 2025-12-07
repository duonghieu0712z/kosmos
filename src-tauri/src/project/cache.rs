use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[allow(dead_code)]
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectCache {
    pub name: String,
    pub path: String,
    pub is_pinned: bool,
    pub last_opened: DateTime<Utc>,
}
