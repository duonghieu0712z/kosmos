use std::cmp::Reverse;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RecentProject {
    pub(crate) name: String,
    pub(crate) file: String,
    pub(crate) is_pinned: bool,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub(crate) last_opened: DateTime<Utc>,
}

impl RecentProject {
    pub fn new(name: &str, file: &str) -> Self {
        Self {
            name: name.into(),
            file: file.into(),
            is_pinned: false,
            last_opened: Utc::now(),
        }
    }
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct CacheData {
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub(crate) projects: Vec<RecentProject>,
}

impl CacheData {
    pub fn add_project(&mut self, name: &str, file: &str) {
        if let Some(project) = self.projects.iter_mut().find(|p| p.file == file) {
            project.last_opened = Utc::now();
        } else {
            self.projects.push(RecentProject::new(name, file));
        }

        self.projects.sort_by(|a, b| {
            Reverse(a.is_pinned)
                .cmp(&Reverse(b.is_pinned))
                .then(Reverse(a.last_opened).cmp(&Reverse(b.last_opened)))
        });
    }

    pub fn remove_project(&mut self, file: &str) {
        self.projects.retain(|project| project.file == file);
    }
}
