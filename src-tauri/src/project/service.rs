use std::sync::Arc;

use crate::error::KosmosResult;

use super::{data::ProjectData, repository::ProjectRepository};

#[allow(dead_code)]
pub struct ProjectService {
    repository: Arc<dyn ProjectRepository + Send + Sync>,
}

#[allow(dead_code)]
impl ProjectService {
    pub fn new(repository: Arc<dyn ProjectRepository + Send + Sync>) -> Self {
        Self { repository }
    }

    pub async fn get(&self) -> KosmosResult<ProjectData> {
        self.repository.get().await
    }

    pub async fn create(&self, name: &str) -> KosmosResult<bool> {
        let mut data = ProjectData::default();
        data.set_title(name.to_string());
        self.repository.create(&data).await
    }

    pub async fn update(&self, data: &ProjectData) -> KosmosResult<bool> {
        self.repository.update(data).await
    }
}
