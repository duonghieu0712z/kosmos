use std::cmp::Reverse;

use chrono::Utc;
use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string};

use crate::{error::KosmosResult, project::ProjectCache};

#[allow(dead_code)]
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CacheData {
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    projects: Vec<ProjectCache>,
}

#[allow(dead_code)]
impl CacheData {
    pub fn from_json(json: &str) -> KosmosResult<Self> {
        Ok(from_str(json)?)
    }

    pub fn to_json(&self) -> KosmosResult<String> {
        Ok(to_string(self)?)
    }

    pub fn projects(&self) -> Vec<ProjectCache> {
        self.projects.clone()
    }

    pub fn push_project(&mut self, project: ProjectCache) {
        if let Some(project) = self.projects.iter_mut().find(|p| p.path == project.path) {
            project.last_opened = Utc::now();
        } else {
            self.projects.push(project);
        }

        self.projects
            .sort_by_key(|project| Reverse(project.last_opened));
    }

    pub fn remove_project(&mut self, path: &str) {
        self.projects.retain(|project| project.path == path);
    }
}

impl Default for CacheData {
    fn default() -> Self {
        Self {
            projects: Default::default(),
        }
    }
}
