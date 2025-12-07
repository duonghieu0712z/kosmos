use std::path::PathBuf;

use tauri::AppHandle;

use crate::{
    error::KosmosResult,
    project::{ProjectCache, ProjectData},
};

use super::{cache::CacheManager, project::ProjectManager};

#[allow(dead_code)]
pub struct AppManager {
    cache_manager: CacheManager,
    project_manager: Option<ProjectManager>,
}

#[allow(dead_code)]
impl AppManager {
    pub async fn new(handle: &AppHandle) -> KosmosResult<Self> {
        Ok(Self {
            cache_manager: CacheManager::new(handle).await?,
            project_manager: None,
        })
    }

    pub async fn new_project(&mut self, name: &str, path: PathBuf) -> KosmosResult<ProjectData> {
        let project_manager = ProjectManager::create(name, path).await?;
        let project = project_manager.project().await?;

        let cache = self.cache_manager.data_mut();
        cache.push_project(project_manager.cache().await?);
        self.cache_manager.save().await?;

        self.project_manager = Some(project_manager);
        Ok(project)
    }

    pub async fn open_project(&mut self, path: PathBuf) -> KosmosResult<ProjectData> {
        let project_manager = ProjectManager::load(path).await?;
        let project = project_manager.project().await?;

        let cache = self.cache_manager.data_mut();
        cache.push_project(project_manager.cache().await?);
        self.cache_manager.save().await?;

        self.project_manager = Some(project_manager);
        Ok(project)
    }

    pub fn get_recent_projects(&self) -> Vec<ProjectCache> {
        self.cache_manager.data().projects()
    }
}
