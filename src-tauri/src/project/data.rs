use std::collections::BTreeSet;

use chrono::{DateTime, Utc};
use semver::Version;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;
use uuid::Uuid;

use crate::constants::SCHEMA_VERSION;

#[allow(dead_code)]
#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct ProjectData {
    id: Uuid,
    title: String,
    author: String,
    description: String,
    #[sqlx(json)]
    genres: BTreeSet<String>,
    created_at: DateTime<Utc>,
    modified_at: DateTime<Utc>,
    #[sqlx(json)]
    version: Version,

    #[serde(skip)]
    #[sqlx(skip)]
    is_dirty: bool,
}

#[allow(dead_code)]
impl ProjectData {
    pub fn id(&self) -> &Uuid {
        &self.id
    }

    pub fn title(&self) -> &str {
        &self.title
    }

    pub fn author(&self) -> &str {
        &self.author
    }

    pub fn description(&self) -> &str {
        &self.description
    }

    pub fn genres(&self) -> &BTreeSet<String> {
        &self.genres
    }

    pub fn created_at(&self) -> &DateTime<Utc> {
        &self.created_at
    }

    pub fn modified_at(&self) -> &DateTime<Utc> {
        &self.modified_at
    }

    pub fn version(&self) -> &Version {
        &self.version
    }

    pub fn set_title(&mut self, title: String) {
        self.title = title;
        self.set_dirty();
    }

    pub fn set_author(&mut self, author: String) {
        self.author = author;
        self.set_dirty();
    }

    pub fn set_description(&mut self, description: String) {
        self.description = description;
        self.set_dirty();
    }

    pub fn set_genres(&mut self, genres: BTreeSet<String>) {
        self.genres = genres;
        self.set_dirty();
    }

    pub fn set_dirty(&mut self) {
        self.is_dirty = true;
    }

    pub fn update_modified_at(&mut self) {
        if self.is_dirty {
            self.modified_at = Utc::now();
            self.is_dirty = false;
        }
    }
}

impl Default for ProjectData {
    fn default() -> Self {
        let now = Utc::now();
        Self {
            id: Uuid::now_v7(),
            title: Default::default(),
            author: Default::default(),
            description: Default::default(),
            genres: Default::default(),
            created_at: now,
            modified_at: now,
            version: SCHEMA_VERSION,
            is_dirty: false,
        }
    }
}
