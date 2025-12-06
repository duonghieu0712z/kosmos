use std::path::PathBuf;

use crate::{error::KosmosResult, project::ProjectData};

use super::project::ProjectManager;

#[allow(dead_code)]
pub struct AppManager {
    project_manager: Option<ProjectManager>,
}

#[allow(dead_code)]
impl AppManager {
    pub async fn new_project(&mut self, name: &str, path: &PathBuf) -> KosmosResult<ProjectData> {
        let project_manager = ProjectManager::create(name, path).await?;
        let project = project_manager.project().await?;
        self.project_manager = Some(project_manager);

        Ok(project)
    }

    pub async fn open_project(&mut self, path: &PathBuf) -> KosmosResult<ProjectData> {
        let project_manager = ProjectManager::load(path).await?;
        let project = project_manager.project().await?;
        self.project_manager = Some(project_manager);

        Ok(project)
    }
}

impl Default for AppManager {
    fn default() -> Self {
        Self {
            project_manager: None,
        }
    }
}
