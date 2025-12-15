use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{
    constants::UNTITLED,
    enums::Module,
    error::{KosmosError, KosmosResult},
};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BookData {
    #[serde(serialize_with = "uuid::serde::simple::serialize")]
    pub(crate) id: Uuid,
    pub(crate) module: Module,
    pub(crate) title: String,
    pub(crate) description: String,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub(crate) created_at: DateTime<Utc>,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub(crate) modified_at: DateTime<Utc>,
}

impl BookData {
    pub fn new(title: &str) -> Self {
        let now = Utc::now();
        Self {
            id: Uuid::now_v7(),
            module: Module::Book,
            title: title.into(),
            description: Default::default(),
            created_at: now,
            modified_at: now,
        }
    }

    pub fn update(&mut self, data: BookData) -> KosmosResult<&mut Self> {
        if self.id != data.id {
            return Err(KosmosError::Invalid(format!(
                "Mismatched book ID (expect {}, found {})",
                self.id.simple(),
                data.id.simple()
            )));
        }

        self.title = data.title;
        self.description = data.description;
        self.modified_at = Utc::now();
        Ok(self)
    }
}

impl Default for BookData {
    fn default() -> Self {
        Self::new(UNTITLED)
    }
}
