use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{
    constants::UNTITLED,
    enums::{Module, Status},
    error::{KosmosError, KosmosResult},
};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChapterData {
    #[serde(serialize_with = "uuid::serde::simple::serialize")]
    pub(crate) id: Uuid,
    #[serde(serialize_with = "uuid::serde::simple::serialize")]
    pub(crate) parent_id: Uuid,
    pub(crate) module: Module,
    pub(crate) title: String,
    pub(crate) status: Status,
    pub(crate) word_count: u32,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub(crate) created_at: DateTime<Utc>,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub(crate) modified_at: DateTime<Utc>,
}

impl ChapterData {
    pub fn new(title: &str, book_id: Uuid) -> Self {
        let now = Utc::now();
        Self {
            id: Uuid::now_v7(),
            parent_id: book_id,
            module: Module::Chapter,
            title: title.into(),
            status: Status::Draft,
            word_count: 0,
            created_at: now,
            modified_at: now,
        }
    }

    pub fn id(&self) -> Uuid {
        self.id
    }

    pub fn parent_id(&self) -> Uuid {
        self.parent_id
    }

    pub fn title(&self) -> String {
        self.title.to_string()
    }

    pub fn update(&mut self, data: ChapterData) -> KosmosResult<&mut Self> {
        if self.id != data.id {
            return Err(KosmosError::Invalid(format!(
                "Mismatched chapter ID (expect {}, found {})",
                self.id.simple(),
                data.id.simple()
            )));
        }

        self.title = data.title;
        self.status = data.status;
        self.word_count = data.word_count;
        self.modified_at = Utc::now();
        Ok(self)
    }
}

impl Default for ChapterData {
    fn default() -> Self {
        Self::new(UNTITLED, Uuid::nil())
    }
}
