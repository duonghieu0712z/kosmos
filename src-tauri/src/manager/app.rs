use tauri::{AppHandle, Manager};

use crate::{constants::CACHE_DIR, error::KosmosResult};

use super::{cache::CacheManager, project::ProjectManager};

#[derive(Default)]
pub struct AppManager {
    cache_manager: CacheManager,
    project_manager: ProjectManager,
}

impl AppManager {
    pub fn new(handle: &AppHandle) -> KosmosResult<Self> {
        let cache_dir = handle.path().app_cache_dir()?.join(CACHE_DIR);

        let mut cache_manager = CacheManager::default();
        cache_manager.setup(&cache_dir)?;

        let mut project_manager = ProjectManager::default();
        project_manager.set_cache_dir(&cache_dir);

        Ok(Self {
            cache_manager,
            project_manager,
        })
    }

    pub fn cache_manager(&self) -> &CacheManager {
        &self.cache_manager
    }

    pub fn project_manager_mut(&mut self) -> &mut ProjectManager {
        &mut self.project_manager
    }
}
