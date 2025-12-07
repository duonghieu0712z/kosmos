use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string};

use crate::error::KosmosResult;

#[allow(dead_code)]
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CacheData {
    #[serde(default, skip_serializing_if = "BTreeMap::is_empty")]
    projects: BTreeMap<String, String>,
}

#[allow(dead_code)]
impl CacheData {
    pub fn from_json(json: &str) -> KosmosResult<Self> {
        Ok(from_str(json)?)
    }

    pub fn to_json(&self) -> KosmosResult<String> {
        Ok(to_string(self)?)
    }

    pub fn projects(&self) -> &BTreeMap<String, String> {
        &self.projects
    }

    pub fn insert_project(&mut self, path: String, title: String) -> Option<String> {
        self.projects.insert(path, title)
    }

    pub fn remove_project(&mut self, path: &str) -> Option<String> {
        self.projects.remove(path)
    }
}

impl Default for CacheData {
    fn default() -> Self {
        Self {
            projects: Default::default(),
        }
    }
}
