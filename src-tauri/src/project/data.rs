use std::collections::BTreeSet;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::error::{KosmosError, KosmosResult};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectData {
    #[serde(serialize_with = "uuid::serde::simple::serialize")]
    pub(crate) id: Uuid,
    pub(crate) name: String,
    pub(crate) description: String,
    pub(crate) author: String,
    pub(crate) genres: BTreeSet<String>,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub(crate) created_at: DateTime<Utc>,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub(crate) modified_at: DateTime<Utc>,
}

impl ProjectData {
    pub fn update(&mut self, data: ProjectData) -> KosmosResult<&mut Self> {
        if self.id != data.id {
            return Err(KosmosError::Invalid(format!(
                "Mismatched project ID (expect {}, found {})",
                self.id.simple(),
                data.id.simple()
            )));
        }

        self.name = data.name;
        self.description = data.description;
        self.author = data.author;
        self.genres = data.genres;
        self.modified_at = Utc::now();
        Ok(self)
    }
}

impl Default for ProjectData {
    fn default() -> Self {
        let now = Utc::now();
        Self {
            id: Uuid::now_v7(),
            name: Default::default(),
            description: Default::default(),
            author: Default::default(),
            genres: Default::default(),
            created_at: now,
            modified_at: now,
        }
    }
}
