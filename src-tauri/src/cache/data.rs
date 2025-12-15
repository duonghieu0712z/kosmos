use std::cmp::Reverse;

use chrono::Utc;
use serde::{Deserialize, Serialize};

use crate::project::ProjectCache;

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct CacheData {
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub(crate) projects: Vec<ProjectCache>,
}

impl CacheData {
    pub fn add_project(&mut self, project: ProjectCache) {
        if let Some(project) = self.projects.iter_mut().find(|p| p.file == project.file) {
            project.last_opened = Utc::now();
        } else {
            self.projects.push(project);
        }

        self.projects
            .sort_by_key(|project| Reverse(project.last_opened));
    }

    pub fn remove_project(&mut self, path: &str) {
        self.projects.retain(|project| project.file == path);
    }
}
